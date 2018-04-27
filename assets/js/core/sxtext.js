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
	name : '',
	fontStyleBold : false,
	fontStyleItalic : false,
	fontStyleUnderline : false,
	fontLetterSpacing : 0,
	runMode : false,
	playlistMode : false,
    previewMode : false,
    previewType : '',
    positions : [],
	txtPositions : [],
	opacity : 1,
	scene : '',
	loop : false,
	resizable : true,
	aspectRatio : false,
	imageUrl : '',
	readonly : false,
	enabled : true,
	sortOrder : 0,
	angle : 0,
	transitionIn : {},
	transitionOut : {},
    i : 0,
    objectCaching: false,
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
		id : this.get('id'),
        type : this.get('type'),
		transitionIn: this.get('transitionIn'),
        transitionOut: this.get('transitionOut'),
        runMode: this.get('runMode'),
		ctx: this.get('ctx'),
        text: this.get('text'),
        fontFamily : this.get('fontFamily'),
        fontSize : this.get('fontSize'),
        fontColor : this.get('fontColor'),
		fontStyleBold : this.get('fontStyleBold'),
		name : this.get('name'),
		fontStyleItalic : this.get('fontStyleItalic'),
		fontStyleUnderline : this.get('fontStyleUnderline'),
		fontLetterSpacing : this.get('fontLetterSpacing'),
		aspectRatio : this.get('aspectRatio'),
		resizable : this.get('resizable'),
		loop : this.get('loop'),
		scene : this.get('scene'),
		layerType : this.get('layerType'),
		readonly : this.get('readonly'),
		enabled : this.get('enabled'),
		sortOrder : this.get('sortOrder')
      });
    },
    initialize: function(options) {
		this.callSuper('initialize', options);
		this.ctx = this.context();
		this.viewItem = false;
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
    setText : function(options){
		this.loaded = true;
		var exstr = '';
		if(options.fontStyleBold === true){
			exstr += 'bold ';
		}
		if(options.fontStyleItalic === true){
			exstr += 'italic ';
		}
		this.text = options.text;
		this.length = this.text.length;
		this.fontFamily = options.fontFamily;
		this.fontSize = options.fontSize;
		this.fontColor = options.fontColor;
		this.ctx.font = exstr + this.fontSize + ' ' + this.fontFamily;
		this.width = (this.finalWidth >= 0) ? this.finalWidth : this.ctx.measureText(this.text).width;
		this.height = parseInt(this.fontSize);
    },
	animationComplete : function(){
		if(this.previewMode){
			this.previewMode = false;
			this.fire('text:animated');
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
		this.fire('text:animated');
	},
    preview : function($type , $val){
		this.runMode = false;
		this.playlistMode = false;
		this.previewMode = true;
		this.previewType = $type;
		this.previewOpts = $val;
		if(SxTextTransition[$val.type]){
			SxTextTransition[$val.type][$type].init(this , $val);
		}
    },
    run : function(){
		this.totalAnims = 0;
		this.previewMode = false;
		this.runMode = true;
		this.playlistMode = true;
		this.previewType = 'in';
		this.previewOpts = this.transitionIn;
		
		if(SxTextTransition[this.transitionIn.type]){
			this.totalAnims++;
			SxTextTransition[this.transitionIn.type]['in'].init(this , this.transitionIn);
		}
		if(this.transitionOut.type){
			if(SxTextTransition[this.transitionOut.type]){
				this.totalAnims++;
				var $this = this;
				setTimeout(function(){
					$this.previewType = 'out';
					$this.previewOpts = $this.transitionOut;
					SxTextTransition[$this.transitionOut.type]['out'].init($this , $this.transitionOut);
				},parseFloat(this.transitionOut.delay) * 1000);
			}
		}
    },
	underline: function(context,text,x,y,color,textSize,align){
		var textWidth = this.finalWidth;
		var startX = 0;
		var startY = y+(parseInt(textSize)/2);
		var endX = 0;
		var endY = startY;
		var underlineHeight = parseInt(textSize)/15;

		if(underlineHeight < 1){
			underlineHeight = 1;
		}

		context.beginPath();
		if(align == "center"){
			startX = x - (textWidth/2);
			endX = x + (textWidth/2);
		}else if(align == "right"){
			startX = x-textWidth;
			endX = x;
		}else{
			startX = x;
			endX = x + textWidth;
		}
  
		context.strokeStyle = color;
		context.lineWidth = underlineHeight;
		context.moveTo(startX,startY);
		context.lineTo(endX,endY);
		context.stroke();
	},
	_letterSpacing : function($context, $text, $x, $y, $spacing){
		$spacing = parseInt($spacing);
		var txtWidth = $context.measureText($text).width , $char = '',$wShorter = 0,$wChar = 0;
		this.finalWidth = 0;
		this.txtPositions = [];
		do{
			$char = $text.substr(0, 1);
			$text = $text.substr(1);
			$context.fillText($char, $x, $y);
			this.txtPositions.push({x : $x, y : $y , char : $char});
			if ($text == ""){
				$wShorter = 0;
			} else {
				$wShorter = $context.measureText($text).width;
			}
			$wChar = txtWidth - $wShorter;
			$x += $wChar + $spacing;
			
			this.finalWidth += $context.measureText($char).width + $spacing;

			txtWidth = $wShorter;
		} while ($text != "");
		this.width = this.finalWidth - $spacing;
	},
    _render: function(ctx) {
		if(this.enabled === false) return;
		
		var exstr = '';
		if(this.fontStyleBold === true){
			exstr += 'bold ';
		}
		if(this.fontStyleItalic === true){
			exstr += 'italic ';
		}
		ctx.font = exstr + this.fontSize + 'pt ' + this.fontFamily;
		ctx.fillStyle = this.fontColor;
		
		
		if(this.playlistMode){
			if(this.transitionIn.type && SxTextTransition[this.transitionIn.type]){
				ctx.globalAlpha = 0;
			} else {
				this._letterSpacing(ctx, this.text, -this.width / 2,parseInt(this.fontSize)/3, this.fontLetterSpacing);
			}
		}
		
		if(this.previewMode){
			if(SxTextTransition[this.previewOpts.type]){
				SxTextTransition[this.previewOpts.type][this.previewType].render(this);
			} else {
				this._letterSpacing(ctx, this.text, -this.width / 2,parseInt(this.fontSize)/3, this.fontLetterSpacing);
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
			
			this._letterSpacing(ctx, this.text, -this.width / 2,parseInt(this.fontSize)/3, this.fontLetterSpacing);
			
		}
		if(this.fontStyleUnderline === true){
			this.underline(ctx , this.text , 0 , 0 , this.fontColor , this.fontSize , 'center');
		}
		
    }
  });