var SxTextTransition = {};
SxTextTransition.none = {
	"name" : "None",
	"in": {
    init : function($this , $opts){
		var $w = 0 , $char = '';
		$this.positions = [];
		for(var i = 0 ; i < $this.txtPositions.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		setTimeout(function(){
			$this.opacityVal = 1;
			$this.fire('text:animated');
		} , (parseFloat($opts.delay) * 1000)) ;
		
    },
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y);
		}
		$this.ctx.restore();
    }
  },
  "out" : {
    init : function($this , $opts){
		var $w = 0 , $char = '';
		$this.positions = [];
		for(var i = 0 ; i < $this.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 1, char : $this.txtPositions[i].char});
		}
	  
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		setTimeout(function(){
			$this.opacityVal = 0;
			$this.fire('text:animated');
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y);
		}
		$this.ctx.restore();
    }
  }
};
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
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
					}
				});
				fabric.util.animate({
					startValue: $pos.scale,
					endValue: 1,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.scale = value;
						$this.fire('text:animated');
					},
					onComplete : function(e){
						if($i == $this.length - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
		$this.ctx.globalAlpha = 1;
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
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
					}
				});
				fabric.util.animate({
					startValue: $pos.scale,
					endValue: 0.2,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.scale = value;
						$this.fire('text:animated');
					},
					onComplete : function(e){
						if($i == $this.length - 1){
							$this.animationComplete();
						}
					}
				});
			} ,  ($i * $duration)) ;
		})($this.positions[j],j);
		
        
      }
    },
    render : function($this){
		$this.ctx.globalAlpha = 1;
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
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.y = value;
					}
				});
				fabric.util.animate({
					startValue: 0,
					endValue: 1,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					},
					onComplete : function(e){
						if($i == $this.length - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
		$this.ctx.globalAlpha = 1;
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
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.y = value;
					}
				});
				fabric.util.animate({
					startValue: 1,
					endValue: 0,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					},
					onComplete : function(e){
						if($i == $this.length - 1){
							$this.animationComplete();
						}
					}
				});
			} ,  ($i * $duration)) ;
		})($this.positions[j],j);
		
        
      }
    },
    render : function($this){
		$this.ctx.globalAlpha = 1;
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
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.x = value;
					}
				});
				fabric.util.animate({
					startValue: -90,
					endValue: 0,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.rotation = value;
					}
				});
				fabric.util.animate({
					startValue: 0,
					endValue: 1,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					},
					onComplete : function(e){
						if($i == $this.length - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
		$this.ctx.globalAlpha = 1;
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
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.x = value;
					}
				});
				fabric.util.animate({
					startValue: 0,
					endValue: -90,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.rotation = value;
					}
				});
				fabric.util.animate({
					startValue: 1,
					endValue: 0,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					},
					onComplete : function(e){
						if($i == $this.length - 1){
							$this.animationComplete();
						}
					}
				});
			} ,  ($i * $duration)) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
		$this.ctx.globalAlpha = 1;
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
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.rotation = value;
					}
				});
				fabric.util.animate({
					startValue: 0,
					endValue: 1,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					},
					onComplete : function(e){
						if($i == $this.length - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[j],j);
		
        
      }
    },
    render : function($this){
		$this.ctx.globalAlpha = 1;
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
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.rotation = value;
					}
				});
				fabric.util.animate({
					startValue: 1,
					endValue: 0,
					duration: $duration ,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
						$this.fire('text:animated');
					},
					onComplete : function(e){
						if($i == $this.length - 1){
							$this.animationComplete();
						}
					}
				});
			} ,  ($i * $duration)) ;
		})($this.positions[j],j);
		
      }
    },
    render : function($this){
		$this.ctx.globalAlpha = 1;
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
SxTextTransition.fade = {
	"name" : "Fade",
	"in": {
    init : function($this , $opts){
		var $w = 0 , $char = '';
		$this.positions = [];
		$this.opacityVal = 0;
		for(var i = 0 ; i < $this.txtPositions.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
		var $duration = parseFloat($opts.duration) * 1000;
		setTimeout(function(){
			fabric.util.animate({
				startValue: 0,
				endValue: 1,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.opacityVal = value;
					$this.fire('text:animated');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
		
    },
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y);
		}
		$this.ctx.restore();
    }
  },
  "out" : {
    init : function($this , $opts){
		var $w = 0 , $char = '';
		$this.positions = [];
		for(var i = 0 ; i < $this.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 1, char : $this.txtPositions[i].char});
		}
	  
		var $duration = parseFloat($opts.duration) * 1000;
		fabric.util.animate({
			startValue: 0,
			endValue: 1,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.opacityVal = value;
				$this.fire('text:animated');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
    },
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y);
		}
		$this.ctx.restore();
    }
  }
};

