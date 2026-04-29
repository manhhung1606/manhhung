$(document).ready(function() {
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({ 'overflow': 'visible' });
    }, 600);
})

function init(){
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

// ============================================================
// SHATTER EFFECT — dùng chung cho mọi popup
// canvas: element canvas, targetEl: wrap cần vỡ, cb: callback
// ============================================================
function shatterAndRemove(overlayId, animId, cb) {
    var overlay = document.getElementById(overlayId);
    if (!overlay) { if(cb) cb(); return; }

    var wrap = overlay.querySelector('[id$="-wrap"]') || overlay.firstElementChild;
    if (!wrap) { overlay.remove(); if(cb) cb(); return; }

    // Chụp snapshot của wrap
    var rect = wrap.getBoundingClientRect();
    var W = rect.width, H = rect.height;
    if (W < 1 || H < 1) { overlay.remove(); if(cb) cb(); return; }

    // Tạo canvas vỡ mảnh
    var sc = document.createElement('canvas');
    sc.width = W; sc.height = H;
    sc.style.cssText = 'position:fixed;left:'+rect.left+'px;top:'+rect.top+'px;width:'+W+'px;height:'+H+'px;pointer-events:none;z-index:999999;';
    document.body.appendChild(sc);
    var sctx = sc.getContext('2d');

    // Vẽ nền đơn giản (snapshot màu) — tránh lỗi cross-origin với canvas neon bên trong
    sctx.fillStyle = 'rgba(5,5,30,0.92)';
    sctx.fillRect(0, 0, W, H);
    // Vẽ border neon giả
    sctx.strokeStyle = 'rgba(0,200,255,0.6)';
    sctx.lineWidth = 2;
    sctx.strokeRect(1, 1, W-2, H-2);

    // Ẩn overlay gốc ngay
    overlay.style.visibility = 'hidden';

    // Tạo mảnh vỡ
    var COLS = 8, ROWS = 6;
    var pw = W / COLS, ph = H / ROWS;
    var pieces = [];
    for (var r = 0; r < ROWS; r++) {
        for (var c = 0; c < COLS; c++) {
            var sx = c * pw, sy = r * ph;
            // Mỗi mảnh: vị trí tâm, vận tốc bay, xoay
            var cx = sx + pw/2, cy = sy + ph/2;
            // Hướng bay từ tâm màn hình ra
            var dx = cx - W/2, dy = cy - H/2;
            var dist = Math.sqrt(dx*dx + dy*dy) || 1;
            var speed = 4 + Math.random() * 8;
            pieces.push({
                sx: sx, sy: sy,
                x: cx, y: cy,
                vx: (dx/dist) * speed + (Math.random()-0.5)*3,
                vy: (dy/dist) * speed + (Math.random()-0.5)*3 - 2,
                gravity: 0.4 + Math.random()*0.3,
                rot: 0,
                rotSpeed: (Math.random()-0.5) * 0.25,
                alpha: 1,
                pw: pw, ph: ph
            });
        }
    }

    // Animate mảnh vỡ
    var startTime = null;
    var duration = 600;

    function animShatter(ts) {
        if (!startTime) startTime = ts;
        var elapsed = ts - startTime;
        var progress = Math.min(elapsed / duration, 1);

        sctx.clearRect(0, 0, W, H);

        var allDone = true;
        for (var i = 0; i < pieces.length; i++) {
            var p = pieces[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rot += p.rotSpeed;
            p.alpha = 1 - progress;
            if (p.alpha > 0) allDone = false;

            sctx.save();
            sctx.globalAlpha = Math.max(0, p.alpha);
            sctx.translate(p.x, p.y);
            sctx.rotate(p.rot);
            // Vẽ mảnh: fill + neon border
            sctx.fillStyle = 'rgba(5,5,30,0.92)';
            sctx.fillRect(-p.pw/2, -p.ph/2, p.pw, p.ph);
            sctx.strokeStyle = 'rgba(0,200,255,0.8)';
            sctx.lineWidth = 1;
            sctx.strokeRect(-p.pw/2, -p.ph/2, p.pw, p.ph);
            // Đường crack
            sctx.strokeStyle = 'rgba(0,220,255,0.5)';
            sctx.lineWidth = 0.5;
            sctx.beginPath();
            sctx.moveTo(-p.pw/2, -p.ph/4);
            sctx.lineTo(p.pw/4, p.ph/2);
            sctx.stroke();
            sctx.restore();
        }

        if (progress < 1) {
            requestAnimationFrame(animShatter);
        } else {
            sc.remove();
            overlay.remove();
            if (cb) cb();
        }
    }
    requestAnimationFrame(animShatter);
}

function firstQuestion(){
    $('body').css('overflow', 'hidden');
    $('#wrapper, header, #yes, #no, .inner-width, center, p, span[id^="a"], #chaffle-title, #slider, footer, #demo-1, #demo-2, #demo-3').hide();
    $('.leaf').remove();

    // CSS chung
    var style = document.createElement('style');
    style.id = 'glitch-main-style';
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap');

        #glitch-overlay {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Share Tech Mono', monospace;
            padding: 16px;
        }

        #glitch-wrap {
            position: relative;
            border-radius: 8px;
            width: 100%;
            max-width: 560px;
            animation: gPopIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes gPopIn {
            from { transform: scale(0.7) translateY(30px); opacity: 0; }
            to   { transform: scale(1) translateY(0); opacity: 1; }
        }

        #glitch-canvas {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            pointer-events: none;
            z-index: 20;
        }

        #glitch-box {
            position: relative;
            width: 100%;
            background: rgba(5, 5, 30, 0.92);
            border-radius: 6px;
            padding: 32px 24px 28px;
            text-align: center;
            box-shadow: inset 0 0 40px rgba(0,50,150,0.15);
        }

        /* FIX 1: avatar wrap không bị lộn dòng */
        .g-avatar-wrap {
            position: relative;
            width: 100%;
            max-width: 500px;
            aspect-ratio: 1 / 1;
            margin: 0 auto 22px;
            z-index: 3;
            overflow: hidden;
            border-radius: 3px;
        }
        .g-avatar-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 3px;
        }
        .g-glitch-r, .g-glitch-b {
            position: absolute;
            inset: 0;
            border-radius: 3px;
            mix-blend-mode: screen;
            opacity: 0;
        }
        .g-glitch-r { background-color: rgba(255,0,60,0.5); animation: gGlitchR 3s infinite; }
        .g-glitch-b { background-color: rgba(0,200,255,0.5); animation: gGlitchB 3s infinite; }

        @keyframes gGlitchR {
            0%,90%,100% { opacity:0; transform:translate(0,0); clip-path:none; }
            91% { opacity:1; transform:translate(-4px,1px); clip-path:inset(20% 0 50% 0); }
            93% { opacity:1; transform:translate(3px,-2px); clip-path:inset(60% 0 10% 0); }
            95% { opacity:0; }
            96% { opacity:1; transform:translate(-3px,2px); clip-path:inset(40% 0 30% 0); }
            98% { opacity:0; }
        }
        @keyframes gGlitchB {
            0%,88%,100% { opacity:0; transform:translate(0,0); clip-path:none; }
            89% { opacity:1; transform:translate(4px,-1px); clip-path:inset(40% 0 30% 0); }
            91% { opacity:1; transform:translate(-2px,3px); clip-path:inset(70% 0 5% 0); }
            93% { opacity:0; }
            94% { opacity:1; transform:translate(2px,-2px); clip-path:inset(15% 0 65% 0); }
            96% { opacity:0; }
        }

        /* FIX 1: greeting không wrap lộn */
        .g-greeting {
            position: relative;
            z-index: 3;
            font-family: 'Orbitron', sans-serif;
            font-size: 18px;
            font-weight: 900;
            color: #fff;
            text-shadow: 0 0 8px rgba(0,200,255,0.8), 0 0 20px rgba(0,150,255,0.4);
            animation: gTextGlitch 4s infinite;
            line-height: 1.5;
            margin-bottom: 10px;
            word-break: break-word;
            white-space: pre-wrap;
        }
        @keyframes gTextGlitch {
            0%,85%,100% { text-shadow:0 0 8px rgba(0,200,255,0.8),0 0 20px rgba(0,150,255,0.4); transform:translate(0,0); }
            86% { text-shadow:-2px 0 #f03,2px 0 #0cf; transform:translate(-1px,0); }
            87% { text-shadow:2px 0 #f03,-2px 0 #0cf; transform:translate(2px,0); }
            88% { text-shadow:0 0 8px rgba(0,200,255,0.8); transform:translate(0,0); }
            92% { text-shadow:-3px 0 #f03,3px 0 #0cf; transform:translate(1px,0); }
            93% { text-shadow:0 0 8px rgba(0,200,255,0.8); transform:translate(0,0); }
        }

        .g-sub {
            position: relative;
            z-index: 3;
            font-family: 'Orbitron', sans-serif;
            font-size: 18px;
            font-weight: 900;
            color: #fff;
            text-shadow: 0 0 8px rgba(0,200,255,0.8), 0 0 20px rgba(0,150,255,0.4);
            letter-spacing: 1px;
            line-height: 1.5;
            margin-bottom: 24px;
            word-break: break-word;
        }
        @keyframes gBlink { 0%,100%{opacity:0.85} 50%{opacity:0.4} }

        .g-cursor {
            display: inline-block;
            width: 2px; height: 1em;
            background: #0cf;
            margin-left: 2px;
            vertical-align: middle;
            animation: gCursorBlink 0.8s steps(1) infinite;
        }
        @keyframes gCursorBlink { 0%,50%{opacity:1} 51%,100%{opacity:0} }

        .g-btn {
            position: relative;
            z-index: 3;
            display: inline-block;
            padding: 12px 38px;
            font-family: 'Orbitron', sans-serif;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 2px;
            color: #fff;
            background: transparent;
            border: 1.5px solid #0af;
            border-radius: 2px;
            cursor: pointer;
            text-transform: uppercase;
            overflow: hidden;
            transition: color 0.2s;
        }
        .g-btn:hover {
            color: #0df;
            box-shadow: 0 0 15px rgba(0,170,255,0.5), inset 0 0 10px rgba(0,150,255,0.1);
        }
    `;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'glitch-overlay';
    overlay.innerHTML = `
        <div id="glitch-wrap">
            <canvas id="glitch-canvas"></canvas>
            <div id="glitch-box">
                <div class="g-avatar-wrap">
                    <img src="https://manhhung1606.github.io/manhhung/Save = Follow♡「Hương 」♡.jpeg"
                         onerror="this.style.background='linear-gradient(135deg,#1a1a4e,#0d0d2b)'"
                         alt="Mạnh Hùng">
                    <div class="g-glitch-r"></div>
                    <div class="g-glitch-b"></div>
                </div>
                <div class="g-greeting"><span id="g-typeText"></span><span class="g-cursor"></span></div>
                <div class="g-sub" id="g-sub-scramble"></div>
                <button class="g-btn" id="g-btn-ok">${CONFIG.btnIntro}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Neon border canvas
    var wrap = document.getElementById('glitch-wrap');
    var canvas = document.getElementById('glitch-canvas');
    var ctx = canvas.getContext('2d');
    var angle = 0;
    var animId;

    function drawBorderPath(w, h, r) {
        var p = new Path2D();
        p.moveTo(r, 0); p.lineTo(w-r, 0); p.arcTo(w,0,w,r,r);
        p.lineTo(w,h-r); p.arcTo(w,h,w-r,h,r);
        p.lineTo(r,h); p.arcTo(0,h,0,h-r,r);
        p.lineTo(0,r); p.arcTo(0,0,r,0,r);
        p.closePath();
        return p;
    }

    function drawNeon() {
        var w = wrap.offsetWidth, h = wrap.offsetHeight;
        canvas.width = w; canvas.height = h;
        var r = 8, perimeter = 2*(w+h);
        var tailLen = perimeter * 0.2;
        var pos = (angle/360) * perimeter;
        var path = drawBorderPath(w, h, r);
        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.strokeStyle = 'rgba(0,200,255,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke(path);
        ctx.restore();
        var hue = (angle * 3) % 360;
        ctx.save();
        ctx.strokeStyle = 'hsl('+hue+',100%,65%)';
        ctx.lineWidth = 3;
        ctx.shadowColor = 'hsl('+hue+',100%,70%)';
        ctx.shadowBlur = 18;
        ctx.setLineDash([tailLen, perimeter - tailLen]);
        ctx.lineDashOffset = -pos;
        ctx.stroke(path);
        ctx.restore();
        angle = (angle + 1.5) % 360;
        animId = requestAnimationFrame(drawNeon);
    }
    drawNeon();

    // Typewriter
    var lines = [CONFIG.introTitle];
    var el = document.getElementById('g-typeText');
    var lineIdx = 0, charIdx = 0;
    function type() {
        if (lineIdx >= lines.length) return;
        var line = lines[lineIdx];
        if (charIdx < line.length) {
            el.innerHTML += line[charIdx] === ' ' ? '&nbsp;' : line[charIdx];
            charIdx++;
            setTimeout(type, Math.random() * 60 + 50);
        } else {
            lineIdx++;
            charIdx = 0;
            if (lineIdx < lines.length) {
                el.innerHTML += '<br>';
                setTimeout(type, 350);
            }
        }
    }
    setTimeout(type, 700);

    // Scramble effect cho .g-sub
    (function() {
        var target = CONFIG.introDesc;
        var el = document.getElementById('g-sub-scramble');
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?';
        var revealed = 0;
        var total = target.length;
        var intervalMs = 40;
        var revealEvery = 3; // cứ 3 frame reveal 1 ký tự

        var frame = 0;
        function scrambleStep() {
            if (revealed >= total) {
                el.textContent = target;
                return;
            }
            // Phần đã reveal: đúng
            var display = target.slice(0, revealed);
            // Phần chưa reveal: random chars
            for (var i = revealed; i < total; i++) {
                if (target[i] === ' ') {
                    display += ' ';
                } else {
                    display += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            el.textContent = display;
            frame++;
            if (frame % revealEvery === 0) revealed++;
            setTimeout(scrambleStep, intervalMs);
        }
        // Bắt đầu sau khi typewriter xong ~
        setTimeout(scrambleStep, 1200);
    })();

    // FIX 3: click ra ngoài → vỡ mảnh
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            cancelAnimationFrame(animId);
            shatterAndRemove('glitch-overlay', animId, function() {
                afterFirstPopup();
            });
        }
    });

    // Bấm nút OK → vỡ mảnh
    document.getElementById('g-btn-ok').addEventListener('click', function() {
        cancelAnimationFrame(animId);
        shatterAndRemove('glitch-overlay', animId, function() {
            afterFirstPopup();
        });
    });
}

function afterFirstPopup() {
    $('#chaffle-title').css('visibility', 'visible');
    $('#wrapper, header, #yes, #no, .inner-width, center, p, span[id^="a"], #chaffle-title, #slider, footer, #demo-1, #demo-2, #demo-3').show(200);
    $('#demo-1, #demo-2, #demo-3').css('opacity', '1');
    if (typeof window.startTextEffect === 'function') {
        window.startTextEffect();
    }
    setTimeout(function() {
        if (typeof playMusic === 'function') playMusic();
    }, 800);
}

// switch button position
function switchButton() {
    var audio = new Audio('https://manhhung1606.github.io/manhhung/Cau-noi-ao-that-day-kha-banh-www_tiengdong_com.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}

function moveButton() {
    var audio = new Audio('https://manhhung1606.github.io/manhhung/Cau-noi-ao-that-day-kha-banh-www_tiengdong_com.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.3;
    $('#no').css("left", x + 'px');
    $('#no').css("top", y + 'px');
}

init();

var n = 0;
$('#no').mousemove(function() {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width >= 900) switchButton();
})

function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

$('#yes').click(function() {
    var audio = new Audio('https://hungdeptrai.com');
    audio.play();
    showGlitchPopup2();
})

function showGlitchPopup2() {
    var style2 = document.getElementById('glitch-style2');
    if (!style2) {
        style2 = document.createElement('style');
        style2.id = 'glitch-style2';
        style2.textContent = `
            #g2-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                background: rgba(0,0,40,0.7);
            }
            #g2-wrap {
                position: relative;
                border-radius: 8px;
                width: 100%;
                max-width: 560px;
                animation: gPopIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
            }
            #g2-canvas {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                border-radius: 8px;
                pointer-events: none;
                z-index: 20;
            }
            #g2-box {
                position: relative;
                width: 100%;
                background: rgba(5, 5, 30, 0.92);
                border-radius: 6px;
                padding: 32px 24px 28px;
                text-align: center;
                box-shadow: inset 0 0 40px rgba(0,50,150,0.15);
            }
            #g2-box::before {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 6px;
                background: repeating-linear-gradient(
                    0deg, transparent, transparent 2px,
                    rgba(0,200,255,0.03) 2px, rgba(0,200,255,0.03) 4px
                );
                pointer-events: none;
                z-index: 2;
            }
            /* FIX 2: ảnh hiển thị trong popup2 */
            .g2-avatar-wrap {
                position: relative;
                width: 100%;
                max-width: 320px;
                aspect-ratio: 1 / 1;
                margin: 0 auto 20px;
                z-index: 3;
                overflow: hidden;
                border-radius: 3px;
            }
            .g2-avatar-wrap img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                border-radius: 3px;
            }
            .g2-glitch-r, .g2-glitch-b {
                position: absolute;
                inset: 0;
                border-radius: 3px;
                mix-blend-mode: screen;
                opacity: 0;
            }
            .g2-glitch-r { background-color: rgba(255,0,60,0.5); animation: gGlitchR 3s infinite; }
            .g2-glitch-b { background-color: rgba(0,200,255,0.5); animation: gGlitchB 3s infinite; }
            .g2-title {
                position: relative;
                z-index: 3;
                font-family: 'Orbitron', sans-serif;
                font-size: 20px;
                font-weight: 900;
                color: #fff;
                text-shadow: 0 0 8px rgba(0,200,255,0.8), 0 0 20px rgba(0,150,255,0.4);
                animation: gTextGlitch 4s infinite;
                margin-bottom: 20px;
                word-break: break-word;
                line-height: 1.4;
            }
            .g2-input {
                position: relative;
                z-index: 3;
                width: 100%;
                padding: 12px 16px;
                font-family: 'Share Tech Mono', monospace;
                font-size: 14px;
                color: #0cf;
                background: rgba(0,10,40,0.8);
                border: 1.5px solid #0af;
                border-radius: 3px;
                outline: none;
                margin-bottom: 20px;
                box-sizing: border-box;
            }
            .g2-input::placeholder { color: rgba(0,200,255,0.4); }
            .g2-input:focus { border-color: #0ff; box-shadow: 0 0 10px rgba(0,255,255,0.3); }
            .g2-btn {
                position: relative;
                z-index: 3;
                display: inline-block;
                padding: 12px 38px;
                font-family: 'Orbitron', sans-serif;
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 2px;
                color: #fff;
                background: transparent;
                border: 1.5px solid #0af;
                border-radius: 2px;
                cursor: pointer;
                text-transform: uppercase;
                transition: color 0.2s;
                width: 100%;
            }
            .g2-btn:hover {
                color: #0df;
                box-shadow: 0 0 15px rgba(0,170,255,0.5), inset 0 0 10px rgba(0,150,255,0.1);
            }
        `;
        document.head.appendChild(style2);
    }

    var overlay2 = document.createElement('div');
    overlay2.id = 'g2-overlay';
    // FIX 2: thêm ảnh vào popup2
    overlay2.innerHTML = `
        <div id="g2-wrap">
            <canvas id="g2-canvas"></canvas>
            <div id="g2-box">
                <div class="g2-avatar-wrap">
                    <img src="https://manhhung1606.github.io/manhhung/Save = Follow♡「Hương 」♡.jpeg"
                         onerror="this.style.background='linear-gradient(135deg,#1a1a4e,#0d0d2b)'"
                         alt="Mạnh Hùng">
                    <div class="g2-glitch-r"></div>
                    <div class="g2-glitch-b"></div>
                </div>
                <div class="g2-title">${CONFIG.question}</div>
                <input type="text" class="g2-input" id="txtReason" onmousemove="textGenerate()" placeholder=" Viết gì cũng được ">
                <button class="g2-btn" id="g2-btn-send">${CONFIG.btnReply}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay2);

    // Neon border
    var wrap2 = document.getElementById('g2-wrap');
    var canvas2 = document.getElementById('g2-canvas');
    var ctx2 = canvas2.getContext('2d');
    var angle2 = 0, animId2;

    function drawBorderPath2(w, h, r) {
        var p = new Path2D();
        p.moveTo(r,0); p.lineTo(w-r,0); p.arcTo(w,0,w,r,r);
        p.lineTo(w,h-r); p.arcTo(w,h,w-r,h,r);
        p.lineTo(r,h); p.arcTo(0,h,0,h-r,r);
        p.lineTo(0,r); p.arcTo(0,0,r,0,r);
        p.closePath();
        return p;
    }
    function drawNeon2() {
        var w = wrap2.offsetWidth, h = wrap2.offsetHeight;
        canvas2.width = w; canvas2.height = h;
        var r=8, perimeter=2*(w+h), tailLen=perimeter*0.2;
        var pos=(angle2/360)*perimeter;
        var path=drawBorderPath2(w,h,r);
        ctx2.clearRect(0,0,w,h);
        ctx2.save(); ctx2.strokeStyle='rgba(0,200,255,0.2)'; ctx2.lineWidth=2; ctx2.stroke(path); ctx2.restore();
        var hue=(angle2*3)%360;
        ctx2.save();
        ctx2.strokeStyle='hsl('+hue+',100%,65%)';
        ctx2.lineWidth=3;
        ctx2.shadowColor='hsl('+hue+',100%,70%)';
        ctx2.shadowBlur=18;
        ctx2.setLineDash([tailLen,perimeter-tailLen]);
        ctx2.lineDashOffset=-pos;
        ctx2.stroke(path);
        ctx2.restore();
        angle2=(angle2+1.5)%360;
        animId2=requestAnimationFrame(drawNeon2);
    }
    drawNeon2();

    // Click ra ngoài → chỉ vỡ mảnh đóng lại, KHÔNG mở popup sau
    overlay2.addEventListener('click', function(e) {
        if (e.target === overlay2) {
            cancelAnimationFrame(animId2);
            shatterAndRemove('g2-overlay', animId2, null);
        }
    });

    // Bấm Send → vỡ mảnh rồi mới mở popup3
    document.getElementById('g2-btn-send').addEventListener('click', function() {
        cancelAnimationFrame(animId2);
        shatterAndRemove('g2-overlay', animId2, function() {
            showGlitchPopup3();
        });
    });
}

function showGlitchPopup3() {
    var style3 = document.getElementById('glitch-style3');
    if (!style3) {
        style3 = document.createElement('style');
        style3.id = 'glitch-style3';
        style3.textContent = `
            #g3-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                background: rgba(0,0,40,0.7);
            }
            #g3-wrap {
                position: relative;
                border-radius: 8px;
                width: 100%;
                max-width: 560px;
                animation: gPopIn 0.6s cubic-bezier(0.175,0.885,0.32,1.275) both;
            }
            #g3-canvas {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                border-radius: 8px;
                pointer-events: none;
                z-index: 20;
            }
            #g3-box {
                position: relative;
                width: 100%;
                background: rgba(5,5,30,0.92);
                border-radius: 6px;
                padding: 32px 24px 28px;
                text-align: center;
                box-shadow: inset 0 0 40px rgba(0,50,150,0.15);
            }
            .g3-avatar-wrap {
                position: relative;
                width: 100%;
                max-width: 320px;
                aspect-ratio: 1 / 1;
                margin: 0 auto 20px;
                z-index: 3;
                overflow: hidden;
                border-radius: 3px;
            }
            .g3-avatar-wrap img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                border-radius: 3px;
            }
            .g3-glitch-r, .g3-glitch-b {
                position: absolute;
                inset: 0;
                border-radius: 3px;
                mix-blend-mode: screen;
                opacity: 0;
            }
            .g3-glitch-r { background-color: rgba(255,0,60,0.5); animation: gGlitchR 3s infinite; }
            .g3-glitch-b { background-color: rgba(0,200,255,0.5); animation: gGlitchB 3s infinite; }
            .g3-emoji {
                font-size: 36px;
                margin-bottom: 12px;
                z-index: 3;
                position: relative;
            }
            .g3-msg {
                font-family: 'Share Tech Mono', monospace;
                font-size: 20px;
                color: #0cf;
                margin-bottom: 24px;
                z-index: 3;
                position: relative;
                word-break: break-word;
                line-height: 1.5;
            }
            .g3-btn {
                position: relative;
                z-index: 3;
                display: inline-block;
                padding: 12px 38px;
                font-family: 'Orbitron', sans-serif;
                font-size: 20px;
                font-weight: 700;
                letter-spacing: 2px;
                color: #fff;
                background: transparent;
                border: 1.5px solid #0af;
                border-radius: 2px;
                cursor: pointer;
                text-transform: uppercase;
                transition: color 0.2s;
                width: 100%;
            }
            .g3-btn:hover {
                color: #0df;
                box-shadow: 0 0 15px rgba(0,170,255,0.5), inset 0 0 10px rgba(0,150,255,0.1);
            }
        `;
        document.head.appendChild(style3);
    }

    var overlay3 = document.createElement('div');
    overlay3.id = 'g3-overlay';
    overlay3.innerHTML = `
        <div id="g3-wrap">
            <canvas id="g3-canvas"></canvas>
            <div id="g3-box">
                <div class="g3-avatar-wrap">
                    <img src="https://manhhung1606.github.io/manhhung/1777441906182.png"
                         onerror="this.style.background='linear-gradient(135deg,#1a1a4e,#0d0d2b)'"
                         alt="Popup 3 Image">
                    <div class="g3-glitch-r"></div>
                    <div class="g3-glitch-b"></div>
                </div>
                <div class="g3-emoji">${CONFIG.mess}</div>
                <div class="g3-msg">${CONFIG.messDesc}</div>
                <button class="g3-btn" id="g3-btn-ok">${CONFIG.btnAccept}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay3);

    var wrap3 = document.getElementById('g3-wrap');
    var canvas3 = document.getElementById('g3-canvas');
    var ctx3 = canvas3.getContext('2d');
    var angle3 = 0, animId3;

    function drawBP3(w,h,r){
        var p=new Path2D();
        p.moveTo(r,0);p.lineTo(w-r,0);p.arcTo(w,0,w,r,r);
        p.lineTo(w,h-r);p.arcTo(w,h,w-r,h,r);
        p.lineTo(r,h);p.arcTo(0,h,0,h-r,r);
        p.lineTo(0,r);p.arcTo(0,0,r,0,r);
        p.closePath();return p;
    }
    function drawN3(){
        var w=wrap3.offsetWidth,h=wrap3.offsetHeight;
        canvas3.width=w;canvas3.height=h;
        var r=8,per=2*(w+h),tl=per*0.2,pos=(angle3/360)*per,path=drawBP3(w,h,r);
        ctx3.clearRect(0,0,w,h);
        ctx3.save();ctx3.strokeStyle='rgba(0,200,255,0.2)';ctx3.lineWidth=2;ctx3.stroke(path);ctx3.restore();
        var hue=(angle3*3)%360;
        ctx3.save();ctx3.strokeStyle='hsl('+hue+',100%,65%)';ctx3.lineWidth=3;
        ctx3.shadowColor='hsl('+hue+',100%,70%)';ctx3.shadowBlur=18;
        ctx3.setLineDash([tl,per-tl]);ctx3.lineDashOffset=-pos;ctx3.stroke(path);ctx3.restore();
        angle3=(angle3+1.5)%360;animId3=requestAnimationFrame(drawN3);
    }
    drawN3();

    // FIX 3: click ra ngoài → vỡ mảnh
    overlay3.addEventListener('click', function(e) {
        if (e.target === overlay3) {
            cancelAnimationFrame(animId3);
            shatterAndRemove('g3-overlay', animId3, function() {
                if (CONFIG.messLink) window.location = CONFIG.messLink;
            });
        }
    });

    document.getElementById('g3-btn-ok').addEventListener('click', function() {
        cancelAnimationFrame(animId3);
        shatterAndRemove('g3-overlay', animId3, function() {
            if (CONFIG.messLink) window.location = CONFIG.messLink;
        });
    });
}
