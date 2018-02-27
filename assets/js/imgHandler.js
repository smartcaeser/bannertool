var image_url = document.querySelector("input[name=\"image_url\"]"),
    add_image_btn = document.getElementById("add_image_btn");

add_image_btn.addEventListener('click',function(){
	if(image_url.value !== ''){
		banner.addImage({
			id : 'img' + (new Date()).getTime(),
			top: 0,
			left: 0,
			scene:img_scene.value,
			imageUrl : image_url.value,
			resizable : true,
			aspectRatio : false,
			layerType : 'image',
			enabled : true,
			sortOrder : 0
		});
	}
});


//Image Transitions Editor
var $img_preview_btn_in = document.getElementById('img_preview_btn_in'),
	$img_apply_btn_in = document.getElementById('img_apply_btn_in'),
    $img_anim_type_in = document.getElementById('img-transition-type-in'),
    $img_easing_in = document.getElementById('img-easing-in'),
    $img_easing_type_in = document.getElementById('img-easing-type-in'),
    img_cols_in = document.querySelector('input[name=\"img_cols_in\"]'),
    img_rows_in = document.querySelector('input[name=\"img_rows_in\"]'),
    img_duration_in = document.querySelector('input[name=\"img_duration_in\"]'),
    img_delay_in = document.querySelector('input[name=\"img_delay_in\"]'),
    
    $img_preview_btn_out = document.getElementById('img_preview_btn_out'),
	$img_apply_btn_out = document.getElementById('img_apply_btn_out'),
    $img_anim_type_out = document.getElementById('img-transition-type-out'),
    $img_easing_out = document.getElementById('img-easing-out'),
    $img_easing_type_out = document.getElementById('img-easing-type-out'),
    img_cols_out = document.querySelector('input[name=\"img_cols_out\"]'),
    img_rows_out = document.querySelector('input[name=\"img_rows_out\"]'),
    img_duration_out = document.querySelector('input[name=\"img_duration_out\"]'),
    img_delay_out = document.querySelector('input[name=\"img_delay_out\"]');
	
	
$img_preview_btn_in.addEventListener('click',function(){
	banner.previewTransitionToSelectedObject('in' , {
		type : $img_anim_type_in.value,
		easingType : $img_easing_type_in.value,
		easing : $img_easing_in.value,
		cols : img_cols_in.value,
		rows : img_rows_in.value,
		duration : img_duration_in.value,
		delay : img_delay_in.value
    });
});

$img_apply_btn_in.addEventListener('click',function(){
	banner.updateSelectedObject( 'transitionIn', {
		type : $img_anim_type_in.value,
		easingType : $img_easing_type_in.value,
		easing : $img_easing_in.value,
		cols : img_cols_in.value,
		rows : img_rows_in.value,
		duration : img_duration_in.value,
		delay : img_delay_in.value
    });
});


$img_preview_btn_out.addEventListener('click',function(){
	banner.previewTransitionToSelectedObject('out' , {
		type : $img_anim_type_out.value,
		easingType : $img_easing_type_out.value,
		easing : $img_easing_out.value,
		cols : img_cols_out.value,
		rows : img_rows_out.value,
		duration : img_duration_out.value,
		delay : img_delay_out.value
    });
});

$img_apply_btn_out.addEventListener('click',function(){
	banner.updateSelectedObject( 'transitionOut', {
		type : $img_anim_type_out.value,
		easingType : $img_easing_type_out.value,
		easing : $img_easing_out.value,
		cols : img_cols_out.value,
		rows : img_rows_out.value,
		duration : img_duration_out.value,
		delay : img_delay_out.value
    });
});