function Circle($canvas){
  this.canvas = $canvas;
  this.context = $canvas.ctx;
  this.props = {x : 0 , y : 0 , opacity : 0 , radius : 40 , stroke : 4 , color : '#ff0000' , delay : 0};
}
Circle.prototype.animate = function($target){
  //$target.onUpdate = render;
  TweenMax.to(this.props , 1 , $target);
}
Circle.prototype.render = function(){
  this.context.save();
  this.context.globalAlpha = this.props.opacity;
  this.context.lineWidth = this.props.stroke;
  this.context.beginPath();
  this.context.strokeStyle = this.props.color;
  this.context.arc(this.props.x,this.props.y,this.props.radius,0,Math.PI*2,true);
  this.context.stroke();
  this.context.closePath();
  this.context.restore();
};