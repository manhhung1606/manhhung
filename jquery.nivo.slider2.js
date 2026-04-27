(function ($) {
  var NivoSlider = function (element, options) {
    var settings = $.extend({}, $.fn.nivoSlider.defaults, options);

    var vars = {
      currentSlide: settings.startSlide,
      currentImage: '',
      totalSlides: 0,
      running: false,
      paused: false,
      stop: false
    };

    var slider = $(element);
    slider.css({ position: 'relative', overflow: 'hidden' });
    slider.addClass('nivoSlider');

    var kids = slider.children();
    kids.each(function () {
      var child = $(this);
      if (!child.is('img')) child = child.find('img:first');
      if (child.is('img')) {
        child.hide();
        vars.totalSlides++;
      }
    });

    // Thiết lập slide đầu tiên
    vars.currentImage = $(kids[vars.currentSlide]).is('img') ? $(kids[vars.currentSlide]) : $(kids[vars.currentSlide]).find('img:first');
    
    var sliderImg = $('<img class="nivo-main-image" />')
      .attr('src', vars.currentImage.attr('src'))
      .appendTo(slider);

    function cleanup() {
      slider.find('.nivo-overlay, canvas').remove();
      sliderImg.show();
    }

    function finish() {
      sliderImg.attr('src', vars.currentImage.attr('src'));
      cleanup();
      vars.running = false;
      settings.afterChange.call(this);
    }

    /* ---------- HIỆU ỨNG THỰC THẾ ---------- */

    // 1. Shatter (Vỡ vụn)
    function fxShatter(done) {
      var canvas = $('<canvas>').css({position:'absolute', top:0, left:0, zIndex:10}).appendTo(slider)[0];
      var ctx = canvas.getContext('2d');
      canvas.width = slider.width(); canvas.height = slider.height();
      
      var img = new Image(); img.src = vars.currentImage.attr('src');
      img.onload = function() {
        sliderImg.hide();
        var pieces = [];
        for(var x=0; x<canvas.width; x+=50) {
          for(var y=0; y<canvas.height; y+=50) {
            pieces.push({x:x, y:y, vx:(Math.random()-0.5)*15, vy:(Math.random()-0.5)*15, op:1});
          }
        }
        function anim() {
          ctx.clearRect(0,0,canvas.width,canvas.height);
          var active = false;
          pieces.forEach(p => {
            if(p.op > 0) {
              ctx.globalAlpha = p.op;
              ctx.drawImage(img, p.x, p.y, 50, 50, p.x, p.y, 50, 50);
              p.x += p.vx; p.y += p.vy; p.op -= 0.02;
              active = true;
            }
          });
          if(active) requestAnimationFrame(anim); else done();
        }
        anim();
      };
    }

    // 2. Glitch (Nhiễu sóng)
    function fxGlitch(done) {
      var src = vars.currentImage.attr('src');
      var gContainer = $('<div class="nivo-overlay">').css({position:'absolute', inset:0, zIndex:11}).appendTo(slider);
      for(var i=0; i<3; i++) {
        $('<img>').attr('src', src).css({
          position:'absolute', inset:0, width:'100%', height:'100%',
          opacity: 0.7, mixBlendingMode: 'hard-light'
        }).appendTo(gContainer);
      }
      var count = 0;
      var interval = setInterval(() => {
        gContainer.children().each(function() {
          $(this).css({
            left: (Math.random()*20 - 10)+'px',
            top: (Math.random()*10 - 5)+'px',
            filter: `hue-rotate(${Math.random()*360}deg)`
          });
        });
        if(count++ > 15) { clearInterval(interval); done(); }
      }, 40);
    }

    // 3. Ripple Reveal (Vòng tròn lan tỏa)
    function fxRipple(done) {
      var img = $('<img class="nivo-overlay">').attr('src', vars.currentImage.attr('src')).css({
        position:'absolute', inset:0, zIndex:10, width:'100%', height:'100%',
        'clip-path': 'circle(0% at 50% 50%)', '-webkit-clip-path': 'circle(0% at 50% 50%)',
        transition: `all ${settings.animSpeed}ms ease-in-out`
      }).appendTo(slider);
      
      setTimeout(() => {
        img.css({'clip-path': 'circle(150% at 50% 50%)', '-webkit-clip-path': 'circle(150% at 50% 50%)'});
      }, 20);
      setTimeout(done, settings.animSpeed + 50);
    }

    function nivoRun() {
      if (vars.running || vars.stop) return;
      vars.running = true;

      vars.currentSlide++;
      if (vars.currentSlide >= vars.totalSlides) vars.currentSlide = 0;

      vars.currentImage = $(kids[vars.currentSlide]).is('img') ? $(kids[vars.currentSlide]) : $(kids[vars.currentSlide]).find('img:first');

      var effect = settings.effect === 'random' 
                   ? ['shatter', 'glitch', 'ripple', 'fade'][Math.floor(Math.random()*4)] 
                   : settings.effect;

      if(effect === 'shatter') fxShatter(finish);
      else if(effect === 'glitch') fxGlitch(finish);
      else if(effect === 'ripple') fxRipple(finish);
      else {
        sliderImg.fadeOut(settings.animSpeed, function() {
          sliderImg.attr('src', vars.currentImage.attr('src')).fadeIn(settings.animSpeed, finish);
        });
      }
    }

    // Khởi tạo Timer
    if (!settings.manualAdvance && vars.totalSlides > 1) {
      setInterval(() => {
        if (!vars.paused && !vars.running && !vars.stop) nivoRun();
      }, settings.pauseTime);
    }

    slider.hover(() => { vars.paused = true; }, () => { vars.paused = false; });

    return this;
  };

  $.fn.nivoSlider = function (options) {
    return this.each(function () {
      if (!$(this).data('nivoslider')) $(this).data('nivoslider', new NivoSlider(this, options));
    });
  };

  $.fn.nivoSlider.defaults = {
    effect: 'random',
    animSpeed: 800,
    pauseTime: 4000,
    startSlide: 0,
    manualAdvance: false,
    afterChange: function () {}
  };
})(jQuery);
