var SxImageTransition = {};
SxImageTransition.none = {
	"name" : "None",
	"in" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		setTimeout(function(){
			$this.opacityVal = 1;
			$this.fire('image:loaded');
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate(-$this.width / 2 ,-$this.height / 2);
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  },
  "out" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		setTimeout(function(){
			$this.opacityVal = 0;
			$this.fire('image:loaded');
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate(-$this.width / 2 ,-$this.height / 2);
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  }
};

SxImageTransition.anim1 = {
	"name" : "Animation 1",
	"in" : {
    init : function($this , $opts){
		
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: -($this.width / 2) + (x * $this.tileWidth) , y: -($this.height / 2) + (y * $this.tileHeight) , width : 0 });
        }
      }
      $this.totalTiles = $this.positions.length;
	  var $duration = parseFloat($opts.duration)/$this.totalTiles * 1000;
      for(var i = 0 ; i < $this.totalTiles ; i++){
		  
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.width,
					endValue: $this.tileWidth,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.width = value;
						$this.fire('image:loaded');
					},
					onComplete : function(e){
						if($i == $this.totalTiles - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[i],i);
			
      }
    },
    render : function($this){
      if ($this.loaded) {
		  $this.ctx.globalAlpha = 1;
        if($this.totalTiles && $this.totalTiles > 0){
          $this.ctx.beginPath();
          for($this.i = 0 ; $this.i < $this.totalTiles ; $this.i++){
            $this.ctx.rect($this.positions[$this.i].x , $this.positions[$this.i].y , $this.positions[$this.i].width , $this.tileHeight);
          }
          $this.ctx.closePath();
          $this.ctx.clip();
        }

        $this.ctx.drawImage($this.image, -$this.width / 2, -$this.height / 2);

      }
    }
  },
  "out" : {
    init : function($this , $opts){
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: -($this.width / 2) + (x * $this.tileWidth) , y: -($this.height / 2) + (y * $this.tileHeight) , width : $this.tileWidth });
        }
      }
	  
	  $this.totalTiles = $this.positions.length;
	  var $duration = parseFloat($opts.duration)/$this.totalTiles * 1000;
	  
      
      for(var i = 0 ; i < $this.totalTiles ; i++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.width,
					endValue: 0,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.width = value;
						$this.fire('image:loaded');
					},
					onComplete : function(e){
						if($i == $this.totalTiles - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration)) ;
		})($this.positions[i],i);
      }
    },
    render : function($this){
      if ($this.loaded) {
		$this.ctx.globalAlpha = 1;
        if($this.totalTiles && $this.totalTiles > 0){
          $this.ctx.beginPath();
          for($this.i = 0 ; $this.i < $this.totalTiles ; $this.i++){
            $this.ctx.rect($this.positions[$this.i].x , $this.positions[$this.i].y , $this.positions[$this.i].width , $this.tileHeight);
          }
          $this.ctx.closePath();
          $this.ctx.clip();
        }

        $this.ctx.drawImage($this.image, -$this.width / 2, -$this.height / 2);

      }
    }
  }
};

