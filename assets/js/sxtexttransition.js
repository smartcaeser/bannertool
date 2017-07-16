var SxTextTransition = {};
SxTextTransition.anim1 = {
  in : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
          $char = $this.text.charAt(i);
          $this.positions.push({x: $w , y: 0 , opacity : 0 , scale : 0.2 , char : $char});
          $w += $this.ctx.measureText($char).width;
      }
      for(var j = 0 ; j < $this.length ; j++){
        
        TweenMax.to(
          $this.positions[j] ,
          $opts.duration ,
          {
            opacity : 1 ,
            scale : 1,
            ease: $opts.easing,
            delay : (j * (parseFloat($opts.duration)/$this.length)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('text:animated');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate(-$this.width / 2 + $this.positions[$this.i].x ,parseInt($this.fontSize)/3 + $this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.scale($this.positions[$this.i].scale , $this.positions[$this.i].scale);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
            
      }
    }
  },
  out : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
          $char = $this.text.charAt(i);
          $this.positions.push({x: $w , y: 0 , opacity : 1 , scale : 1 , char : $char});
          $w += $this.ctx.measureText($char).width;
      }
      for(var j = 0 ; j < $this.length ; j++){
        TweenMax.to(
          $this.positions[j] ,
          $opts.duration ,
          {
            opacity : 0 ,
            scale : 0.2,
            ease: $opts.easing,
            delay : (j * (parseFloat($opts.duration)/$this.length)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('text:animated');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate(-$this.width / 2 + $this.positions[$this.i].x ,parseInt($this.fontSize)/3 + $this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.scale($this.positions[$this.i].scale , $this.positions[$this.i].scale);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
            
      }
    }
  }
};


SxTextTransition.anim2 = {
  in : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
          $char = $this.text.charAt(i);
          $this.positions.push({x: $w , y: 0 , opacity : 0 , char : $char});
          $w += $this.ctx.measureText($char).width;
      }
      for(var j = 0 ; j < $this.length ; j++){
        TweenMax.fromTo(
          $this.positions[j] ,
          $opts.duration ,
          {
            y : '+=20',
            opacity : 0
          },
          {
            y : '-= 20',
            opacity : 1 ,    
            ease: $opts.easing,
            delay : (j * (parseFloat($opts.duration)/$this.length)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('text:animated');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.fillText($this.positions[$this.i].char, -$this.width / 2 + $this.positions[$this.i].x ,parseInt($this.fontSize)/3 + $this.positions[$this.i].y);
            $this.ctx.restore();
            
      }
    }
  },
  out : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
          $char = $this.text.charAt(i);
          $this.positions.push({x: $w , y: 0 , opacity : 1 , char : $char});
          $w += $this.ctx.measureText($char).width;
      }
      for(var j = 0 ; j < $this.length ; j++){
        TweenMax.fromTo(
          $this.positions[j] ,
          $opts.duration ,
          {
            opacity : 1
          },
          {
            y : '-= 20',
            opacity : 0 ,  
            ease: $opts.easing,
            delay : (j * (parseFloat($opts.duration)/$this.length)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('text:animated');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.fillText($this.positions[$this.i].char, -$this.width / 2 + $this.positions[$this.i].x ,parseInt($this.fontSize)/3 + $this.positions[$this.i].y);
            $this.ctx.restore();
            
      }
    }
  }
};

SxTextTransition.anim3 = {
  in : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
          $char = $this.text.charAt(i);
          $this.positions.push({x: $w , y: 0 , opacity : 0 , rotation : -90 , char : $char});
          $w += $this.ctx.measureText($char).width;
      }
      for(var j = 0 ; j < $this.length ; j++){
        TweenMax.fromTo(
          $this.positions[j] ,
          $opts.duration ,
          {
            x : '-=100',
            opacity : 0,
            rotation : -90
          },
          {
            x : '+= 100',
            opacity : 1 ,    
            rotation : 0,
            ease: $opts.easing,
            delay : (j * (parseFloat($opts.duration)/$this.length)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('text:animated');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate(-$this.width / 2 + $this.positions[$this.i].x ,parseInt($this.fontSize)/3 + $this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
          
            $this.ctx.rotate($this.positions[$this.i].rotation * Math.PI/180);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
            
      }
    }
  },
  out : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
          $char = $this.text.charAt(i);
          $this.positions.push({x: $w , y: 0 , opacity : 0 , rotation : 0 , char : $char});
          $w += $this.ctx.measureText($char).width;
      }
      for(var j = 0 ; j < $this.length ; j++){
        TweenMax.fromTo(
          $this.positions[j] ,
          $opts.duration ,
          {
            opacity : 1,
            rotation : 0
          },
          {
            x : '-= 100',
            opacity : 0 ,    
            rotation : -90,
            ease: $opts.easing,
            delay : (j * (parseFloat($opts.duration)/$this.length)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('text:animated');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate(-$this.width / 2 + $this.positions[$this.i].x ,parseInt($this.fontSize)/3 + $this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.rotate($this.positions[$this.i].rotation * Math.PI/180);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
      }
    }
  }
};

SxTextTransition.anim4 = {
  in : {
    init : function($this , $opts){
      var $w = 0 , $char = '' , $lw = 0;
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
          $char = $this.text.charAt(i);
          $lw = $this.ctx.measureText($char).width;
          $this.positions.push({x: $w , y: 0 , width : $lw , opacity : 0 , rotation : -90 , char : $char});
          $w += $lw;
      }
      for(var j = 0 ; j < $this.length ; j++){
        TweenMax.fromTo(
          $this.positions[j] ,
          $opts.duration ,
          {
            opacity : 0,
            rotation : -180
          },
          {
            opacity : 1 ,    
            rotation : 0,
            ease: $opts.easing,
            delay : (j * (parseFloat($opts.duration)/$this.length)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('text:animated');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate(-$this.width / 2 + $this.positions[$this.i].x + ($this.positions[$this.i].width / 2) ,parseInt($this.fontSize)/3 + $this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.rotate($this.positions[$this.i].rotation * Math.PI/180);
            $this.ctx.fillText($this.positions[$this.i].char, -($this.positions[$this.i].width / 2) , 0);
            $this.ctx.restore();
      }
    }
  },
  out : {
    init : function($this , $opts){
      var $w = 0 , $char = '';
      $this.positions = [];
      for(var i = 0 ; i < $this.length ; i++){
          $char = $this.text.charAt(i);
          $this.positions.push({x: $w , y: 0 , opacity : 0 , rotation : 0 , char : $char});
          $w += $this.ctx.measureText($char).width;
      }
      for(var j = 0 ; j < $this.length ; j++){
        TweenMax.fromTo(
          $this.positions[j] ,
          $opts.duration ,
          {
            opacity : 1,
            rotation : 0
          },
          {
            opacity : 0 ,    
            rotation : -90,
            ease: $opts.easing,
            delay : (j * (parseFloat($opts.duration)/$this.length)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('text:animated');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      for($this.i = 0 ; $this.i < $this.length ; $this.i++){
            $this.ctx.save();
            $this.ctx.translate(-$this.width / 2 + $this.positions[$this.i].x ,parseInt($this.fontSize)/3 + $this.positions[$this.i].y);
            $this.ctx.globalAlpha = $this.positions[$this.i].opacity;
            $this.ctx.rotate($this.positions[$this.i].rotation * Math.PI/180);
            $this.ctx.fillText($this.positions[$this.i].char, 0 , 0);
            $this.ctx.restore();
      }
    }
  }
};