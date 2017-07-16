var SxText = fabric.util.createClass(fabric.Object, fabric.Observable, {
    type: "sxtext",
    id:'000',
    originX: 'center',
    originY: 'center',
    text:'',
    fontFamily : '',
    fontSize : '',
    fontColor : '',
    previewMode : false,
    previewType : '',
    positions : [],
    transition : {
      in : {
        type : 'none',
        easing : 'Expo.easeOut',
        duration : 0,
        delay : 0
      },
      out : {
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
        transition: this.get('transition'),
        text: this.get('text'),
        fontFamily : this.get('fontFamily'),
        fontSize : this.get('fontSize'),
        fontColor : this.get('fontColor')
      });
    },
    initialize: function(options) {
      this.callSuper('initialize', options);
      this.id = 'txt' + (new Date()).getTime();
      this.ctx = canvas.getContext();
      this.setText(options);
      
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
    preview : function($type){
      this.previewMode = true;
      this.previewType = $type;
      if(SxTextTransition[this.transition[$type].type]){
        SxTextTransition[this.transition[$type].type][$type].init(this , this.transition[$type]);
      }
    },
    _render: function(ctx) {
      ctx.font = this.fontSize + ' ' + this.fontFamily;
      ctx.fillStyle = this.fontColor;
      if(this.previewMode){
        if(SxTextTransition[this.transition[this.previewType].type]){
          SxTextTransition[this.transition[this.previewType].type][this.previewType].render(this);
        } else {
           ctx.fillText(this.text, -this.width / 2,parseInt(this.fontSize)/3);
        }
        
      } else {
        ctx.fillText(this.text, -this.width / 2,parseInt(this.fontSize)/3);
      }
      
    }
  });