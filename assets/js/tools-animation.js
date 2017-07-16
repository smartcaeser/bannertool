var $img_select = document.getElementById('sximage').getElementsByTagName('select')[0],
    $txt_select = document.getElementById('sxtext').getElementsByTagName('select')[0];
    $img_select.addEventListener('change' , function(){
      //console.log(this.value);
    });
    $txt_select.addEventListener('change' , function(){
      //console.log(this.value);
    });

function handleImageEditor($obj){
  handleEditorVisible('sximage');
}
function handleTextEditor($obj){
  handleEditorVisible('sxtext');
}
function handleEditorVisible($id){
  var $trans_divs = document.querySelectorAll('.trans-container') , $targetDiv = document.getElementById($id);
  $trans_divs.forEach(function(e,i){
    e.className = 'trans-container';
    
  });
  $targetDiv.className += ' active';
}
function disactiveEditor(){
  var $trans_divs = document.querySelectorAll('.trans-container');
  $trans_divs.forEach(function(e,i){
    e.className = 'trans-container';
    
  });
}


//Image Transitions Editor
var $img_preview_btn_in = document.getElementById('img_preview_btn_in'),
    $img_anim_type_in = document.getElementById('img-transition-type-in'),
    $img_easing_in = document.getElementById('img-easing-in'),
    $img_easing_type_in = document.getElementById('img-easing-type-in'),
    img_cols_in = document.querySelector('input[name=\"img_cols_in\"]'),
    img_rows_in = document.querySelector('input[name=\"img_rows_in\"]'),
    img_duration_in = document.querySelector('input[name=\"img_duration_in\"]'),
    img_delay_in = document.querySelector('input[name=\"img_delay_in\"]'),
    
    $img_preview_btn_out = document.getElementById('img_preview_btn_out'),
    $img_anim_type_out = document.getElementById('img-transition-type-out'),
    $img_easing_out = document.getElementById('img-easing-out'),
    $img_easing_type_out = document.getElementById('img-easing-type-out'),
    img_cols_out = document.querySelector('input[name=\"img_cols_out\"]'),
    img_rows_out = document.querySelector('input[name=\"img_rows_out\"]'),
    img_duration_out = document.querySelector('input[name=\"img_duration_out\"]'),
    img_delay_out = document.querySelector('input[name=\"img_delay_out\"]');
$img_preview_btn_in.addEventListener('click',function(){
  var $object = canvas.getActiveObject();
  if($object.get('type') == 'sximage'){
    addTransitionToImage($object , 'in' , {
      type : $img_anim_type_in.value,
      easing : $img_easing_in.value + '.' + $img_easing_type_in.value,
      cols : img_cols_in.value,
      rows : img_rows_in.value,
      duration : img_duration_in.value,
      delay : img_delay_in.value
    });
  }
});


$img_preview_btn_out.addEventListener('click',function(){
  var $object = canvas.getActiveObject();
  if($object.get('type') == 'sximage'){
    addTransitionToImage($object , 'out' , {
      type : $img_anim_type_out.value,
      easing : $img_easing_out.value + '.' + $img_easing_type_out.value,
      cols : img_cols_out.value,
      rows : img_rows_out.value,
      duration : img_duration_out.value,
      delay : img_delay_out.value
    });
  }
});


//Text Transitions Editor
var $txt_preview_btn_in = document.getElementById('txt_preview_btn_in'),
    $txt_anim_type_in = document.getElementById('txt-transition-type-in'),
    $txt_easing_in = document.getElementById('txt-easing-in'),
    $txt_easing_type_in = document.getElementById('txt-easing-type-in'),
    txt_duration_in = document.querySelector('input[name=\"txt_duration_in\"]'),
    txt_delay_in = document.querySelector('input[name=\"txt_delay_in\"]'),
    
    $txt_preview_btn_out = document.getElementById('txt_preview_btn_out'),
    $txt_anim_type_out = document.getElementById('txt-transition-type-out'),
    $txt_easing_out = document.getElementById('txt-easing-out'),
    $txt_easing_type_out = document.getElementById('txt-easing-type-out'),
    txt_duration_out = document.querySelector('input[name=\"txt_duration_out\"]'),
    txt_delay_out = document.querySelector('input[name=\"txt_delay_out\"]');


$txt_preview_btn_in.addEventListener('click',function(){
  var $object = canvas.getActiveObject();
  if($object.get('type') == 'sxtext'){
    addTransitionToText($object , 'in' , {
      type : $txt_anim_type_in.value,
      easing : $txt_easing_in.value + '.' + $txt_easing_type_in.value,
      duration : txt_duration_in.value,
      delay : txt_delay_in.value
    });
  }
});


$txt_preview_btn_out.addEventListener('click',function(){
  var $object = canvas.getActiveObject();
  if($object.get('type') == 'sxtext'){
    addTransitionToText($object , 'out' , {
      type : $txt_anim_type_out.value,
      easing : $txt_easing_out.value + '.' + $txt_easing_type_out.value,
      duration : txt_duration_out.value,
      delay : txt_delay_out.value
    });
  }
});



