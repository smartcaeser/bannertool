var add_txt = document.querySelector("input[name=\"add_txt\"]"),
    font_family = document.getElementById("font-family"),
    font_size = document.getElementById("font-size"),
    font_color = document.getElementById("font-color"),
    font_bold = document.getElementById("font-bold"),
    font_italic = document.getElementById("font-italic"),
    font_underline = document.getElementById("font-underline"),
    font_letter_spacing = document.getElementById("font-letter-spacing"),
    add_txt_btn = document.getElementById("add_txt_btn");

add_txt_btn.addEventListener('click',function(){
	if(add_txt.value !== ''){
		banner.addText({
			id : 'txt' + (new Date()).getTime(),
			top: 0,
			left: 0,
			text : add_txt.value,
			fontFamily : font_family.value,
			fontSize : font_size.value,
			fontColor : font_color.value,
			fontStyleBold : font_bold.checked,
			fontStyleItalic : font_italic.checked,
			fontStyleUnderline : font_underline.checked,
			fontLetterSpacing : font_letter_spacing.value,
			resizable : false,
			aspectRatio : false,
			layerType : 'text',
			enabled : true,
			sortOrder : 0
		});
	}
});



var $txt_preview_btn_in = document.getElementById('txt_preview_btn_in'),
	$txt_apply_btn_in = document.getElementById('txt_apply_btn_in'),
    $txt_anim_type_in = document.getElementById('txt-transition-type-in'),
    $txt_easing_in = document.getElementById('txt-easing-in'),
    $txt_easing_type_in = document.getElementById('txt-easing-type-in'),
    txt_duration_in = document.querySelector('input[name=\"txt_duration_in\"]'),
    txt_delay_in = document.querySelector('input[name=\"txt_delay_in\"]'),
    
    $txt_preview_btn_out = document.getElementById('txt_preview_btn_out'),
	$txt_apply_btn_out = document.getElementById('txt_apply_btn_out'),
    $txt_anim_type_out = document.getElementById('txt-transition-type-out'),
    $txt_easing_out = document.getElementById('txt-easing-out'),
    $txt_easing_type_out = document.getElementById('txt-easing-type-out'),
    txt_duration_out = document.querySelector('input[name=\"txt_duration_out\"]'),
    txt_delay_out = document.querySelector('input[name=\"txt_delay_out\"]');


$txt_preview_btn_in.addEventListener('click',function(){
	banner.previewTransitionToSelectedObject('in' , {
		type : $txt_anim_type_in.value,
		easingType : $txt_easing_type_in.value,
		easing : $txt_easing_in.value,
		duration : txt_duration_in.value,
		delay : txt_delay_in.value
    });
});

$txt_apply_btn_in.addEventListener('click',function(){
	banner.updateSelectedObject( 'transitionIn', {
		type : $txt_anim_type_in.value,
		easingType : $txt_easing_type_in.value,
		easing : $txt_easing_in.value,
		duration : txt_duration_in.value,
		delay : txt_delay_in.value
    });
});


$txt_preview_btn_out.addEventListener('click',function(){
	banner.previewTransitionToSelectedObject('out' , {
		type : $txt_anim_type_out.value,
		easingType : $txt_easing_type_out.value,
		easing : $txt_easing_out.value,
		duration : txt_duration_out.value,
		delay : txt_delay_out.value
    });
});

$txt_apply_btn_out.addEventListener('click',function(){
	banner.updateSelectedObject( 'transitionOut', {
		type : $txt_anim_type_out.value,
		easingType : $txt_easing_type_out.value,
		easing : $txt_easing_out.value,
		duration : txt_duration_out.value,
		delay : txt_delay_out.value
    });
});

