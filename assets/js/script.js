//TweenLite.ticker.fps(60);
var $canvas = new Canvas('canvas');


for(var i = 0 ; i < 10 ; i++){
  var $circle = new Circle($canvas);
  $circle.props.x = Math.random() * 400;
  $circle.props.y = Math.random() * 400;
  $canvas.add($circle);
  $circle.animate({x : Math.random() * 400 , y : Math.random() * 400 , opacity : 1 , radius : Math.random() * 100 + 10 , stroke : Math.random() * 20 + 1 , delay : i * 0.3});
}


TweenLite.ticker.addEventListener("tick", render, this, false, 2);


function render(){
  $canvas.render();
}



