var banner = new Banner("canvas"); // id of canvas
banner.addEventListener("select",function(e){
    if (e.item) {  
		switch(e.item.layerType){
			case 'image':
				handleImageEditor(e.item); // function exist in tools-animation.js
				break;
			case 'text':
				handleTextEditor(e.item); // function exist in tools-animation.js
				break;
			case 'video':
				handleVideoEditor(e.item); // function exist in tools-animation.js
				break;
       }
    } else {
        disactiveEditor(); // function exist in tools-animation.js
    }
});
