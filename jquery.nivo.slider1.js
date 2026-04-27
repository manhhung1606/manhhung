/*
 * jQuery Nivo Slider v3.2 - Extended Edition
 * Original: http://nivo.dev7studios.com
 * Extended with: glitch, pixelDissolve, spinReveal, flip3D, zoomBlur, shatter effects
 *
 * Original copyright 2012, Dev7studios - MIT license
 * Extensions: free to use under MIT license
 */

(function($) {
    var NivoSlider = function(element, options){
        // Defaults are below
        var settings = $.extend({}, $.fn.nivoSlider.defaults, options);

        // Useful variables. Play carefully.
        var vars = {
            currentSlide: 0,
            currentImage: '',
            totalSlides: 0,
            running: false,
            paused: false,
            stop: false,
            controlNavEl: false
        };

        // Get this slider
        var slider = $(element);
        slider.data('nivo:vars', vars).addClass('nivoSlider');

        // Find our slider children
        var kids = slider.children();
        kids.each(function() {
            var child = $(this);
            var link = '';
            if(!child.is('img')){
                if(child.is('a')){
                    child.addClass('nivo-imageLink');
                    link = child;
                }
                child = child.find('img:first');
            }
            var childWidth = (childWidth === 0) ? child.attr('width') : child.width(),
                childHeight = (childHeight === 0) ? child.attr('height') : child.height();

            if(link !== ''){
                link.css('display','none');
            }
            child.css('display','none');
            vars.totalSlides++;
        });
         
        if(settings.randomStart){
            settings.startSlide = Math.floor(Math.random() * vars.totalSlides);
        }
        
        if(settings.startSlide > 0){
            if(settings.startSlide >= vars.totalSlides) { settings.startSlide = vars.totalSlides - 1; }
            vars.currentSlide = settings.startSlide;
        }
        
        if($(kids[vars.currentSlide]).is('img')){
            vars.currentImage = $(kids[vars.currentSlide]);
        } else {
            vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
        }
        
        if($(kids[vars.currentSlide]).is('a')){
            $(kids[vars.currentSlide]).css('display','block');
        }
        
        var sliderImg = $('<img/>').addClass('nivo-main-image');
        sliderImg.attr('src', vars.currentImage.attr('src')).show();
        slider.append(sliderImg);

        $(window).resize(function() {
            slider.children('img').width(slider.width());
            sliderImg.attr('src', vars.currentImage.attr('src'));
            sliderImg.stop().height('auto');
            $('.nivo-slice').remove();
            $('.nivo-box').remove();
        });

        slider.append($('<div class="nivo-caption"></div>'));
        
        var processCaption = function(settings){
            var nivoCaption = $('.nivo-caption', slider);
            if(vars.currentImage.attr('title') != '' && vars.currentImage.attr('title') != undefined){
                var title = vars.currentImage.attr('title');
                if(title.substr(0,1) == '#') title = $(title).html();   

                if(nivoCaption.css('display') == 'block'){
                    setTimeout(function(){
                        nivoCaption.html(title);
                    }, settings.animSpeed);
                } else {
                    nivoCaption.html(title);
                    nivoCaption.stop().fadeIn(settings.animSpeed);
                }
            } else {
                nivoCaption.stop().fadeOut(settings.animSpeed);
            }
        };
        
        processCaption(settings);
        
        var timer = 0;
        if(!settings.manualAdvance && kids.length > 1){
            timer = setInterval(function(){ nivoRun(slider, kids, settings, false); }, settings.pauseTime);
        }
        
        if(settings.directionNav){
            slider.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+ settings.prevText +'</a><a class="nivo-nextNav">'+ settings.nextText +'</a></div>');
            
            $(slider).on('click', 'a.nivo-prevNav', function(){
                if(vars.running) { return false; }
                clearInterval(timer);
                timer = '';
                vars.currentSlide -= 2;
                nivoRun(slider, kids, settings, 'prev');
            });
            
            $(slider).on('click', 'a.nivo-nextNav', function(){
                if(vars.running) { return false; }
                clearInterval(timer);
                timer = '';
                nivoRun(slider, kids, settings, 'next');
            });
        }
        
        if(settings.controlNav){
            vars.controlNavEl = $('<div class="nivo-controlNav"></div>');
            slider.after(vars.controlNavEl);
            for(var i = 0; i < kids.length; i++){
                if(settings.controlNavThumbs){
                    vars.controlNavEl.addClass('nivo-thumbs-enabled');
                    var child = kids.eq(i);
                    if(!child.is('img')){
                        child = child.find('img:first');
                    }
                    if(child.attr('data-thumb')) vars.controlNavEl.append('<a class="nivo-control" rel="'+ i +'"><img src="'+ child.attr('data-thumb') +'" alt="" /></a>');
                } else {
                    vars.controlNavEl.append('<a class="nivo-control" rel="'+ i +'">'+ (i + 1) +'</a>');
                }
            }

            $('a:eq('+ vars.currentSlide +')', vars.controlNavEl).addClass('active');
            
            $('a', vars.controlNavEl).bind('click', function(){
                if(vars.running) return false;
                if($(this).hasClass('active')) return false;
                clearInterval(timer);
                timer = '';
                sliderImg.attr('src', vars.currentImage.attr('src'));
                vars.currentSlide = $(this).attr('rel') - 1;
                nivoRun(slider, kids, settings, 'control');
            });
        }
        
        if(settings.pauseOnHover){
            slider.hover(function(){
                vars.paused = true;
                clearInterval(timer);
                timer = '';
            }, function(){
                vars.paused = false;
                if(timer === '' && !settings.manualAdvance){
                    timer = setInterval(function(){ nivoRun(slider, kids, settings, false); }, settings.pauseTime);
                }
            });
        }
        
        slider.bind('nivo:animFinished', function(){
            sliderImg.attr('src', vars.currentImage.attr('src'));
            // Remove any canvas/overlay used by custom effects
            slider.find('.nivo-custom-canvas').remove();
            slider.find('.nivo-effect-overlay').remove();
            vars.running = false; 
            $(kids).each(function(){
                if($(this).is('a')){
                   $(this).css('display','none');
                }
            });
            if($(kids[vars.currentSlide]).is('a')){
                $(kids[vars.currentSlide]).css('display','block');
            }
            if(timer === '' && !vars.paused && !settings.manualAdvance){
                timer = setInterval(function(){ nivoRun(slider, kids, settings, false); }, settings.pauseTime);
            }
            settings.afterChange.call(this);
        }); 
        
        // ─── Original slice/box creators ───────────────────────────────────────

        var createSlices = function(slider, settings, vars) {
        	if($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display','block');
            $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').width(slider.width()).css('visibility', 'hidden').show();
            var sliceHeight = ($('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').parent().is('a')) ? $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').parent().height() : $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').height();

            for(var i = 0; i < settings.slices; i++){
                var sliceWidth = Math.round(slider.width()/settings.slices);
                
                if(i === settings.slices-1){
                    slider.append(
                        $('<div class="nivo-slice" name="'+i+'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block !important; top:0; left:-'+ ((sliceWidth + (i * sliceWidth)) - sliceWidth) +'px;" /></div>').css({ 
                            left:(sliceWidth*i)+'px', 
                            width:(slider.width()-(sliceWidth*i))+'px',
                            height:sliceHeight+'px', 
                            opacity:'0',
                            overflow:'hidden'
                        })
                    );
                } else {
                    slider.append(
                        $('<div class="nivo-slice" name="'+i+'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block !important; top:0; left:-'+ ((sliceWidth + (i * sliceWidth)) - sliceWidth) +'px;" /></div>').css({ 
                            left:(sliceWidth*i)+'px', 
                            width:sliceWidth+'px',
                            height:sliceHeight+'px',
                            opacity:'0',
                            overflow:'hidden'
                        })
                    );
                }
            }
            
            $('.nivo-slice', slider).height(sliceHeight);
            sliderImg.stop().animate({
                height: $(vars.currentImage).height()
            }, settings.animSpeed);
        };
        
        var createBoxes = function(slider, settings, vars){
        	if($(vars.currentImage).parent().is('a')) $(vars.currentImage).parent().css('display','block');
            $('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').width(slider.width()).css('visibility', 'hidden').show();
            var boxWidth = Math.round(slider.width()/settings.boxCols),
                boxHeight = Math.round($('img[src="'+ vars.currentImage.attr('src') +'"]', slider).not('.nivo-main-image,.nivo-control img').height() / settings.boxRows);
            
            for(var rows = 0; rows < settings.boxRows; rows++){
                for(var cols = 0; cols < settings.boxCols; cols++){
                    if(cols === settings.boxCols-1){
                        slider.append(
                            $('<div class="nivo-box" name="'+ cols +'" rel="'+ rows +'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block; top:-'+ (boxHeight*rows) +'px; left:-'+ (boxWidth*cols) +'px;" /></div>').css({ 
                                opacity:0,
                                left:(boxWidth*cols)+'px', 
                                top:(boxHeight*rows)+'px',
                                width:(slider.width()-(boxWidth*cols))+'px'
                            })
                        );
                        $('.nivo-box[name="'+ cols +'"]', slider).height($('.nivo-box[name="'+ cols +'"] img', slider).height()+'px');
                    } else {
                        slider.append(
                            $('<div class="nivo-box" name="'+ cols +'" rel="'+ rows +'"><img src="'+ vars.currentImage.attr('src') +'" style="position:absolute; width:'+ slider.width() +'px; height:auto; display:block; top:-'+ (boxHeight*rows) +'px; left:-'+ (boxWidth*cols) +'px;" /></div>').css({ 
                                opacity:0,
                                left:(boxWidth*cols)+'px', 
                                top:(boxHeight*rows)+'px',
                                width:boxWidth+'px'
                            })
                        );
                        $('.nivo-box[name="'+ cols +'"]', slider).height($('.nivo-box[name="'+ cols +'"] img', slider).height()+'px');
                    }
                }
            }
            
            sliderImg.stop().animate({
                height: $(vars.currentImage).height()
            }, settings.animSpeed);
        };

        // ─── NEW EFFECT HELPERS ────────────────────────────────────────────────

        /**
         * GLITCH EFFECT
         * Tạo hiệu ứng glitch kiểu RGB-split + horizontal scramble
         * rồi hiện ảnh mới sau khi glitch xong.
         */
        var runGlitch = function(slider, settings, vars, onComplete){
            var newSrc  = vars.currentImage.attr('src');
            var w = slider.width();
            var h = sliderImg.height() || slider.height();

            // Canvas vẽ đè lên slider
            var canvas = $('<canvas class="nivo-custom-canvas"></canvas>').css({
                position: 'absolute', top: 0, left: 0, zIndex: 10,
                width: w, height: h
            }).attr({ width: w, height: h });
            slider.css('position','relative').append(canvas);

            var ctx    = canvas[0].getContext('2d');
            var imgObj = new Image();
            imgObj.crossOrigin = 'anonymous';
            imgObj.src = newSrc;

            imgObj.onload = function(){
                var duration  = settings.animSpeed * 1.5; // tổng thời gian glitch
                var start     = null;
                var glitching = true;

                function drawGlitch(ts){
                    if(!start) start = ts;
                    var elapsed  = ts - start;
                    var progress = Math.min(elapsed / duration, 1);

                    ctx.clearRect(0, 0, w, h);

                    // Vẽ ảnh gốc (background)
                    ctx.drawImage(imgObj, 0, 0, w, h);

                    if(progress < 0.85){ // glitch phase
                        var intensity = (1 - progress) * 18;

                        // RGB split
                        ctx.globalCompositeOperation = 'screen';

                        // Red channel lệch trái
                        ctx.globalAlpha = 0.6;
                        ctx.fillStyle = 'red';
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.drawImage(imgObj, -intensity * 1.5, 0, w, h);

                        // Blue channel lệch phải
                        ctx.drawImage(imgObj, intensity * 1.5, 0, w, h);

                        ctx.globalAlpha = 1;
                        ctx.globalCompositeOperation = 'source-over';

                        // Horizontal scramble bars
                        var bars = Math.floor(intensity * 1.2) + 2;
                        for(var b = 0; b < bars; b++){
                            var y      = Math.random() * h;
                            var barH   = Math.random() * (h * 0.08) + 2;
                            var offset = (Math.random() - 0.5) * intensity * 4;
                            ctx.drawImage(imgObj, 0, y, w, barH, offset, y, w, barH);
                        }

                        // Scanlines đậm ngẫu nhiên
                        if(Math.random() > 0.5){
                            var scanY = Math.random() * h;
                            ctx.fillStyle = 'rgba(0,255,200,0.15)';
                            ctx.fillRect(0, scanY, w, 2);
                        }
                    } else {
                        // Settle phase - ảnh rõ dần
                        var alpha = (progress - 0.85) / 0.15;
                        ctx.clearRect(0, 0, w, h);
                        ctx.globalAlpha = alpha;
                        ctx.drawImage(imgObj, 0, 0, w, h);
                        ctx.globalAlpha = 1;
                    }

                    if(progress < 1){
                        requestAnimationFrame(drawGlitch);
                    } else {
                        canvas.remove();
                        onComplete();
                    }
                }
                requestAnimationFrame(drawGlitch);
            };

            imgObj.onerror = function(){ canvas.remove(); onComplete(); };
        };

        /**
         * PIXEL DISSOLVE EFFECT
         * Chia ảnh thành grid pixel blocks, random fade-in từng block
         */
        var runPixelDissolve = function(slider, settings, vars, onComplete){
            var newSrc = vars.currentImage.attr('src');
            var w = slider.width();
            var h = sliderImg.height() || slider.height();

            var canvas = $('<canvas class="nivo-custom-canvas"></canvas>').css({
                position:'absolute', top:0, left:0, zIndex:10,
                width:w, height:h
            }).attr({ width:w, height:h });
            slider.css('position','relative').append(canvas);

            var ctx    = canvas[0].getContext('2d');
            var imgObj = new Image();
            imgObj.crossOrigin = 'anonymous';
            imgObj.src = newSrc;

            imgObj.onload = function(){
                var pixSize  = settings.pixelSize || 20; // kích thước mỗi pixel block
                var cols     = Math.ceil(w / pixSize);
                var rows     = Math.ceil(h / pixSize);
                var total    = cols * rows;
                var duration = settings.animSpeed * 2;

                // Tạo danh sách blocks và shuffle
                var blocks = [];
                for(var r = 0; r < rows; r++){
                    for(var c = 0; c < cols; c++){
                        blocks.push({ x: c * pixSize, y: r * pixSize });
                    }
                }
                // Fisher-Yates shuffle
                for(var i = blocks.length - 1; i > 0; i--){
                    var j = Math.floor(Math.random() * (i+1));
                    var tmp = blocks[i]; blocks[i] = blocks[j]; blocks[j] = tmp;
                }

                var start = null;
                function drawPixel(ts){
                    if(!start) start = ts;
                    var progress = Math.min((ts - start) / duration, 1);
                    var revealCount = Math.floor(progress * total);

                    ctx.clearRect(0, 0, w, h);

                    for(var k = 0; k < revealCount; k++){
                        var b = blocks[k];
                        ctx.drawImage(imgObj, b.x, b.y, pixSize, pixSize, b.x, b.y, pixSize, pixSize);
                    }

                    if(progress < 1){
                        requestAnimationFrame(drawPixel);
                    } else {
                        canvas.remove();
                        onComplete();
                    }
                }
                requestAnimationFrame(drawPixel);
            };
            imgObj.onerror = function(){ canvas.remove(); onComplete(); };
        };

        /**
         * SPIN REVEAL EFFECT
         * Ảnh mới scale từ 0 + xoay 360deg rồi hiện ra, dùng CSS animation
         */
        var runSpinReveal = function(slider, settings, vars, onComplete){
            var newSrc = vars.currentImage.attr('src');

            // Tạo một img overlay xoay vào
            var overlay = $('<img class="nivo-effect-overlay" />')
                .attr('src', newSrc)
                .css({
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    transformOrigin: 'center center',
                    transform: 'scale(0) rotate(-360deg)',
                    opacity: 0,
                    transition: 'none'
                });

            slider.css('position','relative').append(overlay);

            // Force reflow rồi kích hoạt transition
            overlay[0].getBoundingClientRect();

            var dur = (settings.animSpeed * 2) + 'ms';
            overlay.css({
                transition: 'transform ' + dur + ' cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity ' + dur + ' ease',
                transform: 'scale(1) rotate(0deg)',
                opacity: 1
            });

            setTimeout(function(){
                overlay.remove();
                onComplete();
            }, settings.animSpeed * 2 + 50);
        };

        /**
         * FLIP 3D EFFECT
         * Slider lật như lật thẻ bài - nửa đầu ẩn ảnh cũ, nửa sau hiện ảnh mới
         */
        var runFlip3D = function(slider, settings, vars, onComplete){
            var newSrc = vars.currentImage.attr('src');
            var axis   = settings.flipAxis || 'Y'; // 'Y' = lật ngang, 'X' = lật dọc
            var dur    = settings.animSpeed * 2;

            // Wrapper cần perspective
            slider.css({ perspective: '1000px', 'perspective-origin': '50% 50%' });

            var overlay = $('<img class="nivo-effect-overlay" />')
                .attr('src', newSrc)
                .css({
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    backfaceVisibility: 'hidden',
                    transform: axis === 'Y' ? 'rotateY(90deg)' : 'rotateX(90deg)',
                    transition: 'none'
                });

            slider.css('position','relative').append(overlay);

            // Phase 1: Ảnh cũ xoay ra ngoài
            sliderImg.css({
                transition: 'transform ' + (dur/2) + 'ms ease-in',
                transform: axis === 'Y' ? 'rotateY(-90deg)' : 'rotateX(-90deg)'
            });

            // Phase 2: Ảnh mới xoay vào
            setTimeout(function(){
                overlay[0].getBoundingClientRect();
                overlay.css({
                    transition: 'transform ' + (dur/2) + 'ms ease-out',
                    transform: 'rotateY(0deg) rotateX(0deg)'
                });
            }, dur / 2);

            setTimeout(function(){
                sliderImg.css({ transition:'', transform:'' });
                overlay.remove();
                onComplete();
            }, dur + 50);
        };

        /**
         * ZOOM BLUR EFFECT
         * Ảnh cũ zoom ra + blur biến mất, ảnh mới zoom vào từ trung tâm
         */
        var runZoomBlur = function(slider, settings, vars, onComplete){
            var newSrc = vars.currentImage.attr('src');
            var dur    = settings.animSpeed * 1.8;

            var overlay = $('<img class="nivo-effect-overlay" />')
                .attr('src', newSrc)
                .css({
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 10,
                    transform: 'scale(1.5)',
                    filter: 'blur(20px)',
                    opacity: 0,
                    transition: 'none'
                });

            slider.css('position','relative').append(overlay);
            overlay[0].getBoundingClientRect();

            var durStr = dur + 'ms';

            // Ảnh cũ: zoom ra + blur
            sliderImg.css({
                transition: 'transform ' + durStr + ' ease, filter ' + durStr + ' ease, opacity ' + durStr + ' ease',
                transform: 'scale(1.3)',
                filter: 'blur(15px)',
                opacity: 0
            });

            // Ảnh mới: từ blur zoom to → rõ nét
            overlay.css({
                transition: 'transform ' + durStr + ' ease, filter ' + durStr + ' ease, opacity ' + durStr + ' ease',
                transform: 'scale(1)',
                filter: 'blur(0px)',
                opacity: 1
            });

            setTimeout(function(){
                sliderImg.css({ transition:'', transform:'', filter:'', opacity:1 });
                overlay.remove();
                onComplete();
            }, dur + 50);
        };

        /**
         * SHATTER EFFECT  
         * Canvas vẽ ảnh cũ vỡ thành các mảnh tam giác bay ra, rồi hiện ảnh mới
         */
        var runShatter = function(slider, settings, vars, onComplete){
            var newSrc = vars.currentImage.attr('src');
            var w = slider.width();
            var h = sliderImg.height() || slider.height();

            var canvas = $('<canvas class="nivo-custom-canvas"></canvas>').css({
                position:'absolute', top:0, left:0, zIndex:10,
                width:w, height:h
            }).attr({ width:w, height:h });
            slider.css('position','relative').append(canvas);

            var ctx = canvas[0].getContext('2d');

            // Load OLD image (current background)
            var oldImg = new Image();
            oldImg.crossOrigin = 'anonymous';
            oldImg.src = sliderImg.attr('src');

            // Load NEW image
            var newImg = new Image();
            newImg.crossOrigin = 'anonymous';

            var cols = 6, rows = 4;
            var pieces = [];

            oldImg.onload = function(){
                // Tạo các mảnh vỡ
                for(var r = 0; r < rows; r++){
                    for(var c = 0; c < cols; c++){
                        var px = (c / cols) * w;
                        var py = (r / rows) * h;
                        var pw = w / cols;
                        var ph = h / rows;
                        pieces.push({
                            // vị trí gốc
                            ox: px + pw / 2,
                            oy: py + ph / 2,
                            // clip region
                            x: px, y: py, pw: pw, ph: ph,
                            // physics
                            vx: (Math.random() - 0.5) * 12,
                            vy: Math.random() * -8 - 2,
                            va: (Math.random() - 0.5) * 0.2,
                            angle: 0,
                            gravity: 0.5,
                            alpha: 1
                        });
                    }
                }

                var duration = settings.animSpeed * 1.8;
                var start = null;

                function drawShatter(ts){
                    if(!start) start = ts;
                    var progress = Math.min((ts - start) / duration, 1);

                    ctx.clearRect(0, 0, w, h);

                    // Vẽ ảnh mới ở dưới (fade in)
                    if(progress > 0.3){
                        ctx.globalAlpha = (progress - 0.3) / 0.7;
                        ctx.drawImage(newImg.complete ? newImg : oldImg, 0, 0, w, h);
                        ctx.globalAlpha = 1;
                    }

                    // Vẽ từng mảnh vỡ bay
                    for(var i = 0; i < pieces.length; i++){
                        var p = pieces[i];
                        p.vy += p.gravity;
                        p.ox += p.vx;
                        p.oy += p.vy;
                        p.angle += p.va;
                        p.alpha = Math.max(0, 1 - progress * 2);

                        if(p.alpha <= 0) continue;

                        ctx.save();
                        ctx.globalAlpha = p.alpha;
                        ctx.translate(p.ox, p.oy);
                        ctx.rotate(p.angle);

                        // Clip mảnh
                        ctx.beginPath();
                        ctx.rect(-p.pw/2, -p.ph/2, p.pw, p.ph);
                        ctx.clip();
                        ctx.drawImage(oldImg, p.x - p.ox + p.pw/2, p.y - p.oy + p.ph/2, w, h);

                        ctx.restore();
                    }

                    if(progress < 1){
                        requestAnimationFrame(drawShatter);
                    } else {
                        canvas.remove();
                        onComplete();
                    }
                }

                newImg.onload = function(){
                    requestAnimationFrame(drawShatter);
                };
                newImg.onerror = function(){
                    requestAnimationFrame(drawShatter);
                };
                newImg.src = newSrc;
            };

            oldImg.onerror = function(){ canvas.remove(); onComplete(); };
        };

        // ─── Main run method ───────────────────────────────────────────────────

        var nivoRun = function(slider, kids, settings, nudge){          
            var vars = slider.data('nivo:vars');
            
            if(vars && (vars.currentSlide === vars.totalSlides - 1)){ 
                settings.lastSlide.call(this);
            }
            
            if((!vars || vars.stop) && !nudge) { return false; }
            
            settings.beforeChange.call(this);

            if(!nudge){
                sliderImg.attr('src', vars.currentImage.attr('src'));
            } else {
                if(nudge === 'prev'){
                    sliderImg.attr('src', vars.currentImage.attr('src'));
                }
                if(nudge === 'next'){
                    sliderImg.attr('src', vars.currentImage.attr('src'));
                }
            }
            
            vars.currentSlide++;
            if(vars.currentSlide === vars.totalSlides){ 
                vars.currentSlide = 0;
                settings.slideshowEnd.call(this);
            }
            if(vars.currentSlide < 0) { vars.currentSlide = (vars.totalSlides - 1); }

            if($(kids[vars.currentSlide]).is('img')){
                vars.currentImage = $(kids[vars.currentSlide]);
            } else {
                vars.currentImage = $(kids[vars.currentSlide]).find('img:first');
            }
            
            if(settings.controlNav){
                $('a', vars.controlNavEl).removeClass('active');
                $('a:eq('+ vars.currentSlide +')', vars.controlNavEl).addClass('active');
            }
            
            processCaption(settings);            
            
            $('.nivo-slice', slider).remove();
            $('.nivo-box', slider).remove();
            
            var currentEffect = settings.effect,
                anims = '';
                
            // ── Thêm các effect mới vào pool random ──
            if(settings.effect === 'random'){
                anims = new Array(
                    'sliceDownRight','sliceDownLeft','sliceUpRight','sliceUpLeft',
                    'sliceUpDown','sliceUpDownLeft','fold','fade',
                    'boxRandom','boxRain','boxRainReverse','boxRainGrow','boxRainGrowReverse',
                    // ← CÁC EFFECT MỚI
                    'glitch','pixelDissolve','spinReveal','flip3D','zoomBlur','shatter'
                );
                currentEffect = anims[Math.floor(Math.random()*(anims.length + 1))];
                if(currentEffect === undefined) { currentEffect = 'fade'; }
            }
            
            if(settings.effect.indexOf(',') !== -1){
                anims = settings.effect.split(',');
                currentEffect = anims[Math.floor(Math.random()*(anims.length))];
                if(currentEffect === undefined) { currentEffect = 'fade'; }
            }
            
            if(vars.currentImage.attr('data-transition')){
                currentEffect = vars.currentImage.attr('data-transition');
            }
        
            vars.running = true;
            var timeBuff = 0,
                i = 0,
                slices = '',
                firstSlice = '',
                totalBoxes = '',
                boxes = '';

            // ── NEW EFFECTS ────────────────────────────────────────────────────

            if(currentEffect === 'glitch'){
                runGlitch(slider, settings, vars, function(){
                    slider.trigger('nivo:animFinished');
                });

            } else if(currentEffect === 'pixelDissolve'){
                runPixelDissolve(slider, settings, vars, function(){
                    slider.trigger('nivo:animFinished');
                });

            } else if(currentEffect === 'spinReveal'){
                runSpinReveal(slider, settings, vars, function(){
                    slider.trigger('nivo:animFinished');
                });

            } else if(currentEffect === 'flip3D'){
                runFlip3D(slider, settings, vars, function(){
                    slider.trigger('nivo:animFinished');
                });

            } else if(currentEffect === 'zoomBlur'){
                runZoomBlur(slider, settings, vars, function(){
                    slider.trigger('nivo:animFinished');
                });

            } else if(currentEffect === 'shatter'){
                runShatter(slider, settings, vars, function(){
                    slider.trigger('nivo:animFinished');
                });

            // ── ORIGINAL EFFECTS (giữ nguyên) ─────────────────────────────────

            } else if(currentEffect === 'sliceDown' || currentEffect === 'sliceDownRight' || currentEffect === 'sliceDownLeft'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                slices = $('.nivo-slice', slider);
                if(currentEffect === 'sliceDownLeft') { slices = $('.nivo-slice', slider)._reverse(); }
                
                slices.each(function(){
                    var slice = $(this);
                    slice.css({ 'top': '0px' });
                    if(i === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if(currentEffect === 'sliceUp' || currentEffect === 'sliceUpRight' || currentEffect === 'sliceUpLeft'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                slices = $('.nivo-slice', slider);
                if(currentEffect === 'sliceUpLeft') { slices = $('.nivo-slice', slider)._reverse(); }
                
                slices.each(function(){
                    var slice = $(this);
                    slice.css({ 'bottom': '0px' });
                    if(i === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if(currentEffect === 'sliceUpDown' || currentEffect === 'sliceUpDownRight' || currentEffect === 'sliceUpDownLeft'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                var v = 0;
                slices = $('.nivo-slice', slider);
                if(currentEffect === 'sliceUpDownLeft') { slices = $('.nivo-slice', slider)._reverse(); }
                
                slices.each(function(){
                    var slice = $(this);
                    if(i === 0){
                        slice.css('top','0px');
                        i++;
                    } else {
                        slice.css('bottom','0px');
                        i = 0;
                    }
                    
                    if(v === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({opacity:'1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    v++;
                });
            } else if(currentEffect === 'fold'){
                createSlices(slider, settings, vars);
                timeBuff = 0;
                i = 0;
                
                $('.nivo-slice', slider).each(function(){
                    var slice = $(this);
                    var origWidth = slice.width();
                    slice.css({ top:'0px', width:'0px' });
                    if(i === settings.slices-1){
                        setTimeout(function(){
                            slice.animate({ width:origWidth, opacity:'1.0' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            slice.animate({ width:origWidth, opacity:'1.0' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 50;
                    i++;
                });
            } else if(currentEffect === 'fade'){
                createSlices(slider, settings, vars);
                
                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({ 'width': slider.width() + 'px' });
                firstSlice.animate({ opacity:'1.0' }, (settings.animSpeed*2), '', function(){ slider.trigger('nivo:animFinished'); });

            } else if(currentEffect === 'slideInRight'){
                createSlices(slider, settings, vars);
                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({ 'width': '0px', 'opacity': '1' });
                firstSlice.animate({ width: slider.width() + 'px' }, (settings.animSpeed*2), '', function(){ slider.trigger('nivo:animFinished'); });

            } else if(currentEffect === 'slideInLeft'){
                createSlices(slider, settings, vars);
                firstSlice = $('.nivo-slice:first', slider);
                firstSlice.css({ 'width': '0px', 'opacity': '1', 'left': '', 'right': '0px' });
                firstSlice.animate({ width: slider.width() + 'px' }, (settings.animSpeed*2), '', function(){ 
                    firstSlice.css({ 'left': '0px', 'right': '' });
                    slider.trigger('nivo:animFinished'); 
                });

            } else if(currentEffect === 'boxRandom'){
                createBoxes(slider, settings, vars);
                totalBoxes = settings.boxCols * settings.boxRows;
                i = 0;
                timeBuff = 0;
                boxes = shuffle($('.nivo-box', slider));
                boxes.each(function(){
                    var box = $(this);
                    if(i === totalBoxes-1){
                        setTimeout(function(){
                            box.animate({ opacity:'1' }, settings.animSpeed, '', function(){ slider.trigger('nivo:animFinished'); });
                        }, (100 + timeBuff));
                    } else {
                        setTimeout(function(){
                            box.animate({ opacity:'1' }, settings.animSpeed);
                        }, (100 + timeBuff));
                    }
                    timeBuff += 20;
                    i++;
                });

            } else if(currentEffect === 'boxRain' || currentEffect === 'boxRainReverse' || currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse'){
                createBoxes(slider, settings, vars);
                totalBoxes = settings.boxCols * settings.boxRows;
                i = 0;
                timeBuff = 0;
                var rowIndex = 0;
                var colIndex = 0;
                var box2Darr = [];
                box2Darr[rowIndex] = [];
                boxes = $('.nivo-box', slider);
                if(currentEffect === 'boxRainReverse' || currentEffect === 'boxRainGrowReverse'){
                    boxes = $('.nivo-box', slider)._reverse();
                }
                boxes.each(function(){
                    box2Darr[rowIndex][colIndex] = $(this);
                    colIndex++;
                    if(colIndex === settings.boxCols){
                        rowIndex++;
                        colIndex = 0;
                        box2Darr[rowIndex] = [];
                    }
                });
                
                for(var cols = 0; cols < (settings.boxCols * 2); cols++){
                    var prevCol = cols;
                    for(var rows = 0; rows < settings.boxRows; rows++){
                        if(prevCol >= 0 && prevCol < settings.boxCols){
                            (function(row, col, time, i, totalBoxes) {
                                var box = $(box2Darr[row][col]);
                                var bw = box.width();
                                var bh = box.height();
                                if(currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse'){
                                    box.width(0).height(0);
                                }
                                if(i === totalBoxes-1){
                                    setTimeout(function(){
                                        box.animate({ opacity:'1', width:bw, height:bh }, settings.animSpeed/1.3, '', function(){ slider.trigger('nivo:animFinished'); });
                                    }, (100 + time));
                                } else {
                                    setTimeout(function(){
                                        box.animate({ opacity:'1', width:bw, height:bh }, settings.animSpeed/1.3);
                                    }, (100 + time));
                                }
                            })(rows, prevCol, timeBuff, i, totalBoxes);
                            i++;
                        }
                        prevCol--;
                    }
                    timeBuff += 100;
                }
            }           
        };
        
        // ── Utilities ──────────────────────────────────────────────────────────

        var shuffle = function(arr){
            for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i, 10), x = arr[--i], arr[i] = arr[j], arr[j] = x);
            return arr;
        };
        
        var trace = function(msg){
            if(this.console && typeof console.log !== 'undefined') { console.log(msg); }
        };
        
        this.stop = function(){
            if(!$(element).data('nivo:vars').stop){
                $(element).data('nivo:vars').stop = true;
                trace('Stop Slider');
            }
        };
        
        this.start = function(){
            if($(element).data('nivo:vars').stop){
                $(element).data('nivo:vars').stop = false;
                trace('Start Slider');
            }
        };
        
        settings.afterLoad.call(this);
        return this;
    };
        
    $.fn.nivoSlider = function(options) {
        return this.each(function(key, value){
            var element = $(this);
            if (element.data('nivoslider')) { return element.data('nivoslider'); }
            var nivoslider = new NivoSlider(this, options);
            element.data('nivoslider', nivoslider);
        });
    };
    
    // ── Defaults (updated với options mới) ────────────────────────────────────
    $.fn.nivoSlider.defaults = {
        effect: 'random',
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 3000,
        startSlide: 0,
        directionNav: true,
        controlNav: false,
        controlNavThumbs: false,
        pauseOnHover: false,
        manualAdvance: false,
        prevText: 'Prev',
        nextText: 'Next',
        randomStart: false,
        // ── Options cho effect mới ──
        pixelSize: 20,      // kích thước pixel block cho pixelDissolve
        flipAxis: 'Y',      // 'Y' = lật ngang, 'X' = lật dọc cho flip3D
        // ── Callbacks ──
        beforeChange: function(){},
        afterChange: function(){},
        slideshowEnd: function(){},
        lastSlide: function(){},
        afterLoad: function(){}
    };

    $.fn._reverse = [].reverse;
    
})(jQuery);
