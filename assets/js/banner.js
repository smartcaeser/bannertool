function Banner(){
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
    canvas.on({"mouse:down": selectObject()});
	canvas.on('object:modified', onObjectModified);

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
    $text.on("text:animated", canvas.renderAll.bind(canvas));
	canvas.add($text);
	this.layers[$text.id] = $text;
	canvas.renderAll();
};
Banner.prototype.addImage = function($model){
	var $image = new SxImage($model);
	$image.on("image:loaded", canvas.renderAll.bind(canvas));
	canvas.add($image);
	this.layers[$image.id] = $image;
	canvas.renderAll();
};
Banner.prototype.getActiveObject = function(){
    var obj = canvas.getActiveObject();
	if (!obj) return;
	return this.layers[obj.id];
};
Banner.prototype.deleteObjects = function(){
    var activeObject = canvas.getActiveObject(),
    activeGroup = canvas.getActiveGroup();
    if (activeObject) {
        if (confirm('Are you sure?')) {
            delete this.layers[activeObject.id]
            canvas.remove(activeObject);
        }
    }
    else if (activeGroup) {
        if (confirm('Are you sure?')) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
              delete this.layers[object.id]
              canvas.remove(object);
            });
        }
    }
};
Banner.prototype.deleteObject = function($id){
    canvas.remove(this.layers[$id]);
	delete this.layers[$id];
};
Banner.prototype.updateProp = function($prop,$val){
    this[$prop] = $val;
	canvas.setBackgroundColor(this.bannerBackgroundColor);
	canvas.setDimensions({width:this.bannerWidth,height:this.bannerHeight});
	canvas.renderAll();
};
Banner.prototype.updateLayerProp = function($layerId,$prop,$val){
    var activeObject = canvas.setActiveObject(this.layers[$layerId]);
	if (activeObject) {
        this.layers[$layerId].set($prop , $val);
		if($prop == 'sortOrder'){
			canvas.moveTo(activeObject,$val);
		}
		canvas.trigger('object:modified', {target: this.layers[$layerId]});
		canvas.renderAll();
    }
};
Banner.prototype.selectLayer = function($layerId){
    canvas.setActiveObject(this.layers[$layerId]);
};
Banner.prototype.load = function($data){
    
};
Banner.prototype.getBannerModel = function(){
    return JSON.stringify(canvas);
};

var banner = new Banner();