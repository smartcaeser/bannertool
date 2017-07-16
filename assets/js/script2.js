TweenLite.ticker.fps(60);
var $canvas = new Canvas('canvas');


var $fimage = new FastImage($canvas,'https://s-media-cache-ak0.pinimg.com/236x/1b/f6/da/1bf6dae361369fb1edf1b4dbcb27d082.jpg');
$canvas.add($fimage);

TweenLite.ticker.addEventListener("tick", render);


function render(){
  $canvas.render();
}
