var SxVideo = fabric.util.createClass(fabric.Image, fabric.Observable, {
    type: "sxvideo",
	layerType : "video",
    id:'000',
    originX: 'left',
    originY: 'top',
    name: '',
    positions : [],
	runMode : false,
    previewMode : false,
    previewType : '',
	previewOpts : {},
	opacity : 1,
	resizable : true,
	aspectRatio : false,
	videoUrl : '',
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
        videoUrl : this.get('videoUrl'),
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
		this.options = options;
		this.video = document.createElement("video");
		this.callSuper('initialize' , this.video, this.options);
		this.video.src = options.videoUrl;
		this.video.autoPlay = false;
		this.video.loop = true;
		this.video.muted = false;
		this.videoContainer = {
			 video : this.video,
			 ready : false,   
		};
		this.video.onerror = function(e){
			
		};
		this.video.oncanplay = this.readyToPlayVideo.bind(this);
		this.setVideo(options.videoUrl);
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
		this.setVideo(this.videoUrl);
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
    setVideo : function(src){
		
    },
	renderVideo : function(){
		this.fire('image:loaded');
		window.requestAnimationFrame(this.renderVideo.bind(this));
    },
	readyToPlayVideo : function(e){
		
		this.width = e.target.videoWidth;
		this.height = e.target.videoHeight;
		this.loaded = true;
		this.setCoords();
		this.fire('image:loaded');
		this.getElement().play();
		this.renderVideo();
    },
    setTransition : function($type , $opts){
		for (var key in $opts) {
			if ($opts.hasOwnProperty(key)) {
				this.transition[$type][key] = $opts[key];
			}
		}
		this.preview($type);
    },
	preview : function($type , $val){
		this.runMode = false;
		this.previewMode = true;
		this.previewType = $type;
		this.previewOpts = $val;
		
		if(SxVideoTransition[$val.type]){
			SxVideoTransition[$val.type][$type].init(this , $val);
		}
		
    },
    run : function(){

		this.previewMode = true;
		this.runMode = false;
		
		this.previewType = 'in';
		this.previewOpts = this.transitionIn;
		
		if(SxVideoTransition[this.transitionIn.type]){
			SxVideoTransition[this.transitionIn.type]['in'].init(this , this.transitionIn);
		}
		if(this.transitionOut.type){
			if(SxVideoTransition[this.transitionOut.type]){
				var $this = this;
				setTimeout(function(){
					$this.previewType = 'out';
					$this.previewOpts = $this.transitionOut;
					SxVideoTransition[$this.transitionOut.type]['out'].init($this , $this.transitionOut);
				},parseFloat(this.transitionOut.delay) * 1000);
			}
		}
		
    },
    _render: function(ctx) {
		if(this.enabled === false) return;
		this.ctx = ctx;
		//this.callSuper('_render', ctx);
		
		if(this.previewMode){
			if(SxVideoTransition[this.previewOpts.type]){
				SxVideoTransition[this.previewOpts.type][this.previewType].render(this);
			} else {
				ctx.drawImage(this.video, -this.width / 2, -this.height / 2);
			}
		} else if(this.runMode){
			if(this.transitionIn.type){
				if(SxVideoTransition[this.transitionIn.type]){
					SxVideoTransition[this.transitionIn.type]['in'].render(this);
				}
			}
			if(this.transitionOut.type){
				if(SxVideoTransition[this.transitionOut.type]){
					SxVideoTransition[this.transitionOut.type]['out'].render(this);
				}
			}
			
		} else {
			ctx.drawImage(this.video, -this.width / 2, -this.height / 2);
		}
		
    }
});