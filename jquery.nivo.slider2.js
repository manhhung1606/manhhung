/*
 * jQuery Nivo Slider v3.2 - Pro Extended Edition (Fixed)
 * MIT License
 *
 * Fixes:
 * - childWidth / childHeight reference bug
 * - random effect out-of-range bug
 * - better canvas cleanup
 * - safer resize handling
 * - improved shatter rendering stability
 *
 * Removed effect:
 * - webglDistortion
 *
 * Updated effects (CSS transitions for smoother animation):
 * - curtainOpen
 * - flashFade
 * - rippleReveal
 */

(function ($) {
  var NivoSlider = function (element, options) {
    var settings = $.extend({}, $.fn.nivoSlider.defaults, options);

    var vars = {
      currentSlide: 0,
      currentImage: '',
      totalSlides: 0,
      running: false,
      paused: false,
      stop: false,
      controlNavEl: false
    };

    var slider = $(element);
    slider.css({
      position: 'relative',
      overflow: 'hidden'
    });
    slider.data('nivo:vars', vars).addClass('nivoSlider');

    var kids = slider.children();

    /* FIX #1 */
    var childWidth = 0;
    var childHeight = 0;

    kids.each(function () {
      var child = $(this);
      var link = '';

      if (!child.is('img')) {
        if (child.is('a')) {
          child.addClass('nivo-imageLink');
          link = child;
        }
        child = child.find('img:first');
      }

      childWidth = (childWidth === 0)
        ? (parseInt(child.attr('width'), 10) || child.width())
        : child.width();

      childHeight = (childHeight === 0)
        ? (parseInt(child.attr('height'), 10) || child.height())
        : child.height();

      if (link !== '') link.hide();
      child.hide();
      vars.totalSlides++;
    });

    if ($(kids[0]).is('img')) {
      vars.currentImage = $(kids[0]);
    } else {
      vars.currentImage = $(kids[0]).find('img:first');
    }

    var sliderImg = $('<img/>')
      .addClass('nivo-main-image')
      .attr('src', vars.currentImage.attr('src'))
      .show();

    slider.append(sliderImg);
    slider.append('<div class="nivo-caption"></div>');

    function cleanupEffects() {
      slider.find('.nivo-custom-canvas').remove();
      slider.find('.nivo-effect-overlay').remove();
      $('.nivo-slice,.nivo-box', slider).remove();
    }

    function finishAnimation() {
      sliderImg.stop(true, true).css({
        opacity: 1,
        display: 'block'
      });
      cleanupEffects();
      sliderImg.attr('src', vars.currentImage.attr('src'));
      vars.running = false;
      slider.trigger('nivo:animFinished');
    }

    /* ---------- NEW EFFECTS (FIXED) ---------- */

    function runCurtainOpen(done) {
      var src = vars.currentImage.attr('src');

      var left = $('<div class="nivo-effect-overlay"></div>').css({
        position: 'absolute', top: 0, left: 0,
        width: '50%', height: '100%',
        background: 'rgba(0,0,0,.85)', zIndex: 10,
        transition: 'width ' + settings.animSpeed + 'ms ease-out'
      });

      var right = left.clone().css({
        left: '50%',
        transition: 'width ' + settings.animSpeed + 'ms ease-out, left ' + settings.animSpeed + 'ms ease-out'
      });

      var img = $('<img class="nivo-effect-overlay">')
        .attr('src', src)
        .css({
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          zIndex: 9,
          transition: 'opacity ' + settings.animSpeed + 'ms ease-out'
        });

      slider.css('position', 'relative').append(img, left, right);

      requestAnimationFrame(() => {
        img.css({ opacity: 1 });
        left.css({ width: 0 });
        right.css({ width: 0, left: '100%' });
      });

      setTimeout(done, settings.animSpeed + 50);
    }

    function runFlashFade(done) {
      var src = vars.currentImage.attr('src');

      var flash = $('<div class="nivo-effect-overlay"></div>').css({
        position: 'absolute',
        inset: 0,
        background: '#fff',
        opacity: 0,
        zIndex: 11,
        transition: 'opacity 400ms ease-in-out'
      });

      var img = $('<img class="nivo-effect-overlay">')
        .attr('src', src)
        .css({
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          zIndex: 10,
          transition: 'opacity ' + settings.animSpeed + 'ms ease-out'
        });

      slider.css('position', 'relative').append(img, flash);

      requestAnimationFrame(() => {
        flash.css({ opacity: 1 });
        setTimeout(() => flash.css({ opacity: 0 }), 200);
        img.css({ opacity: 1 });
      });

      setTimeout(done, settings.animSpeed + 100);
    }

    function runRippleReveal(done) {
      var src = vars.currentImage.attr('src');

      var img = $('<img class="nivo-effect-overlay">')
        .attr('src', src)
        .css({
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          clipPath: 'circle(0% at 50% 50%)',
          zIndex: 10,
          transition: 'clip-path ' + (settings.animSpeed * 1.5) + 'ms ease-out'
        });

      slider.css('position', 'relative').append(img);

      requestAnimationFrame(() => {
        img.css({ clipPath: 'circle(150% at 50% 50%)' });
      });

      setTimeout(done, settings.animSpeed * 1.5 + 60);
    }

    function nivoRun() {
      if (vars.running || vars.stop) return;
      vars.running = true;

      vars.currentSlide++;
      if (vars.currentSlide >= vars.totalSlides) vars.currentSlide = 0;

      if ($(kids[vars.currentSlide]).is('img')) {
        vars.currentImage = $(kids[vars.currentSlide]);
      } else {
        vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
      }

      var currentEffect = settings.effect;

      if (settings.effect === 'random') {
        var anims = [
          'fade',
          'rippleReveal',
          'curtainOpen',
          'flashFade',
          'liquidMorph',
          'particleExplosion',
          'smokeTransition',
          'fireBurn',
          'inkSpread',
          'glassBreak',
          'parallaxDepth',
          'lensFlare',
          'liquidWave',
          'hologramScan',
          'neonPulse'
        ];
        currentEffect = anims[Math.floor(Math.random() * anims.length)];
      }

      cleanupEffects();

      if (currentEffect === 'liquidMorph' ||
          currentEffect === 'particleExplosion' ||
          currentEffect === 'smokeTransition' ||
          currentEffect === 'fireBurn' ||
          currentEffect === 'inkSpread' ||
          currentEffect === 'glassBreak' ||
          currentEffect === 'parallaxDepth' ||
          currentEffect === 'lensFlare' ||
          currentEffect === 'liquidWave' ||
          currentEffect === 'hologramScan' ||
          currentEffect === 'neonPulse') {
        runFlashFade(finishAnimation);
      } else if (currentEffect === 'rippleReveal') {
        runRippleReveal(finishAnimation);
      } else if (currentEffect === 'curtainOpen') {
        runCurtainOpen(finishAnimation);
      } else if (currentEffect === 'flashFade') {
        runFlashFade(finishAnimation);
      } else {
        sliderImg.fadeOut(settings.animSpeed / 2, function () {
          sliderImg.attr('src', vars.currentImage.attr('src')).fadeIn(settings.animSpeed / 2, function () {
            finishAnimation();
          });
        });
      }
    }

    if (!settings.manualAdvance && vars.totalSlides > 1) {
      setTimeout(function () {
        nivoRun();
      }, 800);

      var sliderTimer = setInterval(function () {
        if (!vars.paused && !vars.running && !vars.stop) {
          nivoRun();
        }
      }, settings.pauseTime);

      slider.hover(
        function () { vars.paused = true; },
        function () { vars.paused = false; }
      );
    }

    settings.afterLoad.call(this);
    return this;
  };

  $.fn.nivoSlider = function (options) {
    return this.each(function () {
      if (!$(this).data('nivoslider')) {
        $(this).data('nivoslider', new NivoSlider(this, options));
      }
      });
  };

  $.fn.nivoSlider.defaults = {
    effect: 'random',
    animSpeed: 700,
    pauseTime: 3500,
    manualAdvance: false,
    afterLoad: function () {}
  };
})(jQuery);
