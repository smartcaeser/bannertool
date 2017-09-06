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
       }
    } else {
        disactiveEditor(); // function exist in tools-animation.js
    }
});
//banner.load(JSON.parse('{"bannerBackgroundColor":"#ff0000","bannerWidth":"400","bannerHeight":"400","bannerZoom":1,"originalBannerWidth":300,"originalBannerHeight":250,"layers":{"objects":[{"type":"sximage","originX":"left","originY":"top","left":-15.22,"top":54.21,"width":256,"height":256,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.7,"scaleY":0.7,"angle":334.16,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"transition":{"in":{"type":"none","easing":"easeOutExpo","cols":1,"rows":1,"duration":1,"delay":0},"out":{"type":"none","easing":"easeOutExpo","cols":1,"rows":1,"duration":1,"delay":0}},"transitionIn":{"type":"anim1","easing":"easeOutExpo","cols":"1","rows":"1","duration":"1","delay":"0"},"transitionOut":{},"runMode":false,"id":"img1501448836097","imageUrl":"http://data2.finalsite.com/cf67/mountstmarys/data/news/thumbs/1352.large.jpg","aspectRatio":false,"resizable":true,"layerType":"image","enabled":true,"sortOrder":0},{"type":"sxtext","originX":"left","originY":"top","left":79,"top":222,"width":169.7,"height":18,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"id":"txt1501457895457","transition":{"in":{"type":"none","easing":"Expo.easeOut","duration":0,"delay":0},"out":{"type":"none","easing":"Expo.easeOut","duration":0,"delay":0}},"transitionIn":{"type":"anim1","easing":"easeInExpo","duration":"1","delay":"0"},"transitionOut":{},"runMode":false,"ctx":{},"text":"Hello Mahmoud","fontFamily":"comic sans ms","fontSize":"18pt","fontColor":"#000000","fontStyleBold":false,"fontStyleItalic":false,"fontStyleUnderline":false,"aspectRatio":false,"resizable":true,"layerType":"image","enabled":true,"sortOrder":0}],"background":"#ff0000"}}'));
