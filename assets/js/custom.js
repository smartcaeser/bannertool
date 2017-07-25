fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.padding = 0;
fabric.Object.prototype.getZIndex = function() {
    return this.canvas.getObjects().indexOf(this);
};
var canvas = new fabric.Canvas("canvas") , $canvasElements = [];


	   
function addImage($url){
	banner.addImage({
		id : 'img' + (new Date()).getTime(),
		top: 0,
		left: 0,
		imageUrl : $url,
		resizable : true,
		aspectRatio : false,
		layerType : 'image',
		enabled : true,
		sortOrder : 0
	});
}
function addTransitionToImage($obj , $type , $opts){
	$obj.setTransition($type , $opts);
}
function addTransitionToText($obj , $type , $opts){
	$obj.setTransition($type , $opts);
}
function addText($txt){
	banner.addText({
		id : 'txt' + (new Date()).getTime(),
		top: 0,
		left: 0,
		text : $txt,
		fontFamily : font_family.value,
		fontSize : font_size.value,
		fontColor : font_color.value,
		resizable : true,
		aspectRatio : false,
		layerType : 'image',
		enabled : true,
		sortOrder : 0
	});
}

