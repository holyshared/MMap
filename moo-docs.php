<?php

$input = "";

$commandFile = array_shift($argv);
$inputFile = array_shift($argv);
$outputFile = array_shift($argv);

$input = file_get_contents($inputFile);

ob_start();

// Regex Patterns
$comments          = '/(\/\/[^\n]*\n)|(\/\*[\s\S]*?\*\/)/';
$classPattern      = '/\b(?<name>[a-zA-Z_\$][\w\.\$]+)\s*=\s*new\s*Class\s*\(\s*\{/';
$csvPattern        = '/\s*\,\s*/';
$eventsPattern     = '/\bon[A-Z][\w]*/';
$extendsPattern    = '/\bExtends\s*\:\s*(?<extends>[\s\S]*?)\,/';
$firesEventPattern = '/\bthis\.fireEvent\((?<events>[^)\,]*)/';
$implementsPattern = '/\bImplements\s*\:\s*\[+(?<implements>[\s\S]*?)\]/';
$indOptionsPattern = '/\b(?<name>\w*)\:\s*(?<default>[^,]+)\,?/';
$methodPattern     = '/\b(?<name>[a-zA-Z_\$][\w\$]+)\s*\:\s*function\((?<args>[^\)]*)\)\s*\{/';
$optionsPattern    = '/\boptions\s*\:\s*\{(?<options>[\s\S]*)/';
$returnsPattern    = '/\breturn\s*(?<returns>[^;\n]*)/';

// Array to hold all the Classes structures.
$mooClasses = array();

// Remove all comments from code.
$input = preg_replace($comments, '', $input);

preg_match_all($classPattern, $input, $mooMatches);
foreach($mooMatches[0] as $key => $mooSig) {
	// Extract class source code and insert into classes array.
	$classCode = findCodeInBrackets(substr($input, (strpos($input, $mooSig) + strlen($mooSig))));
	$mooClasses[$mooMatches['name'][$key]] = array('code' => $classCode);
} // $mooClasses now contains all classes and their source code.

foreach($mooClasses as $className => $mooClass) {
	// Check for Implements.
	preg_match_all($implementsPattern, $mooClass['code'], $mooImplements);
	if (!empty($mooImplements[0])) {
		$arguments = preg_split($csvPattern, $mooImplements['implements'][0]);
		$mooClasses[$className]['Implements'] = $arguments;
	}
	
	// Check for Extends.
	preg_match_all($extendsPattern, $mooClass['code'], $mooExtends);
	if (!empty($mooExtends[0])) {
		$mooClasses[$className]['Extends'] = preg_split($csvPattern, $mooExtends['extends'][0]);
	}
	
	// Check for Options and Events
	preg_match_all($optionsPattern, $mooClass['code'], $mooOptions);
	if (!empty($mooOptions)) {
		$optionsFullText = trim(findCodeInBrackets($mooOptions['options'][0]));
		preg_match_all($indOptionsPattern, $optionsFullText, $options);
		foreach ($options['name'] as $key => $optionName) {
			if (preg_match('/^on[A-Z]/', $optionName) != 0) {
				$mooClasses[$className]['Events'][$key] = $optionName;
			} else {
				$mooClasses[$className]['Options'][$optionName] = $options['default'][$key];
			}
		}
	}
	
	// Find individual methods and parse their code.
	preg_match_all($methodPattern, $mooClass['code'], $mooMethods);
	if (!empty($mooMethods[0])) {
		foreach($mooMethods['name'] as $key => $mooMethod) {
			// Find string position after method's first bracket.
			$start = strpos($mooClass['code'], $mooMethods[0][$key]) + strlen($mooMethods[0][$key]);
			// Extract method's source code.
			$methodCode = findCodeInBrackets(substr($mooClass['code'], $start));
			// Find fired events and clean string delimiters.
			preg_match_all($firesEventPattern, $methodCode, $mooEvents);
			$mooEvents['events'] = preg_replace('/\'|\"/', '', $mooEvents['events']);

			// Find return statements.
			preg_match_all($returnsPattern, $methodCode, $mooReturns);
			
			$mooClasses[$className]['Methods'][$mooMethod]['code']    = $methodCode;
			$mooClasses[$className]['Methods'][$mooMethod]['events']  = $mooEvents['events'];
			$mooClasses[$className]['Methods'][$mooMethod]['returns'] = $mooReturns['returns'];
			$mooClasses[$className]['Methods'][$mooMethod]['args']    = preg_split($csvPattern, $mooMethods['args'][$key]);
		}
	}
}

