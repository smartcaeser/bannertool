# bannertool
## Usage
```html
<script src="assets/js/fabric.js"></script>
<script src="assets/js/eventdispatcher.js"></script>
<script src="assets/js/sximage.js"></script>
<script src="assets/js/sximagetransition.js"></script>
<script src="assets/js/sxtext.js"></script>
<script src="assets/js/sxtexttransition.js"></script>
<script src="assets/js/sxvideo.js"></script>
<script src="assets/js/sxvideotransition.js"></script>
<script src="assets/js/banner.js"></script>
<script>
	var banner = new Banner("canvas"); // id of canvas
</script>
```
## Main Methods
- `addScene($model)` Adding scene to hold layers (images,text,videos) and passing `id` , `name` , `duration:in seconds` , `sortOrder`
- `removeScene($scene_id)` remove specific scene on id.
- `activeScene($scene_id)` active specific scene and hide rest.
- `updateSceneProp($sceneId, $prop, $val)` Update Scene properties such as `name:string`  , `duration:int` , `sortOrder:int`.
- `addImage($model)` Adding Image layer as `Object` include `id` , `top:int` , `left:int` , `loop:true|false` , `imageUrl:string` , `resizable:true|false` , `aspectRatio:true|false` , `layerType:image|text` , `enabled:true|false` , `readonly:true|false` , `sortOrder:int`
- `addVideo($model)` Adding Video layer as `Object` include `id` , `top:int` , `left:int` , `loopVideo:true|false` , `loop:true|false` , `videoUrl:string` , `resizable:true|false` , `aspectRatio:true|false` , `layerType:image|text|video` , `enabled:true|false` , `readonly:true|false` , `sortOrder:int`
- `addText($model)` Adding text layer as `Object` include `id` , `top:int` , `left:int` , `loop:true|false` , `text:string` , `fontFamily:string` , `fontSize:int` , `fontColor:string` , `fontStyleBold:true|false` , `fontStyleItalic:true|false` , `fontStyleUnderline:true|false` , `resizable:true|false` , `aspectRatio:true|false` , `layerType:image|text` , `enabled:true|false` , `readonly:true|false` , `sortOrder:int`
- `updateProp($prop,$val)` Update Banner properties such as `bannerBackgroundColor:string`  , `bannerWidth:int` , `bannerHeight:int` , `bannerZoom:int` , `originalBannerWidth:int` , `originalBannerHeight`
- `updateLayerProp($layerId,$prop,$val)` Update layer properties according to layer type `image|text`
- `deleteObject($layerId)` Remove object out of banner stage by layer id
- `run()` Run banner animation
- `getBannerModel()` Return string for current banner properties and layers objects status
- `load($data)` Load saved data from DB in `JSON` format

## Useful Methods
- `selectLayer($layerId)` Select Object on banner stage by `layer id`
- `unSelectLayers()` unSelect all layers on stage
- `updateSelectedObject($prop,$val)` Update properties for selected object on banner stage
- `settings() Return object with all available setting like `banner.getSettings().animations.image|banner.getSettings().animations.text`
- `previewTransitionToSelectedObject($type,$val)` Make an animation preview for selected object on banner stage , `$type:string(in|out)` 
- `takeScreenShot` return base64 screenshot images.
## Events
- `addEventListener('select',function(e){ console.log(e.item);});` Event listener on select text or image on the stage return in function in `e.item`
```html
	// Please check Example assets/js/custom.js
	banner.addEventListener("select",function(e){
        if (e.item) {  
           switch(e.item.layerType){
             case 'image':
               handleImageEditor(e.item);
               break;
             case 'text':
               handleTextEditor(e.item);
               break;
			 case 'video':
               handleVideoEditor(e.item);
               break;
           }
        } else {
            disactiveEditor();
        }
    });
```

## Make Update On Banner 
please check example in `assets/js/bgHandler.js`

## Animation on Image Or Text
For Preview : image either text both have two properties for animation `in|out`
```html
	// Please check Example assets/js/imgHandler.js and  assets/js/txtHandler.js
	banner.previewTransitionToSelectedObject('in' , {
		type : $img_anim_type_in.value,
		easingType : $img_easing_type_in.value, 
		easing : $img_easing_in.value, 
		cols : img_cols_in.value,
		rows : img_rows_in.value,
		duration : img_duration_in.value,
		delay : img_delay_in.value
    });
```
For Apply Animation : both image and text have two properties for animation `transitionIn|transitionOut`
```html
	// Please check Example assets/js/imgHandler.js and  assets/js/txtHandler.js
	banner.updateSelectedObject( 'transitionIn', {
		type : $img_anim_type_in.value,
		easingType : $img_easing_type_in.value,
		easing : $img_easing_in.value,
		cols : img_cols_in.value,
		rows : img_rows_in.value,
		duration : img_duration_in.value,
		delay : img_delay_in.value
    });
```


