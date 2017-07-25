var SxImage = fabric.util.createClass(fabric.Object, fabric.Observable, {
    type: "sximage",
	layerType : "image",
    id:'000',
    originX: 'left',
    originY: 'top',
    positions : [],
    previewMode : false,
    previewType : '',
	opacity : 1,
	resizable : true,
	aspectRatio : false,
	imageUrl : '',
	enabled : true,
	sortOrder : 0,
    transition : {
      "in" : {
        type : 'none',
        easing : 'easeOutExpo',
        cols : 1,
        rows : 1,
        duration : 1,
        delay : 0
      },
      "out" : {
        type : 'none',
        easing : 'easeOutExpo',
        cols : 1,
        rows : 1,
        duration : 1,
        delay : 0
      }
    },
	angle : 0,
    tileWidth : 0,
    tileHeight : 0,
    totalTiles : 0,
    objectCaching: false,
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
        transition: this.get('transition'),
        id : this.get('id'),
        type : this.get('type'),
        imageUrl : this.get('imageUrl'),
		aspectRatio : this.get('aspectRatio'),
		resizable : this.get('resizable'),
		layerType : this.get('layerType'),
		enabled : this.get('enabled'),
		sortOrder : this.get('sortOrder')
      });
    },
    initialize: function(options) {
		this.callSuper('initialize', options);
		this.setImage(options.imageUrl);
		if(options.resizable === false){
			this.setControlsVisibility({
				mt: false, 
				mb: false, 
				ml: false, 
				mr: false, 
				bl: false,
				br: false, 
				tl: false, 
				tr: false,
				mtr: false
			});
		}
		if(options.aspectRatio === true){
			this.lockUniScaling = true;
		}
		if(options.enabled === false){
			this.selectable = false;
		}
		this.on('event:modified',function(){
			console.log('changed');
		});
    },
	refresh : function(){
		this.setImage(this.imageUrl);
		if(this.resizable === false){
			this.setControlsVisibility({
				mt: false, 
				mb: false, 
				ml: false, 
				mr: false, 
				bl: false,
				br: false, 
				tl: false, 
				tr: false,
				mtr: false
			});
		}
		if(this.aspectRatio === true){
			this.lockUniScaling = true;
		}
		if(this.enabled === false){
			this.selectable = false;
		}
	},
    setImage : function(src){
		this.loaded = true;
	  this.image = new Image();
	  this.image.src = src;
	  this.image.onload = (function() {
		this.width = this.image.width;
		this.height = this.image.height;
		this.loaded = true;
		this.setCoords();
		this.fire('image:loaded');
	  }).bind(this);
    },
    setTransition : function($type , $opts){
      for (var key in $opts) {
        if ($opts.hasOwnProperty(key)) {
          this.transition[$type][key] = $opts[key];
        }
      }
      this.preview($type);
    },
    preview : function($type){
      this.previewMode = true;
      this.previewType = $type;
      if(SxImageTransition[this.transition[$type].type]){
        SxImageTransition[this.transition[$type].type][$type].init(this , this.transition[$type]);
      }
      
      
    },
    _render: function(ctx) {
      this.ctx = ctx;
      if(this.previewMode){
        if(SxImageTransition[this.transition[this.previewType].type]){
          SxImageTransition[this.transition[this.previewType].type][this.previewType].render(this);
        } else {
          ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
        }
        
      } else {
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
      }
      
    }
  });