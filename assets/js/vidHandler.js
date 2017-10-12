var video_url = document.querySelector("input[name=\"video_url\"]"),
    add_video_btn = document.getElementById("add_video_btn");

add_video_btn.addEventListener('click',function(){
	if(video_url.value !== ''){
		banner.addVideo({
			id : 'vid' + (new Date()).getTime(),
			top: 0,
			left: 0,
			videoUrl : video_url.value,
			resizable : true,
			aspectRatio : false,
			layerType : 'video',
			enabled : true,
			sortOrder : 0
		});
	}
});


//Video Transitions Editor
var $vid_preview_btn_in = document.getElementById('vid_preview_btn_in'),
	$vid_apply_btn_in = document.getElementById('vid_apply_btn_in'),
    $vid_anim_type_in = document.getElementById('vid-transition-type-in'),
    $vid_easing_in = document.getElementById('vid-easing-in'),
    $vid_easing_type_in = document.getElementById('vid-easing-type-in'),
    vid_cols_in = document.querySelector('input[name=\"vid_cols_in\"]'),
    vid_rows_in = document.querySelector('input[name=\"vid_rows_in\"]'),
    vid_duration_in = document.querySelector('input[name=\"vid_duration_in\"]'),
    vid_delay_in = document.querySelector('input[name=\"vid_delay_in\"]'),
    
    $vid_preview_btn_out = document.getElementById('vid_preview_btn_out'),
	$vid_apply_btn_out = document.getElementById('vid_apply_btn_out'),
    $vid_anim_type_out = document.getElementById('vid-transition-type-out'),
    $vid_easing_out = document.getElementById('vid-easing-out'),
    $vid_easing_type_out = document.getElementById('vid-easing-type-out'),
    vid_cols_out = document.querySelector('input[name=\"vid_cols_out\"]'),
    vid_rows_out = document.querySelector('input[name=\"vid_rows_out\"]'),
    vid_duration_out = document.querySelector('input[name=\"vid_duration_out\"]'),
    vid_delay_out = document.querySelector('input[name=\"vid_delay_out\"]');
	
	
$vid_preview_btn_in.addEventListener('click',function(){
	banner.previewTransitionToSelectedObject('in' , {
		type : $vid_anim_type_in.value,
		easing : $vid_easing_type_in.value + $vid_easing_in.value,
		cols : vid_cols_in.value,
		rows : vid_rows_in.value,
		duration : vid_duration_in.value,
		delay : vid_delay_in.value
    });
});

$vid_apply_btn_in.addEventListener('click',function(){
	banner.updateSelectedObject( 'transitionIn', {
		type : $vid_anim_type_in.value,
		easing : $vid_easing_type_in.value + $vid_easing_in.value,
		cols : vid_cols_in.value,
		rows : vid_rows_in.value,
		duration : vid_duration_in.value,
		delay : vid_delay_in.value
    });
});


$vid_preview_btn_out.addEventListener('click',function(){
	banner.previewTransitionToSelectedObject('out' , {
		type : $vid_anim_type_out.value,
		easing : $vid_easing_type_out.value + $vid_easing_out.value,
		cols : vid_cols_out.value,
		rows : vid_rows_out.value,
		duration : vid_duration_out.value,
		delay : vid_delay_out.value
    });
});

$vid_apply_btn_out.addEventListener('click',function(){
	banner.updateSelectedObject( 'transitionOut', {
		type : $vid_anim_type_out.value,
		easing : $vid_easing_type_out.value + $vid_easing_out.value,
		cols : vid_cols_out.value,
		rows : vid_rows_out.value,
		duration : vid_duration_out.value,
		delay : vid_delay_out.value
    });
});