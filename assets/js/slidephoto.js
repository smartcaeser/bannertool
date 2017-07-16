var SlidePhoto = fabric.util.createClass(fabric.Object, fabric.Observable, {
    type: "slidePhoto",
    id:'000',
    H_PADDING: 20,
    V_PADDING: 50,
    originX: 'center',
    originY: 'center',
    speed:1,
    positions : [],
    cols : 1,
    rows : 1,
    tileWidth : 0,
    tileHeight : 0,
    totalTiles : 0,
    objectCaching: false,
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
        speed: this.get('speed'),
        positions: this.get('positions'),
      });
    },
    initialize: function(src, options) {
      this.callSuper('initialize', options);
      this.id = 'img' + (new Date()).getTime();
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
    setstyle : function($cols , $rows , $speed){
      this.speed = $speed;
      this.cols = $cols;
      this.rows = $rows;
    },
    preview : function(){
      this.tileWidth = Math.ceil(this.width / this.cols);
      this.tileHeight = Math.ceil(this.height / this.rows);
      this.positions = [];
      for(var y = 0 ; y < this.rows ; y++){
        for(var x = 0 ; x < this.cols ; x++){
          this.positions.push({x: -(this.width / 2) + (x * this.tileWidth) , y: -(this.height / 2) + (y * this.tileHeight) , width : 0 });
        }
      }
      this.totalTiles = this.positions.length;
      
      var $this = this;
      for(var i = 0 ; i < this.totalTiles ; i++){
        TweenMax.to(this.positions[i] , this.speed , {width : this.tileWidth ,delay : i * (this.speed/this.totalTiles) , onUpdate : (function(){
           this.fire('image:loaded');
        }).bind(this)});
      }
    },
    _render: function(ctx) {
      this.ctx = ctx;
      if (this.loaded) {
        if(this.totalTiles && this.totalTiles > 0){
          ctx.beginPath();
          for(this.i = 0 ; this.i < this.totalTiles ; this.i++){
            ctx.rect(this.positions[this.i].x , this.positions[this.i].y , this.positions[this.i].width , this.tileHeight);
          }
          ctx.closePath();
          ctx.clip();
        }
       
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
      }
    }
  });