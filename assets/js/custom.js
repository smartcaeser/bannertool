var banner = new Banner("canvas"); // id of canvas
	   
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
function addText($model){
	banner.addText($model);
}

