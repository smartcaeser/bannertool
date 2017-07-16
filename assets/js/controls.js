
var $accordions = document.querySelectorAll('.accordion');
$accordions.forEach(function(e,i){
  var $handler = e.getElementsByTagName('h1')[0];
  $handler.addEventListener('click' , function(){
    var itemClass = this.parentNode.className;
    for (var i = 0; i < $accordions.length; i++) {
        $accordions[i].className = 'accordion';
    }
    if (itemClass == 'accordion') {
        this.parentNode.className = 'accordion active';
    }
  });
});

var $tabs = document.querySelectorAll('.tab_btn');
$tabs.forEach(function(e,i){
  e.addEventListener('click' , function(){
    var $parent = this.parentNode;
    disableTabs($parent);
    this.className = 'tab_btn active';
    var $tabcontent = document.getElementById(this.getAttribute('data-target'));
    $tabcontent.className = 'tab_content active';
  });
});
function disableTabs($dom){
  var $btns = $dom.querySelectorAll('.tab_btn') , $btns_content = $dom.querySelectorAll('.tab_content');
  [].forEach.call($btns, function(el) {
      el.className = 'tab_btn';
  });
  [].forEach.call($btns_content, function(el) {
      el.className = 'tab_content';
  });
}