// Markdown Patterns
$mdClass  = "Class: <a id='%s'>%s</a>\n";
$mdMethod = "Method: <a id='%s'>%s</a>\n";
$mdH3     = "### %s:\n\n";
$mdH4     = "#### %s:\n\n";
$mdArg    = "%d. %s - (*%s*)\n";
$mdEvt    = "* %s -\n";
$mdOpt    = "* %s - (**)\n";
$mdOptDef = "* %s - (*%s*: defaults to %s)";
$mdLink   = "[%s](%s)";

foreach($mooClasses as $className => $mooClass) {
	// Class Header
	$className = str_replace('this.', 'this.', $className);
	$mooHeader = sprintf($mdClass, strtolower($className), $className);
	for ($i = strlen($mooHeader); $i > 1; $i--) {
		$mooHeader .= '-';
	}
	$mooHeader .= "\n\n\n\n";
	
	echo $mooHeader;
	
	// Implements & Extends
	if (!empty($mooClass['Implements'])) {
		$mooSection = sprintf($mdH3, 'Implements');
		foreach($mooClass['Implements'] as $key => $mooImplement) {
			$mooSection .= $mooImplement.', ';
		}
		$mooSection = substr($mooSection, 0, -2)."\n\n\n\n";
		echo $mooSection;
	}
	if (!empty($mooClass['Extends'])) {
		$mooSection = sprintf($mdH3, 'Extends');
		foreach($mooClass['Extends'] as $key => $mooExtend) {
			$mooSection .= $mooExtend.', ';
		}
		$mooSection = substr($mooSection, 0, -2)."\n\n\n\n";
		echo $mooSection;
	}
	
	// Methods
	if (!empty($mooClass['Methods'])) {
		foreach($mooClass['Methods'] as $methodName => $mooMethod) {
			$mooSection = "\n";
			// Build Method header (with "constructor" instead of "initialize")
			if ($methodName == 'initialize') {
				$mooSection .= sprintf($mdMethod, 'constructor', 'constructor');
			} else {
				$mooSection .= sprintf($mdMethod, $methodName, $methodName);
			}
			for ($i = strlen($mooSection); $i > 1; $i--) {
				$mooSection .= '-';
			}
			$mooSection .= "\n\n\n";
			$mooSection .= sprintf($mdH3, 'Syntax');
			// Syntax hint.
			if ($methodName == 'initialize') {
				$mooSection .= "\tvar my$className = new $className(";
				foreach($mooMethod['args'] as $arg) {
					$mooSection .= "$arg, ";
				}
				$mooSection = substr($mooSection, 0, -2);
				$mooSection .= ");";
			}
				$mooSection .= "\n\n";
			
			// Add Arguments section if set
			if (!empty($mooMethod['args'][0])) {
				$mooSection .= sprintf($mdH3, 'Arguments');
				foreach($mooMethod['args'] as $key => $argument) {
					$mooSection .= sprintf($mdArg, $key+1, $argument, '');
				}
				$mooSection .= "\n";
			}
			
			// Add Options and Events section if set in initialize method.
			if ($methodName == 'initialize') {
				if (!empty($mooClass['Options'])) {
					$mooSection .= sprintf($mdH3, 'Options');
					foreach($mooClass['Options'] as $optName => $option) {
						$mooSection .= sprintf($mdOpt, $optName);
					}
					$mooSection .= "\n";				
				}
				if (!empty($mooClass['Events'])) {
					$mooSection .= sprintf($mdH3, 'Events');
					foreach($mooClass['Events'] as $event) {
						$mooSection .= sprintf($mdEvt, $event);
					}
					$mooSection .= "\n";		
				}
			}
			
			// Add Returns section if there's a return statement in method.
			if (!empty($mooMethod['returns'])) {
				$mooSection .= sprintf($mdH3, 'Returns');
				/* Include return statements for reference?
				foreach($mooMethod['returns'] as $return) {
					$mooSection .= $return."\n";
				}*/
				$mooSection .= "\n\n\n";
			}
			
			/* Events fired section?
			if (!empty($mooMethod['events'])) {
				$mooSection .= sprintf($mdH3, 'Events');
				foreach($mooMethod['events'] as $event) {
					$mooSection .= sprintf($mdOpt, 'on'.ucfirst($event), 'event')."\n";
				}
				$mooSection .= "\n\n\n";
			}*/
			
			// Print out method.
			echo $mooSection;
		}
	}
}

$output = ob_get_contents();
ob_end_clean();
file_put_contents($outputFile, $output);

/** Takes code after an opening bracket and returns the code up until the matched bracket */
function findCodeInBrackets($code) {
	$pos = 0;
	$openBr = 1;
	for ($pos = 0; $pos < strlen($code) && $openBr != 0; $pos++) {
		if ($code[$pos] == '{') {
			$openBr++;
		} else if ($code[$pos] == '}') {
			$openBr--;
		}
	}
	return substr($code, 0, $pos-1);
}


?>