var SxTextTransition = {};
SxTextTransition.anim1 = {
	"name" : "Animation 1",
	"in": {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.txtPositions.length ; i++){
          $this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 0 , scale : 0.2 , char : $this.txtPositions[i].char});
      }
	  var $duration = parseFloat($opts.duration)/$this.length * 1000;
      for(var j = 0 ; j < $this.length ; j++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.opacity,
					endValue: 1,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
					}
				});
				fabric.util.animate({
					startValue: $pos.scale,
					endValue: 1,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.scale = value;
						$this.fire('text:animated');
					}
				});
			} , ($i * ($duration - ($duration/2))) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate($this.positions[$this.i].x ,$this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.scale($this.positions[$this.i].scale , $this.positions[$this.i].scale);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
            
      }
    }
  },
  "out" : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
		  $this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 1 , scale : 1 , char : $this.txtPositions[i].char});
      }
	  
	  var $duration = parseFloat($opts.duration)/$this.length * 1000;
	  
      for(var j = 0 ; j < $this.length ; j++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.opacity,
					endValue: 0,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
					}
				});
				fabric.util.animate({
					startValue: $pos.scale,
					endValue: 0.2,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.scale = value;
						$this.fire('text:animated');
					}
				});
			} , $i * ($duration - ($duration/2))) ;
		})($this.positions[j],j);
		
        
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate($this.positions[$this.i].x ,$this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.scale($this.positions[$this.i].scale , $this.positions[$this.i].scale);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
            
      }
    }
  }
};


SxTextTransition.anim2 = {
	"name" : "Animation 2",
	"in": {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
		  $this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 0 , char : $this.txtPositions[i].char});
      }
	  
	  var $duration = parseFloat($opts.duration)/$this.length * 1000;
	  
      for(var j = 0 ; j < $this.length ; j++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.y + 20,
					endValue: $pos.y,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.y = value;
					}
				});
				fabric.util.animate({
					startValue: 0,
					endValue: 1,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					}
				});
			} , ($i * ($duration - ($duration/2))) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y);
            $this.ctx.restore();
            
      }
    }
  },
  "out" : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
		  $this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 1, char : $this.txtPositions[i].char});
      }
	  
	  var $duration = parseFloat($opts.duration)/$this.length * 1000;
	  
	  
      for(var j = 0 ; j < $this.length ; j++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.y,
					endValue: $pos.y - 20,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.y = value;
					}
				});
				fabric.util.animate({
					startValue: 1,
					endValue: 0,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					}
				});
			} , $i * ($duration - ($duration/2))) ;
		})($this.positions[j],j);
		
        
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y);
            $this.ctx.restore();
            
      }
    }
  }
};

SxTextTransition.anim3 = {
	"name" : "Animation 3",
	"in": {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
		  $this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 0 , rotation : -90 , char : $this.txtPositions[i].char});
      }
	  
	  var $duration = parseFloat($opts.duration)/$this.length * 1000;
	  
      for(var j = 0 ; j < $this.length ; j++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.x - 100,
					endValue: $pos.x,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.x = value;
					}
				});
				fabric.util.animate({
					startValue: -90,
					endValue: 0,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.rotation = value;
					}
				});
				fabric.util.animate({
					startValue: 0,
					endValue: 1,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					}
				});
			} , ($i * ($duration - ($duration/2))) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate($this.positions[$this.i].x ,$this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.rotate($this.positions[$this.i].rotation * Math.PI/180);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
            
      }
    }
  },
  "out" : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
		  $this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 1 , rotation : 0 , char : $this.txtPositions[i].char});
      }
	  
	  var $duration = parseFloat($opts.duration)/$this.length * 1000;
	  
	  
      for(var j = 0 ; j < $this.length ; j++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.x,
					endValue: $pos.x - 100,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.x = value;
					}
				});
				fabric.util.animate({
					startValue: 0,
					endValue: -90,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.rotation = value;
					}
				});
				fabric.util.animate({
					startValue: 1,
					endValue: 0,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					}
				});
			} , $i * ($duration - ($duration/2))) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate($this.positions[$this.i].x ,$this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.rotate($this.positions[$this.i].rotation * Math.PI/180);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
      }
    }
  }
};

SxTextTransition.anim4 = {
	"name" : "Animation 4",
	"in": {
    init : function($this , $opts){
      var $w = 0 , $char = '' , $lw = 0;
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
		  $this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , width : $lw , opacity : 0 , rotation : -90 , char : $this.txtPositions[i].char});
          $lw = $this.ctx.measureText($this.txtPositions[i].char).width;
          $w += $lw;
      }
	  
	  var $duration = parseFloat($opts.duration)/$this.length * 1000;
	  
      for(var j = 0 ; j < $this.length ; j++){
	  (function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: -180,
					endValue: 0,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.rotation = value;
					}
				});
				fabric.util.animate({
					startValue: 0,
					endValue: 1,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					}
				});
			} , ($i * ($duration - ($duration/2))) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[j],j);
		
        
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate($this.positions[$this.i].x + ($this.positions[$this.i].width / 2) ,$this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.rotate($this.positions[$this.i].rotation * Math.PI/180);
            $this.ctx.fillText($this.positions[$this.i].char, -($this.positions[$this.i].width / 2) , 0);
            $this.ctx.restore();
      }
    }
  },
  "out" : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
		  $this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 0 , rotation : 0 , char : $this.txtPositions[i].char});
      }
	  
	  var $duration = parseFloat($opts.duration)/$this.length * 1000;
	  
	  
      for(var j = 0 ; j < $this.length ; j++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: 0,
					endValue: -90,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.rotation = value;
					}
				});
				fabric.util.animate({
					startValue: 1,
					endValue: 0,
					duration: $duration + ($duration/2),
					easing : fabric.util.ease[$opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					}
				});
			} , $i * ($duration - ($duration/2))) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate($this.positions[$this.i].x ,$this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.rotate($this.positions[$this.i].rotation * Math.PI/180);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
      }
    }
  }
};