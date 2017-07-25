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
		  if (e.target && e.target.id) {
		   switch(e.target.get('type')){
			 case 'sximage':
			   handleImageEditor(e.target);
			   break;
			 case 'sxtext':
			   handleTextEditor(e.target);
			   break;
		   }
		  } else {
			disactiveEditor();
		  }
		};
	}
	document.addEventListener("keydown",function(e){
	  if(e.keyCode == 46){
		$this.deleteObjects();
		disactiveEditor();
	  }
	});
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
    this[$prop] = $val;
	this.canvas.setBackgroundColor(this.bannerBackgroundColor);
	this.canvas.setDimensions({width:this.bannerWidth,height:this.bannerHeight});
	this.canvas.renderAll();
};
Banner.prototype.updateLayerProp = function($layerId,$prop,$val){
    var activeObject = this.canvas.setActiveObject(this.layers[$layerId]);
	if (activeObject) {
        this.layers[$layerId].set($prop , $val);
		if($prop == 'sortOrder'){
			this.canvas.moveTo(activeObject,$val);
		}
		this.canvas.trigger('object:modified', {target: this.layers[$layerId]});
		this.canvas.renderAll();
    }
};
Banner.prototype.selectLayer = function($layerId){
    this.canvas.setActiveObject(this.layers[$layerId]);
};
Banner.prototype.load = function($data){
    
};
Banner.prototype.getBannerModel = function(){
    return JSON.stringify(this.canvas);
};


