
var $accordions = document.querySelectorAll('.accordion');
for(var aa = 0 ; aa < $accordions.length ; aa++){
	
	var e = $accordions[aa] , $handler = e.getElementsByTagName('h1')[0];
  $handler.addEventListener('click' , function(){
    var itemClass = this.parentNode.className;
    for (var i = 0; i < $accordions.length; i++) {
        $accordions[i].className = 'accordion';
    }
    if (itemClass == 'accordion') {
        this.parentNode.className = 'accordion active';
    }
  });
}


var $tabs = document.querySelectorAll('.tab_btn');
for(var bb = 0 ; bb < $tabs.length ; bb++){
	var e = $tabs[bb];
  e.addEventListener('click' , function(){
    var $parent = this.parentNode;
    disableTabs($parent);
    this.className = 'tab_btn active';
    var $tabcontent = document.getElementById(this.getAttribute('data-target'));
    $tabcontent.className = 'tab_content active';
  });
}

function disableTabs($dom){
  var $btns = $dom.querySelectorAll('.tab_btn') , $btns_content = $dom.querySelectorAll('.tab_content');
  [].forEach.call($btns, function(el) {
      el.className = 'tab_btn';
  });
  [].forEach.call($btns_content, function(el) {
      el.className = 'tab_content';
  });
}