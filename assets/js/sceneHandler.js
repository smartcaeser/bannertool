var scene_name = document.querySelector("input[name=\"scene_name\"]"),
    scene_duration = document.querySelector("input[name=\"scene_duration\"]"),
	scene_sort_order = document.querySelector("input[name=\"scene_sort_order\"]"),
    scenes_list = document.getElementById("scenes_list"),
    img_scene = document.getElementById("img_scene"),
    txt_scene = document.getElementById("txt_scene"),
    vid_scene = document.getElementById("vid_scene"),
    scene_btn = document.getElementById("scene_btn"),
    active_scene_btn = document.getElementById("active_scene_btn");

scene_btn.addEventListener('click',function(){
	if(scene_name.value !== '' && scene_duration.value !== ''){
		var $id = 'scene' + (new Date()).getTime();
		banner.addScene({
			id : $id,
			name : scene_name.value,
			duration : scene_duration.value,
			sortOrder : scene_sort_order.value
		});
		var option = document.createElement("option");
		option.text = scene_name.value;
		option.value = $id;
		scenes_list.add(option);
		option = document.createElement("option");
		option.text = scene_name.value;
		option.value = $id;
		img_scene.add(option);
		option = document.createElement("option");
		option.text = scene_name.value;
		option.value = $id;
		txt_scene.add(option);
		option = document.createElement("option");
		option.text = scene_name.value;
		option.value = $id;
		vid_scene.add(option);

	}
});
active_scene_btn.addEventListener('click',function(){
	if(scenes_list.options.length >  0){
		banner.activeScene(scenes_list.options[scenes_list.selectedIndex].value);
	}
});