SxTextTransition.fadeDown = {
	"name" : "FadeDown",
	"in": {
    init : function($this , $opts){
		var $w = 0 , $char = '' ,$duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		$this.yStart = 0;
		$this.positions = [];
		for(var i = 0 ; i < $this.txtPositions.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
		setTimeout(function(){
			fabric.util.animate({
				startValue: 0,
				endValue: 1,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.opacityVal = value;
				}
			});
			fabric.util.animate({
				startValue: 200,
				endValue: 0,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.yStart = value;
					$this.fire('text:animated');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y - $this.yStart);
		}
		$this.ctx.restore();
		
    }
  },
  "out" : {
    init : function($this , $opts){
		var $w = 0 , $char = '' , $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		$this.yStart = 0;

		$this.positions = [];
		for(var i = 0 ; i < $this.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , opacity : 1, char : $this.txtPositions[i].char});
		}
	  
		fabric.util.animate({
			startValue: 1,
			endValue: 0,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.opacityVal = value;
			}
		});
		fabric.util.animate({
			startValue: 0,
			endValue: 200,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.yStart = value;
				$this.fire('text:animated');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
	},
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y + $this.yStart);
		}
		$this.ctx.restore();
    }
  }
};


SxTextTransition.fadeUp = {
	"name" : "FadeUp",
	"in": {
    init : function($this , $opts){
		var $w = 0 , $char = '' ,$duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		$this.yStart = 0;
		$this.positions = [];
		for(var i = 0 ; i < $this.txtPositions.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
		setTimeout(function(){
			fabric.util.animate({
				startValue: 0,
				endValue: 1,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.opacityVal = value;
				}
			});
			fabric.util.animate({
				startValue: 200,
				endValue: 0,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.yStart = value;
					$this.fire('text:animated');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y + $this.yStart);
		}
		$this.ctx.restore();
		
    }
  },
  "out" : {
    init : function($this , $opts){
		var $w = 0 , $char = '' , $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		$this.yStart = 0;

		$this.positions = [];
		for(var i = 0 ; i < $this.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
	  
		fabric.util.animate({
			startValue: 1,
			endValue: 0,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.opacityVal = value;
			}
		});
		fabric.util.animate({
			startValue: 0,
			endValue: 200,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.yStart = value;
				$this.fire('text:animated');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
	},
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x ,$this.positions[$this.i].y - $this.yStart);
		}
		$this.ctx.restore();
    }
  }
};

SxTextTransition.fadeRight = {
	"name" : "FadeRight",
	"in": {
    init : function($this , $opts){
		var $w = 0 , $char = '' ,$duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		$this.xStart = 0;
		$this.positions = [];
		for(var i = 0 ; i < $this.txtPositions.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
		setTimeout(function(){
			fabric.util.animate({
				startValue: 0,
				endValue: 1,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.opacityVal = value;
				}
			});
			fabric.util.animate({
				startValue: 200,
				endValue: 0,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.xStart = value;
					$this.fire('text:animated');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x + $this.xStart,$this.positions[$this.i].y);
		}
		$this.ctx.restore();
		
    }
  },
  "out" : {
    init : function($this , $opts){
		var $w = 0 , $char = '' , $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		$this.xStart = 0;

		$this.positions = [];
		for(var i = 0 ; i < $this.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
	  
		fabric.util.animate({
			startValue: 1,
			endValue: 0,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.opacityVal = value;
			}
		});
		fabric.util.animate({
			startValue: 0,
			endValue: 200,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.xStart = value;
				$this.fire('text:animated');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
	},
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x + $this.xStart,$this.positions[$this.i].y);
		}
		$this.ctx.restore();
    }
  }
};

SxTextTransition.fadeLeft = {
	"name" : "FadeLeft",
	"in": {
    init : function($this , $opts){
		var $w = 0 , $char = '' ,$duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		$this.xStart = 0;
		$this.positions = [];
		for(var i = 0 ; i < $this.txtPositions.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
		setTimeout(function(){
			fabric.util.animate({
				startValue: 0,
				endValue: 1,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.opacityVal = value;
				}
			});
			fabric.util.animate({
				startValue: 200,
				endValue: 0,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.xStart = value;
					$this.fire('text:animated');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x - $this.xStart,$this.positions[$this.i].y);
		}
		$this.ctx.restore();
		
    }
  },
  "out" : {
    init : function($this , $opts){
		var $w = 0 , $char = '' , $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		$this.xStart = 0;

		$this.positions = [];
		for(var i = 0 ; i < $this.length ; i++){
			$this.positions.push({x: $this.txtPositions[i].x , y: $this.txtPositions[i].y , char : $this.txtPositions[i].char});
		}
	  
		fabric.util.animate({
			startValue: 1,
			endValue: 0,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.opacityVal = value;
			}
		});
		fabric.util.animate({
			startValue: 0,
			endValue: 200,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.xStart = value;
				$this.fire('text:animated');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
	},
    render : function($this){
		$this.ctx.save();
		$this.ctx.globalAlpha = $this.opacityVal;
		for($this.i = 0 ; $this.i < $this.length ; $this.i++){
			$this.ctx.fillText($this.positions[$this.i].char, $this.positions[$this.i].x - $this.xStart,$this.positions[$this.i].y);
		}
		$this.ctx.restore();
    }
  }
};