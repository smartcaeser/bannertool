var SxImage = fabric.util.createClass(fabric.Object, fabric.Observable, {
    type: "sximage",
    id:'000',
    originX: 'center',
    originY: 'center',
    positions : [],
    previewMode : false,
    previewType : '',
    transition : {
      in : {
        type : 'none',
        easing : 'Expo.easeOut',
        cols : 1,
        rows : 1,
        duration : 0,
        delay : 0
      },
      out : {
        type : 'none',
        easing : 'Expo.easeOut',
        cols : 1,
        rows : 1,
        duration : 0,
        delay : 0
      }
    },
    tileWidth : 0,
    tileHeight : 0,
    totalTiles : 0,
    objectCaching: false,
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
        transition: this.get('transition')
      });
    },
    initialize: function(src, options) {
      this.callSuper('initialize', options);
      this.id = 'img' + (new Date()).getTime();
      this.setImage(src);
    },
    setImage : function(src){
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