function ClipImage($canvas,$url){
  var $this = this;
  this.canvas = $canvas;
  this.context = $canvas.ctx;
  this.image = new Image();
  this.loaded = false;
  this.col_tiles = 5;
  this.row_tiles = 1;
  this.positions = [];
  this.tileWidth = 0;
  this.tileHeight = 0;
  this.imageWidth = 0;
  this.imageHeight = 0;
  this.speed = 0.5;
  this.i = 0;
  this.image.onload = function(){
    $this.imageWidth = this.width;
    $this.imageHeight = this.height;
    $this.tileWidth = Math.floor($this.imageWidth / $this.col_tiles);
    $this.tileHeight = Math.floor($this.imageHeight / $this.row_tiles);
    for(var y = 0 ; y < $this.row_tiles ; y++){
      for(var x = 0 ; x < $this.col_tiles ; x++){
        $this.positions.push({x: x * $this.tileWidth , y: y * $this.tileHeight , width : 0 });
      }
    }
    $this.totalTiles = $this.positions.length;
    $this.loaded = true;
    $this.animate();
  };
  this.image.src = $url;
}
ClipImage.prototype.animate = function(){
  for(var i = 0 ; i < this.totalTiles ; i++){
    TweenMax.to(this.positions[i] , this.speed , {width : this.tileWidth ,delay : i * (this.speed/this.totalTiles)});
  }
};
ClipImage.prototype.render = function(){
  
  if(this.loaded){
    this.context.save();
    this.context.translate(200, 100);
    this.context.beginPath();
    for(this.i = 0 ; this.i < this.totalTiles ; this.i++){
      this.context.rect(this.positions[this.i].x , this.positions[this.i].y , this.positions[this.i].width , this.tileHeight);
    }
    this.context.closePath();
    this.context.clip();
    this.context.drawImage(this.image , 0 ,0 , this.imageWidth , this.imageHeight);
  }
  this.context.restore();
};