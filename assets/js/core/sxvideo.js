var SxVideo = fabric.util.createClass(fabric.Image, fabric.Observable, {
    type: "sxvideo",
	layerType : "video",
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
	scene : '',
	loop : false,
	resizable : true,
	aspectRatio : false,
	videoUrl : '',
	readonly : false,
	loopVideo : false,
	muteVideo : false,
	enabled : true,
	sortOrder : 0,
	transitionIn : {},
	transitionOut : {},
	angle : 0,
    tileWidth : 0,
    tileHeight : 0,
    totalTiles : 0,
    objectCaching: false,
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
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
		loopVideo : this.get('loopVideo'),
		loop : this.get('loop'),
		scene : this.get('scene'),
		muteVideo : this.get('muteVideo'),
		enabled : this.get('enabled'),
		sortOrder : this.get('sortOrder')
      });
    },
    initialize: function(options) {
		this.isIE = /*@cc_on!@*/false || !!document.documentMode;	
		this.options = options;
		this.video = document.createElement("video");
		this.callSuper('initialize' , this.video, this.options);
		this.video.src = options.videoUrl;
		this.video.autoPlay = false;
		this.video.loop = options.loopVideo;
		if(!this.previewMode){
			
		}
		this.video.muted = options.muteVideo;
		this.videoContainer = {
			 video : this.video,
			 ready : false,   
		};
		this.video.onerror = function(e){
			
		};
		
		this.video.oncanplay = this.readyToPlayVideo.bind(this);
		this.loaded = false;
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
		if(this.isIE){
			e.target.playbackRate = 0.5;
		}
		this.width = e.target.videoWidth;
		this.height = e.target.videoHeight;
		this.loaded = true;
		this.setCoords();
		this.fire('image:loaded');
		this.fire('object:loaded',{target : this.type});
		this.renderVideo();
    },
	adjust:function($coords){
		var scaleVal;
		if(this.width > this.height){
			if(this.width > $coords.width){
				scaleVal = ($coords.width / this.width) * 0.7;
			} else {
				scaleVal = ($coords.height / this.height) * 0.7;
			}
			this.scaleX = scaleVal;
			this.scaleY = scaleVal;
			this.left = ($coords.width - (this.width * scaleVal)) * 0.5;
			this.top = ($coords.height - (this.height * scaleVal)) * 0.5;
			this.fire('image:loaded');
		} else {
			
			if(this.height > $coords.height){
				scaleVal = ($coords.height / this.height) * 0.7;
			} else {
				scaleVal = ($coords.width / this.width) * 0.7;
			}
			this.scaleX = scaleVal;
			this.scaleY = scaleVal;
			this.left = ($coords.width - (this.width * scaleVal)) * 0.5;
			this.top = ($coords.height - (this.height * scaleVal)) * 0.5;
			this.fire('image:loaded');
		}
	},
	playVideo : function(){
		if(this.loaded){
			this.getElement().play();
		}
	},
	animationComplete : function(){
		if(this.previewMode){
			this.previewMode = false;
			this.fire('image:loaded');
		} else {
			this.totalAnims--;
			if(this.totalAnims == 0 && this.loop){
				this.run();
			}
		}
	},
	reset : function(){
		this.previewMode = false;
		this.runMode = false;
		this.playlistMode = false;
		this.fire('image:loaded');
	},
	preview : function($type , $val){
		this.runMode = false;
		this.playlistMode = false;
		this.previewMode = true;
		this.previewType = $type;
		this.previewOpts = $val;
		
		if(SxVideoTransition[$val.type]){
			SxVideoTransition[$val.type][$type].init(this , $val);
			this.playVideo();
		}
		
		
    },
	isEmpty : function(obj) { 
	   for (var x in obj) { return false; }
	   return true;
	},
    run : function(){
		
		this.totalAnims = 0;
		var $this = this;
		this.previewMode = false;
		this.runMode = true;
		this.playlistMode = true;
		
		this.previewType = 'in';
		this.previewOpts = this.transitionIn;
		if(SxVideoTransition[this.transitionIn.type]){
			this.totalAnims++;
			SxVideoTransition[this.transitionIn.type]['in'].init(this , this.transitionIn);
			setTimeout(function(){
				$this.playVideo();
			},(parseFloat($this.transitionIn.delay) * 1000));
		}
		if(this.transitionOut.type){
			if(SxVideoTransition[this.transitionOut.type]){
				this.totalAnims++;
				var $this = this;
				setTimeout(function(){
					$this.previewType = 'out';
					$this.previewOpts = $this.transitionOut;
					SxVideoTransition[$this.transitionOut.type]['out'].init($this , $this.transitionOut);
				},parseFloat(this.transitionOut.delay) * 1000);
			}
		}
		if(this.isEmpty(this.transitionIn)){
			$this.playVideo();
		}
    },
    _render: function(ctx) {
		if(this.enabled === false) return;
		if(this.playlistMode){
			if(this.transitionIn.type && SxImageTransition[this.transitionIn.type]){
				ctx.globalAlpha = 0;
			} else {
				ctx.drawImage(this.video, -this.width / 2, -this.height / 2);
			}
		}
		
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