var $img_select = document.getElementById('sximage').getElementsByTagName('select')[0],
    $txt_select = document.getElementById('sxtext').getElementsByTagName('select')[0],
	$vid_select = document.getElementById('sxvideo').getElementsByTagName('select')[0];

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
function handleVideoEditor($obj){
  handleEditorVisible('sxvideo');
}
function handleEditorVisible($id){
  var $trans_divs = document.querySelectorAll('.trans-container') , $targetDiv = document.getElementById($id);
  for(var d = 0 ; d < $trans_divs.length ; d++){
	  $trans_divs[d].className = 'trans-container';
  }
  $targetDiv.className += ' active';
}
function disactiveEditor(){
  var $trans_divs = document.querySelectorAll('.trans-container');
  for(var d = 0 ; d < $trans_divs.length ; d++){
	$trans_divs[d].className = 'trans-container';
  }
}





