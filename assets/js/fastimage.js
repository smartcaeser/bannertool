function FastImage($canvas,$url){
  var $this = this;
  this.canvas = $canvas;
  this.context = $canvas.ctx;
  this.props = {x : 0 , y : 0 , opacity : 0 , radius : 40 , stroke : 4 , color : '#ff0000' , delay : 0};
  this.image = new Image();
  this.loaded = false;
  this.tiles = 3;
  this.positions = [];
  this.tileWidth = 0;
  this.tileHeight = 0;
  this.i = 0;
  this.image.onload = function(){
    $this.tileWidth = Math.floor(this.width / $this.tiles);
    $this.tileHeight = Math.floor(this.height / $this.tiles);
    for(var y = 0 ; y < $this.tiles ; y++){
      for(var x = 0 ; x < $this.tiles ; x++){
        $this.positions.push({x: x * $this.tileWidth , y: y * $this.tileHeight , opacity : 0 , scale : 0.2});
      }
    }
    $this.totalTiles = $this.positions.length;
    $this.loaded = true;
    $this.animate();
  };
  this.image.src = $url;
}
FastImage.prototype.animate = function(){
  for(var i = 0 ; i < this.totalTiles ; i++){
    TweenMax.to(this.positions[i] , 1.5 , {opacity : 1 , scale : 1 ,delay : i * 0.1});
  }
};
FastImage.prototype.render = function(){
  this.context.save();
  if(this.loaded){
    this.context.translate(200, 100);
    for(this.i = 0 ; this.i < this.totalTiles ; this.i++){
       this.context.save();
      this.context.globalAlpha = this.positions[this.i].opacity;
      this.context.scale(this.positions[this.i].scale , this.positions[this.i].scale);
      this.context.drawImage(this.image , this.positions[this.i].x , this.positions[this.i].y , this.tileWidth , this.tileHeight ,  this.positions[this.i].x - (this.tileWidth/2) , this.positions[this.i].y - (this.tileHeight/2) , this.tileWidth , this.tileHeight);
      //this.context.drawImage(this.image , this.positions[this.i].x , this.positions[this.i].y , this.tileWidth , this.tileHeight ,  this.positions[this.i].x , this.positions[this.i].y , this.tileWidth , this.tileHeight);
      this.context.restore();
    }
  }
  this.context.restore();
};