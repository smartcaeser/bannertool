document.addEventListener('keydown',function(e){
  if(e.keyCode == 46){
    deleteObjects();
    disactiveEditor();
  }
});
canvas.on({
  'mouse:down': selectObject()
});
function selectObject() {
    return function(e) {
      if (e.target && e.target.id) {
       switch(e.target.get('type')){
         case 'sximage':
           handleImageEditor(e.target);
           break;
         case 'sxtext':
           handleTextEditor(e.target);
           break;
       }
      } else {
        disactiveEditor();
      }
    };
}

var bg_btn = document.getElementById('bg_btn') , 
    bg_color = document.getElementById('bg_color'),
    bg_width = document.querySelector('input[name=\"bg_width\"]'),
    bg_height = document.querySelector('input[name=\"bg_height\"]'),
    image_url = document.querySelector('input[name=\"image_url\"'),
    add_image_btn = document.getElementById('add_image_btn'),
    add_txt = document.querySelector('input[name=\"add_txt\"'),
    font_family = document.getElementById('font-family'),
    font_size = document.getElementById('font-size'),
    font_color = document.getElementById('font-color'),
    add_txt_btn = document.getElementById('add_txt_btn');
bg_btn.addEventListener('click',function(){
  if(bg_color.value !== ''){
    console.log(bg_color.value);
    changeBgColor(bg_color.value);
  }
  if(bg_width.value !== '' && bg_height !== ''){
    changeBgDimension(bg_width.value , bg_height.value);
  }
});
add_image_btn.addEventListener('click',function(){
  if(image_url.value !== ''){
    addImage(image_url.value);
  }
});
add_txt_btn.addEventListener('click',function(){
  if(add_txt.value !== ''){
    addText(add_txt.value);
  }
});