SxImageTransition.anim2 = {
	"name" : "Animation 2",
	"in" : {
    init : function($this , $opts){
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: -($this.width / 2) + (x * $this.tileWidth) , y: -($this.height / 2) + (y * $this.tileHeight) , width : 0 , height : 0 });
        }
      }
	  
      $this.totalTiles = $this.positions.length;
	  var $duration = parseFloat($opts.duration)/$this.totalTiles * 1000;
	  
      for(var i = 0 ; i < $this.totalTiles ; i++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.width,
					endValue: $this.tileWidth,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.width = value;
					}
				});
				fabric.util.animate({
					startValue: $pos.height,
					endValue: $this.tileHeight,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.height = value;
						$this.fire('image:loaded');
					},
					onComplete : function(e){
						if($i == $this.totalTiles - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[i],i);
        
      }
    },
    render : function($this){
      if ($this.loaded) {
		$this.ctx.globalAlpha = 1;
        if($this.totalTiles && $this.totalTiles > 0){
          $this.ctx.beginPath();
          for($this.i = 0 ; $this.i < $this.totalTiles ; $this.i++){
            $this.ctx.rect($this.positions[$this.i].x , $this.positions[$this.i].y , $this.positions[$this.i].width , $this.positions[$this.i].height);
          }
          $this.ctx.closePath();
          $this.ctx.clip();
        }

        $this.ctx.drawImage($this.image, -$this.width / 2, -$this.height / 2);

      }
    }
  },
  "out" : {
    init : function($this , $opts){
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: -($this.width / 2) + (x * $this.tileWidth) , y: -($this.height / 2) + (y * $this.tileHeight) , width : $this.tileWidth });
        }
      }
	  
	  $this.totalTiles = $this.positions.length;
	  var $duration = parseFloat($opts.duration)/$this.totalTiles * 1000;
      
      for(var i = 0 ; i < $this.totalTiles ; i++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.width,
					endValue: 0,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.width = value;
					}
				});
				fabric.util.animate({
					startValue: $pos.height,
					endValue: 0,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.height = value;
						$this.fire('image:loaded');
					},
					onComplete : function(e){
						if($i == $this.totalTiles - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration)) ;
		})($this.positions[i],i);
        
      }
    },
    render : function($this){
      if ($this.loaded) {
		$this.ctx.globalAlpha = 1;
        if($this.totalTiles && $this.totalTiles > 0){
          $this.ctx.beginPath();
          for($this.i = 0 ; $this.i < $this.totalTiles ; $this.i++){
            $this.ctx.rect($this.positions[$this.i].x , $this.positions[$this.i].y , $this.positions[$this.i].width , $this.tileHeight);
          }
          $this.ctx.closePath();
          $this.ctx.clip();
        }

        $this.ctx.drawImage($this.image, -$this.width / 2, -$this.height / 2);

      }
    }
  }
};

SxImageTransition.anim3 = {
	"name" : "Animation 3",
	"in" : {
    init : function($this , $opts){
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: -($this.width / 2) + (x * $this.tileWidth) , y: -($this.height / 2) + (y * $this.tileHeight) , radius : 0 });
        }
      }
	  
	  $this.totalTiles = $this.positions.length;
	  var $duration = parseFloat($opts.duration)/$this.totalTiles * 1000;
      
      for(var i = 0 ; i < $this.totalTiles ; i++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.radius,
					endValue:  0.5 * Math.sqrt($this.tileWidth * $this.tileWidth + $this.tileHeight * $this.tileHeight),
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.radius = value;
						$this.fire('image:loaded');
					},
					onComplete : function(e){
						if($i == $this.totalTiles - 1){
							$this.animationComplete();
						}
					}
				});
				
			} , ($i * $duration) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[i],i);
        
      }
    },
    render : function($this){
      if ($this.loaded) {
		$this.ctx.globalAlpha = 1;
        if($this.totalTiles && $this.totalTiles > 0){
          $this.ctx.beginPath();
          for($this.i = 0 ; $this.i < $this.totalTiles ; $this.i++){
            
            $this.ctx.arc($this.positions[$this.i].x + ($this.tileWidth / 2) , $this.positions[$this.i].y + ($this.tileHeight / 2) , $this.positions[$this.i].radius , 0 , Math.PI * 2);
            
            $this.ctx.closePath();
          }
          $this.ctx.clip();
          $this.ctx.drawImage($this.image, -$this.width / 2, -$this.height / 2);
        }
      }
    }
  },
  "out" : {
    init : function($this , $opts){
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: -($this.width / 2) + (x * $this.tileWidth) , y: -($this.height / 2) + (y * $this.tileHeight) , radius : 0.5 * Math.sqrt($this.tileWidth * $this.tileWidth + $this.tileHeight * $this.tileHeight) });
        }
      }
	  
	  $this.totalTiles = $this.positions.length;
	  var $duration = parseFloat($opts.duration)/$this.totalTiles * 1000;
      
      for(var i = 0 ; i < $this.totalTiles ; i++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.radius,
					endValue:  0,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.radius = value;
						$this.fire('image:loaded');
					},
					onComplete : function(e){
						if($i == $this.totalTiles - 1){
							$this.animationComplete();
						}
					}
				});
				
			} , ($i * $duration )) ;
		})($this.positions[i],i);
		
      }
    },
    render : function($this){
      if ($this.loaded) {
		$this.ctx.globalAlpha = 1;
        if($this.totalTiles && $this.totalTiles > 0){
          $this.ctx.beginPath();
          for($this.i = 0 ; $this.i < $this.totalTiles ; $this.i++){
            $this.ctx.arc($this.positions[$this.i].x + ($this.tileWidth / 2) , $this.positions[$this.i].y + ($this.tileHeight / 2) , $this.positions[$this.i].radius, 0 , Math.PI * 2);
            $this.ctx.closePath();
          }
          
          $this.ctx.clip();
        }

        $this.ctx.drawImage($this.image, -$this.width / 2, -$this.height / 2);

      }
    }
  }
};

