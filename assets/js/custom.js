fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 5;
fabric.Object.prototype.getZIndex = function() {
    return this.canvas.getObjects().indexOf(this);
};

fabric.Canvas.prototype.addToPosition = function(object,position) {
    this.add(object);
    while(object.getZIndex() > position) {
        this.sendBackwards(object);
    }
};
var canvas = new fabric.Canvas("canvas") , $canvasElements = [];


function addImage($url){
  banner.addImage({
	id : 'img' + (new Date()).getTime(),
    top: 0,
    left: 0,
    scaleX: 0.99,
    scaleY: 0.99,
	imageUrl : $url,
	resizable : true,
	aspectRatio : false,
	layerType : 'image',
	enabled : true
  });
  
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
	$text.on("text:animated", canvas.renderAll.bind(canvas));
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