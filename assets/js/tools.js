
var bg_btn = document.getElementById("bg_btn") , 
    bg_color = document.getElementById("bg_color"),
	bg_width = document.querySelector("input[name=\"bg_width\"]"),
	bg_height = document.querySelector("input[name=\"bg_height\"]"),
	image_url = document.querySelector("input[name=\"image_url\"]"),
    add_image_btn = document.getElementById("add_image_btn"),
	add_txt = document.querySelector("input[name=\"add_txt\"]"),
    font_family = document.getElementById("font-family"),
    font_size = document.getElementById("font-size"),
    font_color = document.getElementById("font-color"),
    add_txt_btn = document.getElementById("add_txt_btn");
	
bg_btn.addEventListener('click',function(){
	
  if(bg_color.value !== ''){
    banner.updateProp('bannerBackgroundColor' , bg_color.value);
  }
  if(bg_width.value !== '' && bg_height !== ''){
	banner.updateProp('bannerWidth' , bg_width.value);
	banner.updateProp('bannerHeight' , bg_height.value);
  }
});
add_image_btn.addEventListener('click',function(){
  if(image_url.value !== ''){
    addImage(image_url.value);
  }
});
add_txt_btn.addEventListener('click',function(){
  if(add_txt.value !== ''){
    addText({
		id : 'txt' + (new Date()).getTime(),
		top: 0,
		left: 0,
		text : add_txt.value,
		fontFamily : font_family.value,
		fontSize : font_size.value,
		fontColor : font_color.value,
		fontStyleBold : false,
		fontStyleItalic : false,
		fontStyleUnderline : false,
		resizable : true,
		aspectRatio : false,
		layerType : 'image',
		enabled : true,
		sortOrder : 0
	});
  }
});
