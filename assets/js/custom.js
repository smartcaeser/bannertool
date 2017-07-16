fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 5;
var canvas = new fabric.Canvas('canvas') , $canvasElements = [];


function changeBgColor($color){
  canvas.setBackgroundColor($color);
  canvas.renderAll();
}
function changeBgDimension($width , $height){
  canvas.setDimensions({width:$width,height:$height});
  canvas.renderAll();
}
function addImage($url){
  var $image = new SxImage($url, {
    top: 100,
    left: 100,
    scaleX: 0.9,
    scaleY: 0.9
  });
  $image.on('image:loaded', canvas.renderAll.bind(canvas));
  canvas.add($image);
  $canvasElements[$image.id] = $image;
  canvas.renderAll();
}
function addTransitionToImage($obj , $type , $opts){
	$obj.setTransition($type , $opts);
}
function addTransitionToText($obj , $type , $opts){
	$obj.setTransition($type , $opts);
}
function addText($txt){
  var $text = new SxText({
    top: 100,
    left: 100,
    text : $txt,
    fontFamily : font_family.value,
    fontSize : font_size.value,
    fontColor : font_color.value
  });
	$text.on('text:animated', canvas.renderAll.bind(canvas));
  canvas.add($text);
  $canvasElements[$text.id] = $text;
  canvas.renderAll();
}
function deleteObject($id){
  canvas.remove($canvasElements[$id]);
  delete $canvasElements[$id]
}
function deleteObjects(){
	var activeObject = canvas.getActiveObject(),
    activeGroup = canvas.getActiveGroup();
    if (activeObject) {
        if (confirm('Are you sure?')) {
            delete $canvasElements[activeObject.id]
            canvas.remove(activeObject);
        }
    }
    else if (activeGroup) {
        if (confirm('Are you sure?')) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
              delete $canvasElements[object.id]
              canvas.remove(object);
            });
        }
    }
}