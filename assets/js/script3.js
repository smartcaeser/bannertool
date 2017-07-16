TweenLite.ticker.fps(60);
var $canvas = new Canvas('canvas');


var $cimage = new ClipImage($canvas,'https://s-media-cache-ak0.pinimg.com/236x/1b/f6/da/1bf6dae361369fb1edf1b4dbcb27d082.jpg');
$canvas.add($cimage);

TweenLite.ticker.addEventListener("tick", render);


function render(){
  $canvas.render();
}
