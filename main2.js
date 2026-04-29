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

function firstQuestion(){
    $('body').css('overflow', 'hidden');
    $('#wrapper, header, #yes, #no, .inner-width, center, p, span[id^="a"], #chaffle-title, #slider, footer, #demo-1, #demo-2, #demo-3').hide();
    $('.leaf').remove();

    // ========== GLITCH POPUP ==========
    // Tạo CSS
    var style = document.createElement('style');
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

        .g-avatar-wrap {
            position: relative;
            width: 100%;
            max-width: 500px;
            height: 0;
            padding-bottom: min(500px, 100%);
            margin: 0 auto 22px;
            z-index: 3;
        }
        .g-avatar-wrap img {
            position: absolute;
            inset: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            border-radius: 3px;
            display: block;
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

        .g-greeting {
            position: relative;
            z-index: 3;
            font-family: 'Orbitron', sans-serif;
            font-size: 18px;
            font-weight: 900;
            color: #fff;
            text-shadow: 0 0 8px rgba(0,200,255,0.8), 0 0 20px rgba(0,150,255,0.4);
            animation: gTextGlitch 4s infinite;
            line-height: 1.4;
            margin-bottom: 10px;
            min-height: 60px;
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
            font-size: 13px;
            color: #5cf;
            letter-spacing: 1px;
            margin-bottom: 24px;
            opacity: 0.85;
            animation: gBlink 2s steps(1) infinite;
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

        @keyframes gGlitchOut {
            0%   { opacity:1; transform:scale(1) translate(0,0); filter:none; }
            20%  { opacity:1; transform:scale(1.03) translate(-4px,0) skewX(-4deg); filter:hue-rotate(90deg) brightness(2); }
            40%  { opacity:0.6; transform:scale(0.97) translate(4px,0) skewX(4deg); filter:hue-rotate(180deg); }
            60%  { opacity:0.3; transform:scale(1.01) translate(-2px,0); filter:hue-rotate(270deg) brightness(1.5); }
            100% { opacity:0; transform:scale(0.85) translate(0,10px); filter:brightness(0); }
        }
    `;
    document.head.appendChild(style);

    // Tạo HTML popup
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
                <div class="g-sub">${CONFIG.introDesc}</div>
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

    // Bấm nút OK
    document.getElementById('g-btn-ok').addEventListener('click', function() {
        var w = document.getElementById('glitch-wrap');
        cancelAnimationFrame(animId);
        w.style.animation = 'gGlitchOut 0.5s ease forwards';
        setTimeout(function() {
            document.getElementById('glitch-overlay').remove();

            // Callback giống Swal.fire().then()
            $('#chaffle-title').css('visibility', 'visible');
            $('#wrapper, header, #yes, #no, .inner-width, center, p, span[id^="a"], #chaffle-title, #slider, footer, #demo-1, #demo-2, #demo-3').show(200);
            $('#demo-1, #demo-2, #demo-3').css('opacity', '1');
            if (typeof window.startTextEffect === 'function') {
                window.startTextEffect();
            }
            setTimeout(function() {
                if (typeof playMusic === 'function') playMusic();
            }, 800);
        }, 520);
    });
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
            .g2-title {
                position: relative;
                z-index: 3;
                font-family: 'Orbitron', sans-serif;
                font-size: 22px;
                font-weight: 900;
                color: #fff;
                text-shadow: 0 0 8px rgba(0,200,255,0.8), 0 0 20px rgba(0,150,255,0.4);
                animation: gTextGlitch 4s infinite;
                margin-bottom: 20px;
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
    overlay2.innerHTML = `
        <div id="g2-wrap">
            <canvas id="g2-canvas"></canvas>
            <div id="g2-box">
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

    // Bấm Send
    document.getElementById('g2-btn-send').addEventListener('click', function() {
        cancelAnimationFrame(animId2);
        var w2 = document.getElementById('g2-wrap');
        w2.style.animation = 'gGlitchOut 0.5s ease forwards';
        setTimeout(function() {
            document.getElementById('g2-overlay').remove();
            // Popup xác nhận cuối
            showGlitchPopup3();
        }, 520);
    });
}

function showGlitchPopup3() {
    var overlay3 = document.createElement('div');
    overlay3.id = 'g3-overlay';
    overlay3.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,40,0.7);';
    overlay3.innerHTML = `
        <div id="g3-wrap" style="position:relative;border-radius:8px;width:100%;max-width:560px;animation:gPopIn 0.6s cubic-bezier(0.175,0.885,0.32,1.275) both;">
            <canvas id="g3-canvas" style="position:absolute;inset:0;width:100%;height:100%;border-radius:8px;pointer-events:none;z-index:20;"></canvas>
            <div id="g3-box" style="position:relative;width:100%;background:rgba(5,5,30,0.92);border-radius:6px;padding:32px 24px 28px;text-align:center;box-shadow:inset 0 0 40px rgba(0,50,150,0.15);">
                <div style="font-family:'Orbitron',sans-serif;font-size:36px;margin-bottom:12px;z-index:3;position:relative;">${CONFIG.mess}</div>
                <div style="font-family:'Share Tech Mono',monospace;font-size:16px;color:#0cf;margin-bottom:24px;z-index:3;position:relative;">${CONFIG.messDesc}</div>
                <button class="g2-btn" id="g3-btn-ok" style="width:100%;">${CONFIG.btnAccept}</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay3);

    var wrap3=document.getElementById('g3-wrap');
    var canvas3=document.getElementById('g3-canvas');
    var ctx3=canvas3.getContext('2d');
    var angle3=0, animId3;
    function drawBP3(w,h,r){var p=new Path2D();p.moveTo(r,0);p.lineTo(w-r,0);p.arcTo(w,0,w,r,r);p.lineTo(w,h-r);p.arcTo(w,h,w-r,h,r);p.lineTo(r,h);p.arcTo(0,h,0,h-r,r);p.lineTo(0,r);p.arcTo(0,0,r,0,r);p.closePath();return p;}
    function drawN3(){var w=wrap3.offsetWidth,h=wrap3.offsetHeight;canvas3.width=w;canvas3.height=h;var r=8,per=2*(w+h),tl=per*0.2,pos=(angle3/360)*per,path=drawBP3(w,h,r);ctx3.clearRect(0,0,w,h);ctx3.save();ctx3.strokeStyle='rgba(0,200,255,0.2)';ctx3.lineWidth=2;ctx3.stroke(path);ctx3.restore();var hue=(angle3*3)%360;ctx3.save();ctx3.strokeStyle='hsl('+hue+',100%,65%)';ctx3.lineWidth=3;ctx3.shadowColor='hsl('+hue+',100%,70%)';ctx3.shadowBlur=18;ctx3.setLineDash([tl,per-tl]);ctx3.lineDashOffset=-pos;ctx3.stroke(path);ctx3.restore();angle3=(angle3+1.5)%360;animId3=requestAnimationFrame(drawN3);}
    drawN3();

    document.getElementById('g3-btn-ok').addEventListener('click', function() {
        cancelAnimationFrame(animId3);
        document.getElementById('g3-wrap').style.animation = 'gGlitchOut 0.5s ease forwards';
        setTimeout(function() {
            document.getElementById('g3-overlay').remove();
            if (CONFIG.messLink) window.location = CONFIG.messLink;
        }, 520);
    });
}
