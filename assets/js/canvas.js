function Canvas($id){
  this.canvas = document.getElementById($id);
  this.ctx = this.canvas.getContext('2d');
  this.objects = [];
  this.i = 0;
}
Canvas.prototype.add = function($object){
  this.objects.push($object);
};
Canvas.prototype.render = function(){
  this.ctx.clearRect(0,0,500,500);
  for(this.i = 0 ; this.i < this.objects.length ; this.i++){
    this.objects[this.i].render();
  }
};