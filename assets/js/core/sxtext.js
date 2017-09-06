var SxText = fabric.util.createClass(fabric.Object, fabric.Observable, {
    type: "sxtext",
	layerType : "text",
    id:'000',
    originX: 'left',
	ctx : '',
    originY: 'top',
    text:'',
    fontFamily : '',
    fontSize : '',
    fontColor : '',
	fontStyleBold : false,
	fontStyleItalic : false,
	fontStyleUnderline : false,
	runMode : false,
    previewMode : false,
    previewType : '',
    positions : [],
	opacity : 1,
	resizable : true,
	aspectRatio : false,
	imageUrl : '',
	enabled : true,
	sortOrder : 0,
	angle : 0,
	transitionIn : {},
	transitionOut : {},
    transition : {
      "in" : {
        type : 'none',
        easing : 'Expo.easeOut',
        duration : 0,
        delay : 0
      },
      "out" : {
        type : 'none',
        easing : 'Expo.easeOut',
        duration : 0,
        delay : 0
      }
    },
    i : 0,
    objectCaching: false,
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
		id : this.get('id'),
        type : this.get('type'),
        transition: this.get('transition'),
		transitionIn: this.get('transitionIn'),
        transitionOut: this.get('transitionOut'),
        runMode: this.get('runMode'),
		ctx: this.get('ctx'),
        text: this.get('text'),
        fontFamily : this.get('fontFamily'),
        fontSize : this.get('fontSize'),
        fontColor : this.get('fontColor'),
		fontStyleBold : this.get('fontStyleBold'),
		fontStyleItalic : this.get('fontStyleItalic'),
		fontStyleUnderline : this.get('fontStyleUnderline'),
		aspectRatio : this.get('aspectRatio'),
		resizable : this.get('resizable'),
		layerType : this.get('layerType'),
		enabled : this.get('enabled'),
		sortOrder : this.get('sortOrder')
      });
    },
    initialize: function(options) {
		this.callSuper('initialize', options);
		this.ctx = this.context();
		this.id = 'txt' + (new Date()).getTime();
		this.setText(options);
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
      
    },
	refresh : function(){
		this.setText(this);
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
    setText : function(options){
      this.text = options.text;
      this.length = this.text.length;
      this.fontFamily = options.fontFamily;
      this.fontSize = options.fontSize;
      this.fontColor = options.fontColor;
      this.ctx.font = this.fontSize + ' ' + this.fontFamily;
      this.width = this.ctx.measureText(this.text).width;
      this.height = parseInt(this.fontSize);
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
		if(SxTextTransition[$val.type]){
			SxTextTransition[$val.type][$type].init(this , $val);
		}
		
    },
	run : function(){
		this.previewMode = true;
		this.runMode = false;
		
		this.previewType = 'in';
		this.previewOpts = this.transitionIn;
		
		if(SxTextTransition[this.transitionIn.type]){
			SxTextTransition[this.transitionIn.type]['in'].init(this , this.transitionIn);
		}
		if(this.transitionOut.type){
			if(SxTextTransition[this.transitionOut.type]){
				var $this = this;
				setTimeout(function(){
					$this.previewType = 'out';
					$this.previewOpts = $this.transitionOut;
					SxTextTransition[$this.transitionOut.type]['out'].init($this , $this.transitionOut);
				},parseFloat(this.transitionOut.delay) * 1000);
			}
		}
		
		
		
    },
    _render: function(ctx) {
		ctx.font = this.fontSize + ' ' + this.fontFamily;
		ctx.fillStyle = this.fontColor;
		if(this.previewMode){
			if(SxTextTransition[this.previewOpts.type]){
				SxTextTransition[this.previewOpts.type][this.previewType].render(this);
			} else {
				ctx.fillText(this.text, -this.width / 2,parseInt(this.fontSize)/3);
			}
		} else if(this.runMode){
			if(this.transitionIn.type){
				if(SxTextTransition[this.transitionIn.type]){
					SxTextTransition[this.transitionIn.type]['in'].render(this);
				}
			}
			if(this.transitionOut.type){
				if(SxTextTransition[this.transitionOut.type]){
					SxTextTransition[this.transitionOut.type]['out'].render(this);
				}
			}
			
		} else {
			ctx.fillText(this.text, -this.width / 2,parseInt(this.fontSize)/3);
		}
    }
  });