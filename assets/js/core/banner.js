function Banner($canvasId){
	fabric.Object.prototype.transparentCorners = false;
	fabric.Object.prototype.padding = 0;
	this.canvas = new fabric.Canvas($canvasId);
	this.layers = [];
	this.bannerBackgroundColor = '#ffffff';
	this.bannerWidth = 300;
	this.bannerHeight = 250;
	this.bannerZoom = 1;
	this.originalBannerWidth = 300;
	this.originalBannerHeight = 250;
    this.init();
}
Banner.prototype.init = function($model){
	var $this = this;
	fabric.Object.prototype.getZIndex = function() {
		return $this.canvas.getObjects().indexOf(this);
	};
	fabric.Object.prototype.context = function() {
		return $this.canvas.getContext();
	};

    this.canvas.on({"mouse:down": selectObject()});
	this.canvas.on('object:modified', onObjectModified);

	function onObjectModified(e) {    
		if(e.target.refresh){
			e.target.refresh();
		}
	}
	function selectObject() {
		return function(e) {
            $this.dispatchEvent( { type: 'select', item: e.target});
		};
	}
};
Banner.prototype.addText = function($model){
	var $text = new SxText($model);
    $text.on("text:animated", this.canvas.renderAll.bind(this.canvas));
	this.canvas.add($text);
	this.layers[$text.id] = $text;
	this.canvas.renderAll();
};
Banner.prototype.addImage = function($model){
	var $image = new SxImage($model);
	$image.on("image:loaded", this.canvas.renderAll.bind(this.canvas));
	this.canvas.add($image);
	this.layers[$image.id] = $image;
	this.canvas.renderAll();
};
Banner.prototype.getActiveObject = function(){
    var obj = this.canvas.getActiveObject();
	if (!obj) return;
	return this.layers[obj.id];
};
Banner.prototype.deleteObjects = function(){
    var activeObject = this.canvas.getActiveObject(),
    activeGroup = this.canvas.getActiveGroup();
    if (activeObject) {
        if (confirm('Are you sure?')) {
            delete this.layers[activeObject.id]
            this.canvas.remove(activeObject);
        }
    }
    else if (activeGroup) {
        if (confirm('Are you sure?')) {
            var objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
			
            objectsInGroup.forEach(function(object) {
              delete this.layers[object.id]
              this.canvas.remove(object);
            });
        }
    }
};
Banner.prototype.deleteObject = function($id){
    this.canvas.remove(this.layers[$id]);
	delete this.layers[$id];
};
Banner.prototype.updateProp = function($prop,$val){
	console.groupCollapsed("Update Prop");
	console.log($prop,$val);
	console.groupEnd();
	
    this[$prop] = $val;
	this.canvas.setBackgroundColor(this.bannerBackgroundColor);
	this.canvas.setDimensions({width:this.bannerWidth,height:this.bannerHeight});
	this.canvas.renderAll();
};
Banner.prototype.updateSelectedObject = function($prop,$val){
	
    var activeObject = this.canvas.getActiveObject()
	if (activeObject) {
        this.layers[activeObject.id].set($prop , $val);
		if($prop == 'sortOrder'){
			this.canvas.moveTo(activeObject,$val);
		}
		if($prop == 'readonly'){
			this.layers[activeObject.id].set('selectable' , $val);
		}
		this.canvas.trigger('object:modified', {target: this.layers[activeObject.id]});
		this.canvas.renderAll();
    }
};
Banner.prototype.previewTransitionToSelectedObject = function($type,$val){
    var activeObject = this.canvas.getActiveObject()
	if (activeObject) {
        this.layers[activeObject.id].preview($type , $val);
		this.canvas.renderAll();
    }
};
Banner.prototype.updateLayerProp = function($layerId,$prop,$val){
	console.groupCollapsed("Update Layer Prop");
	console.log($layerId,$prop,$val);
	console.groupEnd();
	
    var activeObject = this.canvas.setActiveObject(this.layers[$layerId]);
	if (activeObject) {
        this.layers[$layerId].set($prop , $val);
		if($prop == 'sortOrder'){
			this.canvas.moveTo(activeObject,$val);
		}
		if($prop == 'readonly'){
			this.layers[$layerId].set('selectable' , $val);
		}
		this.canvas.trigger('object:modified', {target: this.layers[$layerId]});
		this.canvas.renderAll();
    }
};
Banner.prototype.selectLayer = function($layerId){
    this.canvas.setActiveObject(this.layers[$layerId]);
};
Banner.prototype.unSelectLayers = function(){
	this.canvas.discardActiveObject();
	this.canvas.renderAll();
};
Banner.prototype.getAnimationsList = function($type){
	var list = [];
	switch($type){
		case 'text':
		list =this.getAnimations(SxTextTransition);
		break;
		
		case 'image':
		list =this.getAnimations(SxImageTransition);
		break;
	}
	return list;
};
Banner.prototype.getAnimations = function($type){
	var ids = Object.keys($type) ,
	total_ids = ids.length,anims = [];
	for(var i = 0 ; i < total_ids ; i++){
		anims.push({"key": ids[i] ,"value":$type[ids[i]].name});
	}
	return anims;
};
// run full preview
Banner.prototype.run = function(){
    for (var $layerId in this.layers) {
		this.layers[$layerId].run();
	}
};
Banner.prototype.load = function($data){
    var $this = this;
	this.layers = [];
	for(var $bannerOpt in $data){
		if($bannerOpt != "layers"){
			this.updateProp($bannerOpt , $data[$bannerOpt]);
		}
		
	}
	
	for(var $layer in $data.layers.objects){
		if($data.layers.objects[$layer].type == 'sximage'){
			this.addImage($data.layers.objects[$layer]);
		} else if($data.layers.objects[$layer].type == 'sxtext'){
			this.addText($data.layers.objects[$layer]);
		}
	}
	
};
Banner.prototype.getBannerModel = function(){
	
    return {
		"bannerBackgroundColor" : this.bannerBackgroundColor,
		"bannerWidth" : this.bannerWidth,
		"bannerHeight" : this.bannerHeight,
		"bannerZoom" : this.bannerZoom,
		"originalBannerWidth" : this.originalBannerWidth,
		"originalBannerHeight" : this.originalBannerHeight,
		"layers" : this.canvas.toDatalessJSON().objects
		};
};
Object.assign(Banner.prototype, EventDispatcher.prototype);

