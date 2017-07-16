var SxImageTransition = {};
SxImageTransition.anim1 = {
  in : {
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
      for(var i = 0 ; i < $this.totalTiles ; i++){
        TweenMax.to(
          $this.positions[i] ,
          $opts.duration ,
          {
            width : $this.tileWidth ,
            ease: $opts.easing,
            delay : (i * (parseFloat($opts.duration)/$this.totalTiles)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('image:loaded');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      if ($this.loaded) {
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
  out : {
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
      for(var i = 0 ; i < $this.totalTiles ; i++){
        TweenMax.to(
          $this.positions[i] ,
          $opts.duration ,
          {
            width : 0 ,
            ease: $opts.easing,
            delay : (i * (parseFloat($opts.duration)/$this.totalTiles)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('image:loaded');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      if ($this.loaded) {
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
  in : {
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
      for(var i = 0 ; i < $this.totalTiles ; i++){
        TweenMax.to(
          $this.positions[i] ,
          $opts.duration ,
          {
            width : $this.tileWidth ,
            height : $this.tileHeight ,
            ease: $opts.easing,
            delay : (i * (parseFloat($opts.duration)/$this.totalTiles)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('image:loaded');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      if ($this.loaded) {
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
  out : {
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
      for(var i = 0 ; i < $this.totalTiles ; i++){
        TweenMax.to(
          $this.positions[i] ,
          $opts.duration ,
          {
            width : 0 ,
            ease: $opts.easing,
            delay : (i * (parseFloat($opts.duration)/$this.totalTiles)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('image:loaded');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      if ($this.loaded) {
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
  in : {
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
      for(var i = 0 ; i < $this.totalTiles ; i++){
        TweenMax.to(
          $this.positions[i] ,
          $opts.duration ,
          {
            radius : 0.5 * Math.sqrt($this.tileWidth * $this.tileWidth + $this.tileHeight * $this.tileHeight) ,
            ease: $opts.easing,
            delay : (i * (parseFloat($opts.duration)/$this.totalTiles)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('image:loaded');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      if ($this.loaded) {
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
  out : {
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
      for(var i = 0 ; i < $this.totalTiles ; i++){
        TweenMax.to(
          $this.positions[i] ,
          $opts.duration ,
          {
            radius : 0 ,
            ease: $opts.easing,
            delay : (i * (parseFloat($opts.duration)/$this.totalTiles)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('image:loaded');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      if ($this.loaded) {
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
  in : {
    init : function($this , $opts){
      $this.tileWidth = Math.ceil($this.width / $opts.cols);
      $this.tileHeight = Math.ceil($this.height / $opts.rows);
      $this.positions = [];
      for(var y = 0 ; y < $opts.rows ; y++){
        for(var x = 0 ; x < $opts.cols ; x++){
          $this.positions.push({x: x * $this.tileWidth , y: y * $this.tileHeight , opacity : 0 , scale : 0.2});
          
        }
      }
      $this.totalTiles = $this.positions.length;
      for(var i = 0 ; i < $this.totalTiles ; i++){
        TweenMax.to(
          $this.positions[i] ,
          $opts.duration ,
          {
            opacity : 1,
            scale : 1,
            ease: $opts.easing,
            delay : (i * (parseFloat($opts.duration)/$this.totalTiles)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('image:loaded');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      if ($this.loaded) {
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
  out : {
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
      for(var i = 0 ; i < $this.totalTiles ; i++){
        TweenMax.to(
          $this.positions[i] ,
          $opts.duration ,
          {
            opacity : 0,
            scale : 0.2,
            ease: $opts.easing,
            delay : (i * (parseFloat($opts.duration)/$this.totalTiles)) + parseFloat($opts.delay) ,
            onUpdate : (function(){
              $this.fire('image:loaded');
            }).bind($this)
          }
         );
      }
    },
    render : function($this){
      if ($this.loaded) {
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