//Copyright 2011 Noritaka Horio<holy.shared.design@gmail.com> all rights reserved.
//Licence The MIT Licence
(function(){var a=this.MMap={};a.version="0.2.3";a.MVCObject=new Class({initialize:function(){}});a.MVCObject.prototype=new google.maps.MVCObject()}());(function(a){a.Options=new Class({setOptions:function(b){var e=Object.clone(this.options);var b=Object.append(e,b);for(var c in b){var d=b[c];if(c=="map"){this.setMap(d);delete b[c]}else{if(instanceOf(d,Function)&&(/^on[A-Z]/).test(c)){this.addEvent(c,d);delete b[c]}}}this.options=b;return this}})}(MMap));(function(e,d){var c=function(f){return f.replace(/^on([A-Z])/,function(g,h){return h.toLowerCase()})};var b=function(f){var g=/(Changed)$/;return f.replace(g,"_$1").toLowerCase()};var a=function(f){return b(c(f))};e.Events=new Class({_events:{},_handles:{},addEvent:function(g,f){var h=null;g=a(g);h=d.addListener(this,g,f);this._handles[g]=(this._handles[g]||[]).include(f);this._events[g]=(this._events[g]||[]).include(h);return this},addEvents:function(g){for(var f in g){this.addEvent(f,g[f])}return this},removeEvent:function(h,g){h=a(h);var j=this._handles[h].contains(g);if(j){var f=this._handles[h].indexOf(g);var i=this._events[h][f];d.removeListener(i);this._events[h].erase(i);this._handles[h].erase(g)}return this},removeEvents:function(h){if(!h){d.clearInstanceListeners(this);return this}else{if(typeOf(h)=="object"){for(type in h){this.removeEvent(type,h[type])}return this}}for(type in this._events){if(h&&h!=type){continue}var g=this._events[type];for(var f=g.length;f--;){this.removeEvent(type,g[f])}}return this},fireEvent:function(k,h){k=a(k);if(!this._events[k]){return this}var g=[this,k];if(Type.isArray(h)){var f=h.length;for(var j=0;j<f;j++){g.push(h[j])}}else{g.push(h)}d.trigger.apply(this,g);return this}})}(MMap,google.maps.event));(function(a,b){a.Position=new Class({options:{position:null},getPosition:function(){return this.get("position")},setPosition:function(c){if(!instanceOf(c,b.LatLng)){new TypeError("The data type is not an Latlng.")}this.set("position",c);this.draw();return this}})}(MMap,google.maps));(function(d,b,e,c){b.Draggable=new Class({options:{draggable:false},setDraggable:function(f){if(!Type.isBoolean(f)){new TypeError("The data type is not an boolean.")}this.set("draggable",f)},isDraggable:function(){return this.get("draggable")},draggable_changed:function(){var g=this;var f=this.toElement();this._strategy=this._strategy||new a(this);this._mousedown=this._MouseDown.bind(this);if(this.isDraggable()){f.addEvent("mousedown",this._mousedown)}else{f.removeEvent("mousedown",this._mousedown)}},_MouseDown:function(f){if(this._strategy.isDragging()){return}this._strategy.onDragStart(f)}});var a=new Class({_overlayView:null,_mouseX:null,_mouseY:null,_dragging:false,_mapDraggableOption:null,initialize:function(f){this._overlayView=f;this._strategy=this.createStrategy()},isCaptureSupport:function(){var f=this.getOverlayView();var g=f.toElement();return(g.setCapture)?true:false},isDragging:function(){return this._dragging},getOverlayView:function(){return this._overlayView},onDragStart:function(g){var f=this.getOverlayView();this._dragging=true;this._strategy.enable();this._mouseX=g.client.x;this._mouseY=g.client.y;this._toggleMapDraggable();f.fireEvent("dragStart",[this._getCurrentPosition()])},onDrag:function(h){var g=this.getOverlayView();var f=this._updatePosition(h);g.fireEvent("drag",[f])},onDragStop:function(g){var f=this.getOverlayView();this._dragging=false;this._strategy.disable();this._toggleMapDraggable();f.fireEvent("dragStart",[this._getCurrentPosition()])},_toggleMapDraggable:function(){var f=this.getOverlayView();var g=f.getMap();if(this._mapDraggableOption==null){this._mapDraggableOption=g.get("draggable")||true;g.set("draggable",false)}else{g.set("draggable",this._mapDraggableOption);this._mapDraggableOption=null}},_updatePosition:function(n){var g=this.getOverlayView();var k=g.toElement();var j=k.getSize();var f=k.getStyles("left","top");var i=n.client.x-this._mouseX;var h=n.client.y-this._mouseY;this._mouseX=n.client.x;this._mouseY=n.client.y;var m={left:f.left.toInt()+i,top:f.top.toInt()+h};k.setStyles(m);return this._getCurrentPosition()},_getCurrentPosition:function(){var h=this.getOverlayView();var j=h.toElement();var g=j.getStyles("left","top");var i=j.getSize();var f=new c(g.left.toInt()+(i.x/2),g.top.toInt()+i.y);var k=h.getProjection().fromDivPixelToLatLng(f);return{latlng:k,pixel:f}},createStrategy:function(){var h=this;var f=h.getOverlayView();var i=null;var g={element:this.getOverlayView().toElement(),onMouseUp:function(j){if(!h.isDragging()){return}h.onDragStop()},onMouseMove:function(j){if(!h.isDragging()){return}h.onDrag(j)}};if(h.isCaptureSupport()){i=new a.Capture(g)}else{i=new a.Window(g)}return i}});a.Strategy=new Class({initialize:function(f){for(var g in f){this[g]=f[g]}}});a.Window=new Class({Extends:a.Strategy,enable:function(){d.addEvents({mouseup:this.onMouseUp,mousemove:this.onMouseMove})},disable:function(){d.removeEvents({mouseup:this.onMouseUp,mousemove:this.onMouseMove})}});a.Capture=new Class({Extends:a.Strategy,startCapture:function(){this.element.setCapture(true)},stopCapture:function(){this.element.releaseCapture()},enable:function(){this.startCapture();this.element.addEvents({mouseup:this.onMouseUp,mousemove:this.onMouseMove})},disable:function(){this.element.releaseCapture();this.element.removeEvents({mouseup:this.onMouseUp,mousemove:this.onMouseMove})}})}(window,MMap,google.maps,google.maps.Point));(function(a){a.Container=new Class({Extends:a.MVCObject,initialize:function(){var b=Array.from(arguments).link({items:Type.isArray});this.setItems(b.items||[]);this.setCurrent(0)},isValid:function(){var b=this.get("index");return this.hasItem(b)},getItem:function(c){if(!this.hasItem(c)){return}var b=this.getItems();return b[c]},getItems:function(){return this.get("items")},getCurrent:function(){var b=this.getItems();var c=this.get("index");return b[c]},setItems:function(b){if(!Type.isArray(b)){return}this.set("items",b);return this},setCurrent:function(b){if(!Type.isNumber(b)){return}this.set("index",b);return this},addItem:function(c){if(this.hasItem(c)){return}var b=this.getItems();b.push(c);return this},hasItem:function(c){var b=this.getItems();if(Type.isNumber(c)){return(b[c])?true:false}else{return(b.contains(c))?true:false}},count:function(){return this.getItems().length},removeItem:function(c){if(!this.hasItem(c)){return}var b=this.get("items");b.erase(c);return this},next:function(){var d=this.get("index");var c=this.getItems();var b=d+1;this.setCurrent(b);if(this.isValid()){return c[b]}return false},rewind:function(){this.setCurrent(0);return this},empty:function(){var b=this.getItems();this.rewind();b.empty()},find:function(b,d){while(this.isValid()){var c=this.getCurrent();if(c[b]==d){return c}this.next()}return false},findAll:function(b,d){var e=[];while(this.isValid()){var c=this.getCurrent();if(c[b]==d){e.push(c)}this.next()}return(e.length<=0)?false:e}})}(MMap));(function(a,b){a.OverlayView=new Class({Implements:[b.OverlayView,a.Events,a.Options],options:{map:null,zIndex:0,visible:true,active:false},initialize:function(c){this.instance=this.toElement();this.setOptions(c);this._added=false;this._init()},build:function(){var c=this.getPanes().overlayImage;this.body=this._setup(this.toElement());this.toElement().inject(c);this._setupListeners();this._added=true;this.fireEvent("add")},toElement:function(){if(!this.instance){this.instance=new Element("div",{"class":"ovarlayView"})}return this.instance},_setup:function(c){},_setupListeners:function(){},_init:function(){},draw:function(){},onAdd:function(){this.build()},onRemove:function(){this.removeEvents();this.unbindAll();this.instance.destroy();delete this.instance;this._added=false},getVisible:function(){return this.get("visible")},isAdded:function(){return this._added},isVisible:function(){return this.get("visible")},isActive:function(){return this.get("active")},setVisible:function(d){if(!Type.isBoolean(d)){new TypeError("The data type is not an boolean.")}this.set("visible",d);var c=this.toElement();if(d){c.setStyle("display","")}else{c.setStyle("display","none")}return this},setActive:function(c){}})}(MMap,google.maps));(function(a){a.Marker={};a.Marker.Core=new Class({Extends:a.OverlayView,Implements:[a.Position,a.Draggable],options:{map:null,className:"marker markerDefault",zIndex:null,visible:true,active:false},initialize:function(b){this.parent(b)},_init:function(){var b=this;var c=["position","zIndex","visible","active","draggable"];c.each(function(d){var e=b.options[d];b.set(d,e);delete b.options[d]})},_updateVisibleState:function(){this.setZIndex(this.get("zIndex")).setVisible(this.get("visible"))},_update:function(){},setDefaultZIndex:function(){var e=this.get("zIndex");if(!e){var c=this.getProjection();var b=this.get("position");var d=c.fromLatLngToDivPixel(b);this.setZIndex(d.y)}else{this.setZIndex(e)}},draw:function(){if(!this.isAdded()){return}this.refresh();var c=this.getProjection();var b=this.get("position");var d=this.instance.getSize();var f=c.fromLatLngToDivPixel(b);var e={position:"absolute",left:f.x-(d.x/2),top:f.y-d.y};this.instance.setStyles(e)},refresh:function(){if(!this.isAdded()){return}this._updateVisibleState();this._update()},getZIndex:function(){return this.get("zIndex")},setZIndex:function(c){if(!Type.isNumber(c)){new TypeError("The data type is not an integer.")}this.set("zIndex",c);var b=this.toElement();if(!this.isActive()){b.setStyle("z-index",c)}return this},setActive:function(c){if(!Type.isBoolean(c)){new TypeError("The data type is not an boolean.")}this.set("active",c);var b=this.toElement();if(c){this.fireEvent("active");b.setStyle("z-index",10000);b.addClass("active")}else{b.setStyle("z-index",this.getZIndex());b.removeClass("active")}return this}});a.Marker.HTML=new Class({Extends:a.Marker.Core,options:{map:null,className:"marker markerDefault",title:"",content:"",zIndex:null,visible:true},initialize:function(b){this.parent(b)},_setup:function(c){this.setDefaultZIndex();var d=this.options.className;c.addClass(d);var b=new Element("div",{"class":"inner"});var f=new Element("div",{"class":"hd"});var e=new Element("div",{"class":"bd"});var g=new Element("div",{"class":"ft"});b.adopt([f,e,g]);this._title=new Element("p",{"class":"title"});this._content=new Element("div",{"class":"content"});b.inject(c);this._title.inject(f);this._content.inject(e);return b},_setupListeners:function(){var c=this;var b=this.toElement();var e=function(f){if(f.preventDefault){f.preventDefault()}f.target=c;c.fireEvent(f.type,f)};var d=["click","dblclick","mouseover","mouseout","mouseup","mousedown"];d.each(function(f){b.addEvent(f,e)})},_init:function(){this.parent();var b=this;var c=["title","content"];c.each(function(d){b.set(d,b.options[d]);delete b.options[d]})},_update:function(){this._title.set("html",this.get("title"));this._content.set("html",this.get("content"))},getTitle:function(){return this.get("title")},setTitle:function(b){if(!Type.isString(b)){new TypeError("The data type is not a character string.")}this.set("title",b);this.draw();return this},getContent:function(){return this.get("content")},setContent:function(b){if(!Type.isString(b)||!Type.isElement(b)){new TypeError("The data type is a character string or not an element.")}this.set("content",b);this.draw();return this}})}(MMap));(function(b,a){a.Image=new Class({Extends:a.Core,options:{map:null,className:"marker image imageDefault",title:"",image:"",url:"",position:null,zIndex:0,visible:true},initialize:function(c){this.parent(c)},_setup:function(c){this.setDefaultZIndex();var e=this.options.className;c.addClass(e);var d=new Element("p",{"class":"photo"});this._anchor=new Element("a",{title:this.get("title"),href:this.get("url")});this._image=new Element("img",{src:this.get("image")});d.inject(c);this._anchor.inject(d);this._image.inject(this._anchor);return d},_setupListeners:function(){var d=this;var c=this.toElement();var f=function(g){if(g.preventDefault){g.preventDefault()}g.target=d;d.fireEvent(g.type,g)};var e=["click","dblclick","mouseover","mouseout","mouseup","mousedown"];e.each(function(g){c.addEvent(g,f)})},_init:function(){this.parent();var c=this;var d=["title","image","url"];d.each(function(e){c.set(e,c.options[e]);delete c.options[e]})},_update:function(){this._anchor.set({title:this.get("title"),href:this.get("url")});this._image.set({title:this.get("title"),image:this.get("image")})},getTitle:function(){return this.get("title")},getImage:function(){return this.get("image")},getURL:function(){return this.get("url")},setTitle:function(c){this.set("title",c);this.draw();return this},setImage:function(c){this.set("image",c);this.draw();return this},setURL:function(c){this.set("url",c);this.draw();return this}})}(MMap,MMap.Marker));(function(b,a){var c={};c.Methods=["setCurrent","setImages","addImage","addImages","removeImage","removeImages","isStart","start","stop"];c.States=["AddMapBeforeState","AddMapAfterState"];a.Images=new Class({Extends:a.Core,options:{map:null,className:"marker image imagesDefault",images:[],current:0,interval:2000,duration:2000,autoplay:true,zIndex:0,position:null,visible:true},initialize:function(e){this.state=new c.StateWrapper(this);this.parent(e)},_init:function(){this.parent();var e=this;var f=["images","current"];f.each(function(g){e.set(g,e.options[g]);delete e.options[g]})},_setup:function(e){this.setDefaultZIndex();var f=this.options.className;e.addClass(f);this._photos=new Element("ul",{"class":"photos"});this._photos.inject(e);this.addEvent("add",this._onPrepare.bind(this));return this._photos},_onPrepare:function(){var g={images:this.get("images"),observer:this.toElement(),container:this._photos};var e=this._createEventProxies(this);var f=Object.merge(this.options,e,g);if(this.getVisible()==false||this.state.isStart()==false){f.autoplay=false}this.state.nextState(f)},_createEventProxies:function(h){var e={onImageChangeStart:function(i){h.setCurrent(i)},onImageChangeEnd:function(){h.fireEvent("currentImageChanged",Array.from(arguments))}};var g=["onClick","onDblClick","onMouseOver","onMouseOut","onMouseUp","onMouseDown"];var f=function(i){i.target=h;h.fireEvent(i.type,[i])};g.each(function(j,i){e[j]=f});return e},getCurrent:function(){return this.get("current")},getCurrentImage:function(){var e=this.getImages();return e[this.getCurrent()]},getImages:function(){return this.get("images")},visible_changed:function(){var e=this.getVisible();if(e==false&&this.isAdded()){this.stop()}}});(function(){var f=a.Images,g=c.Methods,e={};g.each(function(i,h){e[i]=function(){return this.state[i].apply(this.state,arguments)}});f.implement(e)}());c.StateWrapper=new Class({progress:0,state:null,marker:null,initialize:function(e){this.marker=e;this.nextState()},nextState:function(e){var f=c.States[this.progress++];this.state=this.createState.call(this,f,e)},createState:function(f,e){if(!c[f]){throw new Error("instance!!")}var g=c[f];return new g(this.marker,e)}});(function(){var f=c.StateWrapper,e=c.Methods;hooks={};e.each(function(h,g){hooks[h]=function(){return this.state[h].apply(this.state,arguments)}});f.implement(hooks)}());c.State=new Class({Implements:[Options],initialize:function(e,f){this.setOptions(f);this.marker=e},setCurrent:function(f){var e=this.marker.get("images").length-1;if(f<0||f>e){return}this.marker.set("current",f)},setImages:function(e){this.marker.set("images",this._validateImages(e))},addImage:function(f){var e=this.marker.get("images");if(!e.contains(f)){e.push(f)}return this},addImages:function(e){e=this._validateImages(e);e.each(function(f){this.addImage(f)},this);return this},removeImage:function(f){var e=this.marker.get("images");e.erase(f);return this},removeImages:function(e){e.each(function(f){this.removeImage(f)},this);return this},_validateImages:function(e){if(!Type.isArray(e)){throw new TypeError("The image is an array.")}return e}});c.AddMapBeforeState=new Class({Extends:c.State,started:true,initialize:function(e,f){this.parent(e)},isStart:function(){return this.started},start:function(){this.started=true},stop:function(){this.started=false}});c.AddMapAfterState=new Class({Extends:c.State,initialize:function(e,f){this.parent(e);this.imageChanger=new d(f)},setCurrent:function(e){try{this.imageChanger.setCurrent(e)}catch(f){throw f}this.parent(e)},setImages:function(e){this.parent(e);this.imageChanger.setImages(e);return this},addImage:function(e){this.parent(e);this.imageChanger.addImage(e);return this},addImages:function(e){this.parent(e);this.imageChanger.addImages(e);return this},removeImage:function(e){this.parent(e);this.imageChanger.removeImage(e);return this},removeImages:function(e){this.parent(e);this.imageChanger.removeImages(e);return this},isStart:function(){return this.imageChanger.isStart()},start:function(){this.imageChanger.start()},stop:function(){this.imageChanger.stop()}});var d=this.Images=new Class({Implements:[Options,Events],_current:0,_elements:[],_observer:null,_container:null,_mouseovered:false,_timerId:null,_started:null,options:{className:"marker image imagesDefault",current:0,images:[],observer:null,container:null,interval:2000,duration:2000,autoplay:true},initialize:function(e){this.setOptions(this._prepare(e));this._setupListeners();this._setup()},_prepare:function(e){["observer","container","current"].each(function(f){if(e[f]){this["_"+f]=e[f]}delete e[f]},this);if(e.images){this.addImages.apply(this,e.images)}return e},_setup:function(){var e=this.options;this._orderByFront(this.getCurrent());if(e.autoplay){this.start()}},_setupListeners:function(){var e=this;var g={click:"click",dblclick:"dblClick",mouseup:"mouseUp",mousedown:"mouseDown"};var f=function(h){if(h.preventDefault){h.preventDefault()}h.target=e;e.fireEvent(g[h.type],[h])};Object.each(g,function(i,h){this.getObserver().addEvent(h,f)},this);this.getObserver().addEvent("mouseout",this._MouseOut.bind(this))},setContainer:function(e){this._container=e},getContainer:function(){return this._container},setObserver:function(e){this._observer=e},getObserver:function(){return this._observer},setCurrent:function(e){if(!this.isValid(e)){throw new Error("Specified "+e+" is an invalid value.")}this._current=e},getCurrent:function(){return this._current},isValid:function(e){return(e<=0||e<=this._elements.length)?true:false},addImage:function(g){if(!Type.isObject(g)){throw new Error("")}var f=this.createElement(g);var e=this.getContainer();f.inject(e);this._elements.push(f);return this},addImages:function(){var e=Array.from(arguments);e.each(function(f){this.addImage(f)},this);return this},hasImage:function(f){var e=null;this._elements.some(function(h,g){var i=h.getElement("img").get("src");if(f.image==i){e=g;return true}else{return false}});return e},removeImage:function(g){var e=this.hasImage(g);if(!Type.isNumber(e)){return}var f=this._elements[e];this._elements.erase(f);f.destroy();return this},removeImages:function(){var e=Array.from(arguments);e.each(function(f){this.removeImage(f)},this);return this},getLength:function(){return this._elements.length},createElement:function(h){var e=new Element("li");var f=new Element("a",{href:h.url,title:h.title});var g=new Element("img",{src:h.image,title:h.title});g.inject(f);f.inject(e);e.store("marker.images.context",h);return this.initElement(e)},initElement:function(e){var g=this;var f=this.options;e.set("tween",{duration:f.duration,onComplete:function(){var j=g.getCurrent();var i=g._elements[j];var h=i.retrieve("marker.images.context");g._orderByFront(j);g.fireEvent("imageChangeEnd",[j,h]);g._next()}});e.addEvent("mouseover",this._MouseOver.bind(this));return e},_next:function(){this._timerId=this._changeImage.delay(this.options.interval,this)},_changeImage:function(){if(this.getLength()<=0){this.stop();return}var g=this._elements[this.getCurrent()];g.setStyle("z-index",1);var e=(this.getCurrent()+1<this._elements.length)?this.getCurrent()+1:0;var g=this._elements[e];this.setCurrent(e);g.setStyle("z-index",2);var f=g.get("tween");f.start("opacity",0,1);this.fireEvent("imageChangeStart",[e,g])},_orderByFront:function(e){this._elements.each(function(g,f){var h=(e==f)?{"z-index":1,opacity:1}:{"z-index":0,opacity:0};g.setStyles(h)})},isStart:function(){return(this._started)?true:false},start:function(){if(this.isStart()){return}this._next();this._started=true},stop:function(){clearTimeout(this._timerId);this._started=false},_MouseOver:function(e){if(this._mouseovered){return false}e.target=this;this.fireEvent("mouseOver",e);this._mouseovered=true},_MouseOut:function(e){if(!(e.target==this.getContainer()||e.target==this.getObserver())){return false}if(!this._mouseovered){return false}e.target=this;this.fireEvent("mouseOut",e);this._mouseovered=false}})}(MMap,MMap.Marker));(function(a){a.MarkerManager=new Class({Extends:a.MVCObject,Implements:[a.Events,a.Options],options:{map:null,markers:[]},initialize:function(b){this._container=new a.Container();this.setOptions(b);this._setup()},_setup:function(){var b={visibles:[],hiddens:[],actives:[],deactives:[]};this.addMarkers(this.options.markers);this.set("state",b);delete this.options.markers},setMap:function(c){var d=this.getContainer().rewind();this.set("map",c);while(d.isValid()){var b=d.getCurrent();b.setMap(c);d.next()}},getMap:function(){return this.get("map")},addMarker:function(c){var b=this.getContainer();b.addItem(c);c.setMap(this.getMap())},addMarkers:function(c){for(var b=0;l=c.length,b<l;b++){this.addMarker(c[b])}},removeMarker:function(c){var b=this.getContainer();b.removeItem(c);c.setMap(null)},removeMarkers:function(){var b=null,d=[],c=Array.from(arguments);if((c.length<=0)){c=this.getContainer().getItems()}while(c.length>0){d.push(c.shift())}d=d.flatten();while(d.length>0){b=d.shift();this.removeMarker(b)}},getContainer:function(){return this._container},getMarkers:function(){return this.getContainer().getItems()},setMarkers:function(e){var b=e.length,c=[];for(var d=0;d<b;d++){c.push(e[d])}this.getContainer().empty();this.addMarkers(c);this._displayMarkerChange()},getState:function(){var b=this.get("state");return b},_displayMarkerChange:function(){var g=this.getContainer().rewind();var f=[],e=[],b=[],d=[];while(g.isValid()){var c=g.getCurrent();(c.isVisible())?f.push(c):e.push(c);(c.isActive())?b.push(c):d.push(c);g.next()}var g={visibles:f,hiddens:e,actives:b,deactives:d};return this.set("state",g)},hasMarker:function(c){var b=false;var d=this.getContainer().rewind();while(d.isValid()){if(c==d.getCurrent()){b=true}d.next()}return b},visible:function(b){var c=function(d){return(b==d)?true:false};this._visibleMarkers.apply(this,[c]);this._displayMarkerChange()},visibleAll:function(){var c=this.getContainer().rewind();while(c.isValid()){var b=c.getCurrent();b.setVisible(true);c.next()}this._displayMarkerChange()},visibleByBounds:function(c){var b=function(d){return c.contains(d.getPosition())};this._visibleMarkers.apply(this,[b]);this._displayMarkerChange()},active:function(b){var c=function(d){return(b==d)?true:false};this._activeMarkers.apply(this,[c]);this._displayMarkerChange()},activeAll:function(){var c=this.getContainer().rewind();while(c.isValid()){var b=c.getCurrent();b.setActive(true);c.next()}this._displayMarkerChange()},activeByBounds:function(c){var b=function(d){return c.contains(d.getPosition())};this._activeMarkers.apply(this,[b]);this._displayMarkerChange()},_activeMarkers:function(d){var c=this.getContainer().rewind();while(c.isValid()){var b=c.getCurrent();b.setActive(d(b));c.next()}},_visibleMarkers:function(d){var c=this.getContainer().rewind();while(c.isValid()){var b=c.getCurrent();b.setVisible(d(b));c.next()}}})}(MMap));(function(a){a.MarkerLoader=new Class({Implements:[a.Events,a.Options],options:{format:"array"},initialize:function(b){this.setOptions(b)},load:function(d){var c=this;if(d){if(Type.isArray(d)){Object.merge(this.options,{markers:d})}else{Object.merge(this.options,d)}}var e=this.options.format;var b=a.MarkerLoader.factory(e);b.addEvents({onPreload:function(){c.fireEvent("preload")},onFailure:function(){var f=Array.from(arguments);c.fireEvent("failure",f)},onComplete:function(f){c.fireEvent("complete",[f])},onLoad:function(f){c.fireEvent("load",[c.build(f)])}});b.load(this.options)},build:function(e){var h=[],g=e.length;for(var d=0;d<g;d++){var c=e[d];var f=c.type||"html";f=(f=="html")?"HTML":f.capitalize();delete c.type;if(!a.Marker[f]){throw TypeError('Specified marker type "'+f+'" is not found.')}var b=new a.Marker[f](c);h.push(b)}return h}});a.MarkerLoader.factory=function(c){var b=null;switch(c){case"array":b=new a.MarkerLoader.Context();break;case"kml":break;case"json":default:b=new a.MarkerLoader.JSON();break}return b};a.MarkerLoader.Parser=new Class({Implements:[Events],parse:function(f){var b=[];var d=f.length;for(var e=0;e<d;e++){var c=f[e];var g=c.position;delete c.position;c.position=new google.maps.LatLng(g.latitude,g.longitude);b.push(c)}return b}});a.MarkerLoader.Context=new Class({Extends:a.MarkerLoader.Parser,load:function(c){this.fireEvent("preload");try{this.fireEvent("complete",[c.markers]);var d=this.parse(c.markers);this.fireEvent("load",[d])}catch(b){this.fireEvent("failure",[b])}}});a.MarkerLoader.JSON=new Class({Extends:a.MarkerLoader.Parser,_onRequest:function(){this.fireEvent("preload")},_onFailure:function(b){this.fireEvent("failure",[b])},_onSuccess:function(d,f){this.fireEvent("complete",[d]);var e=d.markers;var b=e.length;var c=this.parse(e);this.fireEvent("load",[c])},getRequest:function(d){if(this.request){this.request.setOptions(d);return this.request}var b=this;var c=["_onRequest","_onFailure","_onSuccess"];this.request=new Request.JSON(d);c.each(function(g){var f=b[g].bind(b);var e=g.replace("_","");b.request.addEvent(e,f);delete b[g]});return this.request},load:function(b){this.getRequest(b).send()}})}(MMap));(function(a,c){var b=15;a.Window=new Class({Extends:a.OverlayView,Implements:[a.Position],options:{className:"window windowDefault",title:"",content:"",zIndex:0,visible:true,active:false},initialize:function(d){this.parent(d)},_setup:function(d){var i=this.options.className;d.addClass(i);var j=this.get("zIndex");d.setStyle("z-index",j);var g=new Element("div",{"class":"inner"});var f=new Element("div",{"class":"hd"});var h=new Element("div",{"class":"bd"});var e=new Element("div",{"class":"ft"});g.adopt([f,h,e]);g.inject(d);var m=new Element("div",{"class":"hdgroup"});m.inject(f);var k=new Element("p",{"class":"close"});this._title=new Element("p",{"class":"title"});m.adopt([this._title,k]);this._closeButton=new Element("a",{title:"Close",href:"#",html:"Close"});this._closeButton.inject(k);this._content=new Element("div",{"class":"content"});this._content.inject(h);return g},_setupListeners:function(){var d=this;var e=this.toElement();this._closeButton.addEvent("click",function(f){if(f.prevnetDefault){f.prevnetDefault()}d.close();d.fireEvent("close")})},_init:function(){var d=this;var e=["title","content","position","zIndex","visible","active"];e.each(function(f){d.set(f,d.options[f])})},draw:function(){if(!this.isAdded()||!this.isOpen()){return this}this.refresh();var j=0;if(this._anchor){var g=this._anchor;var n=g.instance;j=n.getSize().y}var i=this.getProjection();var h=this.get("position");var q=this.instance.getSize();var p=i.fromLatLngToDivPixel(h);var k=p.y-q.y-j;var e=p.x-(q.x/2);var o={position:"absolute",left:e,top:k};this.instance.setStyles(o);var f=0;if(k<b&&k>=0){f=b-k}else{if(k<=0){f=Math.abs(k)+b}}var m=new c.Point(p.x,p.y-f);var d=i.fromDivPixelToLatLng(m);this.getMap().panTo(d)},refresh:function(){if(!this.isAdded()){return this}this._updateVisibleState();this._update()},_updateVisibleState:function(){this.setZIndex(this.get("zIndex")).setVisible(this.get("visible"))},_update:function(){this._title.set("html",this.get("title"));this._content.set("html",this.get("content"))},open:function(e,d){this._anchor=d;this.setPosition(d.getPosition());if(this.isOpen()){return}this.setMap(e);this.fireEvent("open");this._opened=true},close:function(){this._opened=false;this.fireEvent("close");this.setMap(null)},isOpen:function(){return(this._opened)?true:false},getZIndex:function(){return this.get("zIndex")},setZIndex:function(e){if(!Type.isNumber(e)){new TypeError("The data type is not an integer.")}this.set("zIndex",e);var d=this.toElement();d.setStyle("z-index",e);return this},getTitle:function(){return this.get("title")},setTitle:function(d){if(!Type.isString(d)){new TypeError("The data type is not a character string.")}this.set("title",d);this.draw();return this},getContent:function(){return this.get("content")},setContent:function(d){if(!Type.isString(d)||!Type.isElement(d)){new TypeError("The data type is a character string or not an element.")}this.set("content",d);this.draw();return this},setActive:function(e){if(!Type.isBoolean(e)){new TypeError("The data type is not an boolean.")}this.set("active",e);var d=this.toElement();if(e){this.fireEvent("active");d.addClass("active")}else{d.removeClass("active")}return this}})}(MMap,google.maps));
