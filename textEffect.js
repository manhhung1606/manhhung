const lines = [
    "Tháng năm vẫn vậy",
    "Nhưng con người thì đã đổi thay",
    "Chỉ có những kỉ niệm là còn mãi..."
];

// Tạo lá vàng
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.innerHTML = '❤️';
    leaf.style.top = Math.random() * 100 + 'vh';
    leaf.style.fontSize = (Math.random() * 20 + 10) + 'px';
    leaf.style.animationDuration = (Math.random() * 3 + 2) + 's';
    leaf.style.opacity = Math.random() * 0.7 + 0.3;
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 5000);
}

// Hiện từng chữ cái bay từ phải qua trái
function showLine(lineIndex, callback) {
    if (lineIndex >= lines.length) {
        if (callback) callback();
        return;
    }

    const demoIds = ['demo-1', 'demo-2', 'demo-3'];
    const el = document.getElementById(demoIds[lineIndex]);
    el.innerHTML = '';
    el.style.opacity = 1;

    const text = lines[lineIndex];
    let i = 0;

    const interval = setInterval(() => {
        if (i >= text.length) {
            clearInterval(interval);
            setTimeout(() => showLine(lineIndex + 1, callback), 800);
            return;
        }

        const span = document.createElement('span');
        span.classList.add('fly-char');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        el.appendChild(span);
        setTimeout(() => span.classList.add('landed'), 50);
        i++;
    }, 80);
}

// Fade out tất cả các dòng
function fadeOutAll(callback) {
    const demoIds = ['demo-1', 'demo-2', 'demo-3'];
    demoIds.forEach(id => {
        const el = document.getElementById(id);
        el.style.transition = 'opacity 1.5s ease';
        el.style.opacity = 0;
    });
    setTimeout(callback, 1800);
}

// Vòng lặp chính
function startLoop() {
    showLine(0, function() {
        // Sau khi hiện hết 3 dòng, đợi 2 giây rồi fade out
        setTimeout(() => {
            fadeOutAll(() => {
                // Đợi thêm 1 giây rồi lặp lại
                setTimeout(startLoop, 1000);
            });
        }, 2000);
    });
}

// Khởi động
window.addEventListener('load', function () {
    setInterval(createLeaf, 400);
    setTimeout(startLoop, 1000);
});
