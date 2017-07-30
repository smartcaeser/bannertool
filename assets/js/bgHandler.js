var bg_btn = document.getElementById("bg_btn") , 
    bg_color = document.getElementById("bg_color"),
	bg_width = document.querySelector("input[name=\"bg_width\"]"),
	bg_height = document.querySelector("input[name=\"bg_height\"]");
	
bg_btn.addEventListener('click',function(){
	
  if(bg_color.value !== ''){
    banner.updateProp('bannerBackgroundColor' , bg_color.value);
  }
  if(bg_width.value !== '' && bg_height !== ''){
	banner.updateProp('bannerWidth' , bg_width.value);
	banner.updateProp('bannerHeight' , bg_height.value);
  }
});
