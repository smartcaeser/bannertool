var SxImage = fabric.util.createClass(fabric.Object, fabric.Observable, {
    type: "sximage",
	layerType : "image",
    id:'000',
    originX: 'left',
    originY: 'top',
    name: '',
    positions : [],
	runMode : false,
	playlistMode : false,
    previewMode : false,
    previewType : '',
	previewOpts : {},
	opacity : 1,
	resizable : true,
	aspectRatio : false,
	imageUrl : '',
	readonly : false,
	enabled : true,
	sortOrder : 0,
	transitionIn : {},
	transitionOut : {},
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
        transitionIn: this.get('transitionIn'),
        transitionOut: this.get('transitionOut'),
        runMode: this.get('runMode'),
        id : this.get('id'),
        type : this.get('type'),
        imageUrl : this.get('imageUrl'),
		name : this.get('name'),
		aspectRatio : this.get('aspectRatio'),
		resizable : this.get('resizable'),
		layerType : this.get('layerType'),
		readonly : this.get('readonly'),
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
		} else {
			this.setControlsVisibility({
				mt: true, 
				mb: true, 
				ml: true, 
				mr: true, 
				bl: true,
				br: true, 
				tl: true, 
				tr: true,
				mtr: true
			});
		}
		if(options.aspectRatio === true){
			this.lockUniScaling = true;
		} else {
			this.lockUniScaling = false;
		}
		if(options.readonly === true){
			this.selectable = false;
		} else {
			this.selectable = true;
		}
		if(options.enabled === true){
			if(this.readonly === false){
				this.selectable = true;
			}
		} else {
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
		} else {
			this.setControlsVisibility({
				mt: true, 
				mb: true, 
				ml: true, 
				mr: true, 
				bl: true,
				br: true, 
				tl: true, 
				tr: true,
				mtr: true
			});
		}
		if(this.aspectRatio === true){
			this.lockUniScaling = true;
		} else {
			this.lockUniScaling = false;
		}
		if(this.readonly === true){
			this.selectable = false;
		} else {
			this.selectable = true;
		}
		if(this.enabled === true){
			if(this.readonly === false){
				this.selectable = true;
			}
		} else {
			this.selectable = false;
		}
	},
    setImage : function(src){
		this.loaded = false;
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
	animationComplete : function(){
		if(this.previewMode){
			this.previewMode = false;
			this.fire('image:loaded');
		}
	},
	reset : function(){
		this.previewMode = false;
		this.runMode = false;
		this.fire('image:loaded');
	},
	preview : function($type , $val){
		this.runMode = false;
		this.previewMode = true;
		this.previewType = $type;
		this.previewOpts = $val;
		if(SxImageTransition[$val.type]){
			SxImageTransition[$val.type][$type].init(this , $val);
		}
    },
    run : function(){
		this.previewMode = false;
		this.runMode = true;
		
		this.previewType = 'in';
		this.previewOpts = this.transitionIn;
		
		if(SxImageTransition[this.transitionIn.type]){
			SxImageTransition[this.transitionIn.type]['in'].init(this , this.transitionIn);
		}
		if(this.transitionOut.type){
			if(SxImageTransition[this.transitionOut.type]){
				var $this = this;
				setTimeout(function(){
					$this.previewType = 'out';
					$this.previewOpts = $this.transitionOut;
					SxImageTransition[$this.transitionOut.type]['out'].init($this , $this.transitionOut);
				},parseFloat(this.transitionOut.delay) * 1000);
			}
		}
    },
    _render: function(ctx) {
		if(this.enabled === false) return;
		if(this.playlistMode){
			ctx.globalAlpha = 0;
		}
		this.ctx = ctx;
		if(this.previewMode){
			if(SxImageTransition[this.previewOpts.type]){
				SxImageTransition[this.previewOpts.type][this.previewType].render(this);
			} else {
				ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
			}
		} else if(this.runMode){
			if(this.transitionIn.type){
				if(SxImageTransition[this.transitionIn.type]){
					SxImageTransition[this.transitionIn.type]['in'].render(this);
				}
			}
			
			if(this.transitionOut.type){
				if(SxImageTransition[this.transitionOut.type]){
					SxImageTransition[this.transitionOut.type]['out'].render(this);
				}
			}
			
		} else {
			ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
		}
    }
});