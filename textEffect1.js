var lines = [
    "Tháng năm vẫn vậy...",
    "Nhưng con người thì đã đổi thay...",
    "Chỉ có những kỉ niệm là còn mãi..."
];

var leafInterval = null;
var loopRunning = false;

// Tạo lá tim rơi
function createLeaf() {
    var leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.innerHTML = '❤️';
    leaf.style.top = Math.random() * 100 + 'vh';
    leaf.style.fontSize = (Math.random() * 20 + 10) + 'px';
    leaf.style.animationDuration = (Math.random() * 3 + 2) + 's';
    leaf.style.opacity = Math.random() * 0.7 + 0.3;
    document.body.appendChild(leaf);
    setTimeout(function() { leaf.remove(); }, 6000);
}

// Render chữ bay vào từ phải, gọi callback khi xong
function renderLine(elId, text, callback) {
    var el = document.getElementById(elId);
    if (!el) { if (callback) callback(); return; }
    el.innerHTML = '';
    el.style.opacity = 1;

    for (var i = 0; i < text.length; i++) {
        var span = document.createElement('span');
        span.classList.add('fly-char');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        el.appendChild(span);
    }

    var spans = el.querySelectorAll('.fly-char');
    spans.forEach(function(span, i) {
        setTimeout(function(s) {
            s.classList.add('landed');
        }, 40 + i * 70, span);
    });

    var landDuration = 40 + (text.length - 1) * 70 + 750;
    setTimeout(function() {
        if (callback) callback();
    }, landDuration);
}

// Từng ký tự bay sang trái kiểu lá, gọi callback khi xong
function flyLineLeft(elId, callback) {
    var el = document.getElementById(elId);
    if (!el) { if (callback) callback(); return; }
    var spans = el.querySelectorAll('.fly-char');
    if (!spans.length) { if (callback) callback(); return; }

    spans.forEach(function(span, i) {
        setTimeout(function(s) {
            var rot1 = (Math.random() * 40 - 20).toFixed(1) + 'deg';
            var rot2 = (Math.random() * 40 - 20).toFixed(1) + 'deg';
            var rot3 = (Math.random() * 60 - 30).toFixed(1) + 'deg';
            var y1   = (Math.random() * 24 - 12).toFixed(1) + 'px';
            var y2   = (Math.random() * 24 - 12).toFixed(1) + 'px';
            var y3   = (Math.random() * 30 - 15).toFixed(1) + 'px';
            var dur  = (0.9 + Math.random() * 0.5).toFixed(2) + 's';

            s.style.setProperty('--fly-rot1', rot1);
            s.style.setProperty('--fly-rot2', rot2);
            s.style.setProperty('--fly-rot3', rot3);
            s.style.setProperty('--fly-y1', y1);
            s.style.setProperty('--fly-y2', y2);
            s.style.setProperty('--fly-y3', y3);
            s.style.setProperty('--fly-duration', dur);
            s.style.setProperty('--fly-delay', '0s');

            s.classList.remove('landed');
            s.classList.add('fly-left');
        }, i * 45, span);
    });

    var flyDuration = (spans.length - 1) * 45 + 1300;
    setTimeout(function() {
        if (callback) callback();
    }, flyDuration);
}

function clearLine(elId) {
    var el = document.getElementById(elId);
    if (el) el.innerHTML = '';
}

// Loop dùng callback thuần, không async/await
function runLoop() {
    if (!loopRunning) return;

    // Bước 1: dòng 1 bay vào
    renderLine('demo-1', lines[0], function() {
        if (!loopRunning) return;

        // Đứng yên 2s
        setTimeout(function() {
            if (!loopRunning) return;

            // Bước 2: dòng 1 bay trái + dòng 2 bay vào cùng lúc
            var done1 = false, done2 = false;
            function after12() {
                if (!done1 || !done2) return;
                clearLine('demo-1');
                if (!loopRunning) return;

                // Đứng yên 2s
                setTimeout(function() {
                    if (!loopRunning) return;

                    // Bước 3: dòng 2 bay trái + dòng 3 bay vào cùng lúc
                    var done3 = false, done4 = false;
                    function after23() {
                        if (!done3 || !done4) return;
                        clearLine('demo-2');
                        if (!loopRunning) return;

                        // Đứng yên 2s
                        setTimeout(function() {
                            if (!loopRunning) return;

                            // Bước 4: dòng 3 bay trái
                            flyLineLeft('demo-3', function() {
                                clearLine('demo-3');
                                if (!loopRunning) return;

                                // Nghỉ 1.2s rồi lặp lại
                                setTimeout(function() {
                                    if (loopRunning) runLoop();
                                }, 1200);
                            });
                        }, 2000);
                    }

                    flyLineLeft('demo-2', function() { done3 = true; after23(); });
                    renderLine('demo-3', lines[2], function() { done4 = true; after23(); });

                }, 2000);
            }

            flyLineLeft('demo-1', function() { done1 = true; after12(); });
            renderLine('demo-2', lines[1], function() { done2 = true; after12(); });

        }, 2000);
    });
}

// === Hàm để main.js gọi từ bên ngoài ===
window.startTextEffect = function() {
    ['demo-1', 'demo-2', 'demo-3'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) { el.innerHTML = ''; el.style.opacity = 1; }
    });

    if (leafInterval) clearInterval(leafInterval);
    leafInterval = setInterval(createLeaf, 400);

    loopRunning = true;
    runLoop();
};

window.stopTextEffect = function() {
    loopRunning = false;
    if (leafInterval) { clearInterval(leafInterval); leafInterval = null; }
    ['demo-1', 'demo-2', 'demo-3'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) { el.style.opacity = '0'; el.innerHTML = ''; }
    });
    document.querySelectorAll('.leaf').forEach(function(l) { l.remove(); });
};

// Ẩn hết lúc đầu
window.addEventListener('load', function() {
    ['demo-1', 'demo-2', 'demo-3'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.opacity = '0';
    });
});
