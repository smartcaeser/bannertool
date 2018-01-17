function Banner($canvasId , runMode){
	fabric.Object.prototype.transparentCorners = false;
	fabric.Object.prototype.padding = 0;

	this.runMode = (runMode === void 0) ? false : runMode;
	if(this.runMode){
		this.canvas = new fabric.StaticCanvas($canvasId);
	} else {
		this.canvas = new fabric.Canvas($canvasId,{ preserveObjectStacking: true });
	}
	
	this.layers = [];
	this.bannerBackgroundColor = '#ffffff';
	this.bannerWidth = 300;
	this.bannerHeight = 250;
	this.bannerZoom = 1;
	this.originalBannerWidth = 300;
	this.originalBannerHeight = 250;
	if(!this.runMode){
		this.canvas.wrapperEl.style.webkitTransformOrigin = "0 0";
		this.canvas.wrapperEl.style.msTransformOrigin = "0 0";
		this.canvas.wrapperEl.style.transformOrigin = "0 0";
		
		this.canvas.wrapperEl.style.webkitTransform = "scale(" + this.bannerZoom +  ")";
		this.canvas.wrapperEl.style.msTransform = "scale(" + this.bannerZoom +  ")";
		this.canvas.wrapperEl.style.transform = "scale(" + this.bannerZoom +  ")";
	}

	
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
			$this.checkCornerSize();
            $this.dispatchEvent( { type: 'select', item: e.target});
		};
	}

};
Banner.prototype.checkCornerSize = function(){
	var $object = this.canvas.getActiveObject();
	if (!$object) return;
	if($object['cornerSize']){
		if(this.bannerZoom < 1){
			$object['cornerSize'] = (13 / (this.bannerZoom * 13)) * 13;
		}
	}
}
Banner.prototype.addText = function($model){
	$model.playlistMode = this.runMode;
	var $text = new SxText($model);
    $text.on("text:animated", this.canvas.renderAll.bind(this.canvas));
	this.canvas.add($text);
	this.layers[$text.id] = $text;
	this.canvas.renderAll();
};
Banner.prototype.addImage = function($model){
	$model.playlistMode = this.runMode;
	var $image = new SxImage($model);
	$image.on("image:loaded", this.canvas.renderAll.bind(this.canvas));
	this.canvas.add($image);
	this.layers[$image.id] = $image;
	this.canvas.renderAll();
};
Banner.prototype.addVideo = function($model){
	$model.playlistMode = this.runMode;
	var $video = new SxVideo($model);
	$video.on("image:loaded", this.canvas.renderAll.bind(this.canvas));
	this.canvas.add($video);
	this.layers[$video.id] = $video;
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
	if(!this.runMode){
		console.groupCollapsed("Update Prop");
		console.log($prop,$val);
		console.groupEnd();
	}
	
	
    this[$prop] = $val;
	this.canvas.setBackgroundColor(this.bannerBackgroundColor);
	this.canvas.setDimensions({width:this.bannerWidth,height:this.bannerHeight});
	if(!this.runMode){
		this.canvas.wrapperEl.style.webkitTransform = "scale(" + this.bannerZoom +  ")";
		this.canvas.wrapperEl.style.msTransform = "scale(" + this.bannerZoom +  ")";
		this.canvas.wrapperEl.style.transform = "scale(" + this.bannerZoom +  ")";
		this.checkCornerSize();
	}
	this.canvas.renderAll();
};
Banner.prototype.updateSelectedObject = function($prop,$val){
	
    var activeObject = this.canvas.getActiveObject();
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
    var activeObject = this.canvas.getActiveObject();
	if (activeObject) {
        this.layers[activeObject.id].preview($type , $val);
		this.canvas.renderAll();
    }
};
Banner.prototype.updateLayerProp = function($layerId,$prop,$val){
	if(!this.runMode){
		console.groupCollapsed("Update Layer Prop");
		console.log($layerId,$prop,$val);
		console.groupEnd();
	}
	
    var activeObject = this.canvas.setActiveObject(this.layers[$layerId]);
	this.updateSelectedObject($prop,$val);
};
Banner.prototype.selectLayer = function($layerId){
    this.canvas.setActiveObject(this.layers[$layerId]);
};
Banner.prototype.unSelectLayers = function(){
	this.canvas.discardActiveObject();
	this.canvas.renderAll();
};
Banner.prototype.getSettings = function(){
	var $this = this;
	return {
		animations : {
			image : this.getAnimationsList('image'),
			text : this.getAnimationsList('text'),
			video : this.getAnimationsList('video')
		},
		easing : ['Expo','Cubic','Quad','Quart','Sine','Circ','Back','Elastic','Bounce'],
		easingType : ['easeIn','easeOut','easeInOut']
	};
};
Banner.prototype.getAnimationsList = function($type){
	var list = [];
	switch($type){
		case 'text':
		list = this.getAnimations(SxTextTransition);
		break;
		
		case 'image':
		list = this.getAnimations(SxImageTransition);
		break;
		
		case 'video':
		list = this.getAnimations(SxVideoTransition);
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
	var $this = this;
	this.runVal = 0 , this.layersLoaded = 0 , this.layersSize = 0 , this.bannerDuration = 0;
	this.runVal = setInterval(function(){
		$this.layersLoaded = 0;
		$this.layersSize = 0;
		for (var $layerId in $this.layers) {
			$this.layersSize++;
			if($this.layers[$layerId].loaded){
				$this.layersLoaded++;
			}
		}
		if($this.layersLoaded == $this.layersSize){
			clearInterval($this.runVal);
			for (var $layerId in $this.layers) {
				if($this.layers[$layerId].transitionIn.duration){
					$this.bannerDuration += parseFloat($this.layers[$layerId].transitionIn.duration) + parseFloat($this.layers[$layerId].transitionIn.delay);
				}
				if($this.layers[$layerId].transitionOut.duration){
					$this.bannerDuration += parseFloat($this.layers[$layerId].transitionOut.duration) + parseFloat($this.layers[$layerId].transitionOut.delay);
				}
				$this.layers[$layerId].run();
			}
			$this.bannerDuration = $this.bannerDuration * 1000;
			if(!this.runMode){
				setTimeout(function(){
					for (var $layerId in $this.layers) {
						$this.layers[$layerId].reset();
					}
				},$this.bannerDuration);
			}
			
		}
	},200);
    
};
Banner.prototype.load = function($data){
    var $this = this;
	this.layers = [];
	for(var $bannerOpt in $data){
		if($bannerOpt != "layers"){
			this.updateProp($bannerOpt , $data[$bannerOpt]);
		}
		
	}
	var $layersData = ($data.layers.objects) ? $data.layers.objects : $data.layers;
	for(var $layer in $layersData){
		if($layersData[$layer].type == 'sximage'){
			this.addImage($layersData[$layer]);
		} else if($layersData[$layer].type == 'sxtext'){
			this.addText($layersData[$layer]);
		} else if($layersData[$layer].type == 'sxvideo'){
			this.addVideo($layersData[$layer]);
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