SxImageTransition.anim4 = {
	"name" : "Animation 4",
	"in" : {
    init : function($this , $opts){
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: x * $this.tileWidth , y: y * $this.tileHeight , opacity : 0 , scale : 0});
          
        }
      }
	  
	  $this.totalTiles = $this.positions.length;
	  var $duration = parseFloat($opts.duration)/$this.totalTiles * 1000;
      
      for(var i = 0 ; i < $this.totalTiles ; i++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.opacity,
					endValue: 1,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
					}
				});
				fabric.util.animate({
					startValue: $pos.scale,
					endValue: 1,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.scale = value;
						$this.fire('image:loaded');
					},
					onComplete : function(e){
						if($i == $this.totalTiles - 1){
							$this.animationComplete();
						}
					}
				});
				
			} , ($i * $duration) + (parseFloat($opts.delay) * 1000)) ;
		})($this.positions[i],i);
        
      }
    },
    render : function($this){
      if ($this.loaded) {
		$this.ctx.globalAlpha = 1;
        if($this.totalTiles && $this.totalTiles > 0){
          for($this.i = 0 ; $this.i < $this.totalTiles ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate(0, 0);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.scale($this.positions[$this.i].scale , $this.positions[$this.i].scale);
            
            $this.ctx.drawImage($this.image , $this.positions[$this.i].x , $this.positions[$this.i].y, $this.tileWidth , $this.tileHeight , - $this.width / 2 + $this.positions[$this.i].x  , -$this.height / 2 + $this.positions[$this.i].y, $this.tileWidth , $this.tileHeight);
            $this.ctx.restore();
            
          }
        }
      }
    }
  },
  "out" : {
    init : function($this , $opts){
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: x * $this.tileWidth , y: y * $this.tileHeight , opacity : 1 , scale : 1});
          
        }
      }
	  
	  $this.totalTiles = $this.positions.length;
	  var $duration = parseFloat($opts.duration)/$this.totalTiles * 1000;
      
      for(var i = 0 ; i < $this.totalTiles ; i++){
		(function($pos,$i){
			setTimeout(function(){
				fabric.util.animate({
					startValue: $pos.opacity,
					endValue: 0,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.opacity = value;
					}
				});
				fabric.util.animate({
					startValue: $pos.scale,
					endValue: 0,
					duration: $duration,
					easing : fabric.util.ease[$opts.easingType + $opts.easing],
					onChange: function(value) {
						$pos.scale = value;
						$this.fire('image:loaded');
					},
					onComplete : function(e){
						if($i == $this.totalTiles - 1){
							$this.animationComplete();
						}
					}
				});
			} , ($i * $duration)) ;
		})($this.positions[i],i);
		
      }
    },
    render : function($this){
      if ($this.loaded) {
		$this.ctx.globalAlpha = 1;
        if($this.totalTiles && $this.totalTiles > 0){
          for($this.i = 0 ; $this.i < $this.totalTiles ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate(0, 0);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.scale($this.positions[$this.i].scale , $this.positions[$this.i].scale);
            
            $this.ctx.drawImage($this.image , $this.positions[$this.i].x , $this.positions[$this.i].y, $this.tileWidth , $this.tileHeight , - $this.width / 2 + $this.positions[$this.i].x  , -$this.height / 2 + $this.positions[$this.i].y, $this.tileWidth , $this.tileHeight);
            $this.ctx.restore();
            
          }
        }
      }
    }
  }
};
SxImageTransition.fade = {
	"name" : "Fade",
	"in" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		setTimeout(function(){
			fabric.util.animate({
				startValue: 0,
				endValue: 1,
				duration: $duration ,
				easing : fabric.util.ease[$opts.easingType + $opts.easing],
				onChange: function(value) {
					$this.opacityVal = value;
					$this.fire('image:loaded');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate(-$this.width / 2 ,-$this.height / 2);
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  },
  "out" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		fabric.util.animate({
			startValue: 1,
			endValue: 0,
			duration: $duration ,
			easing : fabric.util.ease[$opts.easingType + $opts.easing],
			onChange: function(value) {
				$this.opacityVal = value;
				$this.fire('image:loaded');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate(-$this.width / 2 ,-$this.height / 2);
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  }
};

SxImageTransition.fadeDown = {
	"name" : "Fade Down",
	"in" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		$this.yStart = 0;
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
					$this.fire('image:loaded');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate(-$this.width / 2 ,(-$this.height / 2) - $this.yStart);
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  },
  "out" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		$this.yStart = 0;
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
				$this.fire('image:loaded');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate(-$this.width / 2 ,(-$this.height / 2) + $this.yStart);
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  }
};

SxImageTransition.fadeUp = {
	"name" : "Fade Up",
	"in" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		$this.yStart = 0;
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
					$this.fire('image:loaded');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate(-$this.width / 2 ,(-$this.height / 2) + $this.yStart);
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  },
  "out" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		$this.yStart = 0;
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
				$this.fire('image:loaded');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate(-$this.width / 2 ,(-$this.height / 2) - $this.yStart);
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  }
};

SxImageTransition.fadeRight = {
	"name" : "Fade Right",
	"in" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		$this.xStart = 0;
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
					$this.fire('image:loaded');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate((-$this.width / 2) + $this.xStart ,(-$this.height / 2));
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  },
  "out" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		$this.xStart = 0;
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
				$this.fire('image:loaded');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate((-$this.width / 2) + $this.xStart ,(-$this.height / 2));
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  }
};

SxImageTransition.fadeLeft = {
	"name" : "Fade Left",
	"in" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 0;
		$this.xStart = 0;
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
					$this.fire('image:loaded');
				},
				onComplete : function(e){
					$this.animationComplete();
				}
			});
		} , (parseFloat($opts.delay) * 1000)) ;
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate((-$this.width / 2) - $this.xStart ,(-$this.height / 2));
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  },
  "out" : {
    init : function($this , $opts){
		var $duration = parseFloat($opts.duration) * 1000;
		$this.opacityVal = 1;
		$this.xStart = 0;
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
				$this.fire('image:loaded');
			},
			onComplete : function(e){
				$this.animationComplete();
			}
		});
    },
    render : function($this){
		if ($this.loaded) {
			$this.ctx.save();
            $this.ctx.translate((-$this.width / 2) - $this.xStart ,(-$this.height / 2));
            $this.ctx.globalAlpha = $this.opacityVal;
			$this.ctx.drawImage($this.image, 0, 0);
			$this.ctx.restore();
		}
    }
  }
};