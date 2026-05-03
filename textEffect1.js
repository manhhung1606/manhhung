var lines = [
    "Tháng năm vẫn vậy...",
    "Nhưng con người thì đã đổi thay...",
    "Chỉ có những kỉ niệm là còn mãi..."
];

var leafInterval = null;
var loopRunning = false;

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

function flyLineLeft(elId, callback) {
    var el = document.getElementById(elId);
    if (!el) { if (callback) callback(); return; }
    var spans = el.querySelectorAll('.fly-char');
    if (!spans.length) { if (callback) callback(); return; }

    // Tạo "làn gió" — delay tăng dần nhưng có dao động nhẹ để tự nhiên hơn
    spans.forEach(function(span, i) {
        // Mỗi ký tự delay lệch nhau một chút + thêm jitter nhỏ
        var baseDelay = i * 35;
        var jitter = Math.random() * 20; // dao động 0-20ms
        var totalDelay = baseDelay + jitter;

        setTimeout(function(s) {
            // Góc xoay nhỏ, chiều Y lắc lư mềm
            var rot1 = (Math.random() * 8  - 4 ).toFixed(1) + 'deg';
            var rot2 = (Math.random() * 12 - 6 ).toFixed(1) + 'deg';
            var rot3 = (Math.random() * 10 - 5 ).toFixed(1) + 'deg';
            var rot4 = (Math.random() * 14 - 7 ).toFixed(1) + 'deg';

            // Y lắc lên xuống nhẹ, biên độ nhỏ — giống gió thổi
            var y1 = (Math.random() * 12 - 6 ).toFixed(1) + 'px';
            var y2 = (Math.random() * 16 - 8 ).toFixed(1) + 'px';
            var y3 = (Math.random() * 14 - 7 ).toFixed(1) + 'px';
            var y4 = (Math.random() * 18 - 9 ).toFixed(1) + 'px';

            // Thời gian bay mỗi ký tự hơi khác nhau — không đều nhau trông mượt hơn
            var dur = (1.3 + Math.random() * 0.6).toFixed(2) + 's';

            s.style.setProperty('--fly-rot1', rot1);
            s.style.setProperty('--fly-rot2', rot2);
            s.style.setProperty('--fly-rot3', rot3);
            s.style.setProperty('--fly-rot4', rot4);
            s.style.setProperty('--fly-y1', y1);
            s.style.setProperty('--fly-y2', y2);
            s.style.setProperty('--fly-y3', y3);
            s.style.setProperty('--fly-y4', y4);
            s.style.setProperty('--fly-duration', dur);
            s.style.setProperty('--fly-delay', '0s');

            s.classList.remove('landed');
            s.classList.add('fly-left');
        }, totalDelay, span);
    });

    // Chờ ký tự cuối bay xong
    var flyDuration = (spans.length - 1) * 35 + 20 + 1900;
    setTimeout(function() {
        if (callback) callback();
    }, flyDuration);
}

function clearLine(elId) {
    var el = document.getElementById(elId);
    if (el) el.innerHTML = '';
}

function runLoop() {
    if (!loopRunning) return;

    renderLine('demo-1', lines[0], function() {
        if (!loopRunning) return;
        setTimeout(function() {
            if (!loopRunning) return;

            var d1 = false, d2 = false;
            function after12() {
                if (!d1 || !d2) return;
                clearLine('demo-1');
                if (!loopRunning) return;
                setTimeout(function() {
                    if (!loopRunning) return;

                    var d3 = false, d4 = false;
                    function after23() {
                        if (!d3 || !d4) return;
                        clearLine('demo-2');
                        if (!loopRunning) return;
                        setTimeout(function() {
                            if (!loopRunning) return;

                            flyLineLeft('demo-3', function() {
                                clearLine('demo-3');
                                if (!loopRunning) return;
                                setTimeout(function() {
                                    if (loopRunning) runLoop();
                                }, 1200);
                            });
                        }, 2000);
                    }

                    flyLineLeft('demo-2', function() { d3 = true; after23(); });
                    renderLine('demo-3', lines[2], function() { d4 = true; after23(); });

                }, 2000);
            }

            flyLineLeft('demo-1', function() { d1 = true; after12(); });
            renderLine('demo-2', lines[1], function() { d2 = true; after12(); });

        }, 2000);
    });
}

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

window.addEventListener('load', function() {
    ['demo-1', 'demo-2', 'demo-3'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.opacity = '0';
    });
});
