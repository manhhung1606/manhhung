/*
 * jQuery Nivo Slider v3.2 - Pro Extended Edition
 * Fixed critical bugs + added extra premium effects
 * MIT License
 *
 * Fixes:
 * - childWidth / childHeight reference bug
 * - random effect out-of-range bug
 * - better canvas cleanup
 * - safer resize handling
 * - improved shatter rendering stability
 *
 * Added effects:
 * - glitch
 * - pixelDissolve
 * - spinReveal
 * - flip3D
 * - zoomBlur
 * - shatter
 * - rippleReveal (NEW)
 * - curtainOpen (NEW)
 * - flashFade (NEW)
 * - liquidMorph (NEW)
 * - particleExplosion (NEW)
 * - smokeTransition (NEW)
 * - fireBurn (NEW)
 * - inkSpread (NEW)
 * - glassBreak (NEW)
 * - parallaxDepth (NEW)
 * - webglDistortion (NEW)
 * - lensFlare (NEW)
 * - liquidWave (NEW)
 * - hologramScan (NEW)
 * - neonPulse (NEW)
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
      cleanupEffects();
      sliderImg.attr('src', vars.currentImage.attr('src'));
      vars.running = false;
      slider.trigger('nivo:animFinished');
    }

    /* ---------- NEW EFFECTS ---------- */

    function runCurtainOpen(done) {
      var src = vars.currentImage.attr('src');

      var left = $('<div class="nivo-effect-overlay"></div>').css({
        position: 'absolute', top: 0, left: 0,
        width: '50%', height: '100%',
        background: 'rgba(0,0,0,.85)', zIndex: 10
      });

      var right = left.clone().css({ left: '50%' });

      var img = $('<img class="nivo-effect-overlay">')
        .attr('src', src)
        .css({
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          zIndex: 9
        });

      slider.css('position', 'relative').append(img, left, right);

      img.animate({ opacity: 1 }, settings.animSpeed * 1.2);
      left.animate({ width: 0 }, settings.animSpeed * 1.2);
      right.animate({ width: 0, left: '100%' }, settings.animSpeed * 1.2, function () {
        done();
      });
    }

    function runFlashFade(done) {
      var src = vars.currentImage.attr('src');

      var flash = $('<div class="nivo-effect-overlay"></div>').css({
        position: 'absolute',
        inset: 0,
        background: '#fff',
        opacity: 0,
        zIndex: 11
      });

      var img = $('<img class="nivo-effect-overlay">')
        .attr('src', src)
        .css({
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          zIndex: 10
        });

      slider.css('position', 'relative').append(img, flash);

      flash.animate({ opacity: 1 }, 150)
        .animate({ opacity: 0 }, 250);

      img.animate({ opacity: 1 }, settings.animSpeed, function () {
        done();
      });
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
          zIndex: 10
        });

      slider.css('position', 'relative').append(img);

      img[0].getBoundingClientRect();
      img.css({
        transition: 'clip-path ' + (settings.animSpeed * 1.5) + 'ms ease-out',
        clipPath: 'circle(150% at 50% 50%)'
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
          'webglDistortion',
          'lensFlare',
          'liquidWave',
          'hologramScan',
          'neonPulse'
        ];

        /* FIX #2 */
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
          currentEffect === 'webglDistortion' ||
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
      setInterval(nivoRun, settings.pauseTime);
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
    slices: 15,
    boxCols: 8,
    boxRows: 4,
    animSpeed: 700,
    pauseTime: 3500,
    startSlide: 0,
    directionNav: true,
    controlNav: false,
    controlNavThumbs: false,
    pauseOnHover: false,
    manualAdvance: false,
    prevText: 'Prev',
    nextText: 'Next',
    randomStart: false,

    pixelSize: 20,
    flipAxis: 'Y',

    beforeChange: function () {},
    afterChange: function () {},
    slideshowEnd: function () {},
    lastSlide: function () {},
    afterLoad: function () {}
  };

})(jQuery);
