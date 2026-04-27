const lines = [
    "Tháng năm vẫn vậy...",
    "Nhưng con người thì đã đổi thay...",
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

// Show line: Pre-render trước → Animate lần lượt (giữ cảm giác từng chữ bay vào)
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

    // Bước 1: Tạo tất cả span trước (lock layout)
    for (let char of text) {
        const span = document.createElement('span');
        span.classList.add('fly-char');
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
    }

    // Bước 2: Animate từng chữ bay vào lần lượt
    const spans = el.querySelectorAll('.fly-char');
    spans.forEach((span, i) => {
        setTimeout(() => {
            span.classList.add('landed');
        }, 30 + i * 65);     // ← Điều chỉnh số này để thay đổi tốc độ bay (65 = khá chậm & đẹp)
    });

    // Chuyển sang dòng tiếp theo
    const nextDelay = 600 + text.length * 65;   // delay sau khi dòng hiện xong
    setTimeout(() => showLine(lineIndex + 1, callback), nextDelay);
}

// Fade out
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
        setTimeout(() => {
            fadeOutAll(() => {
                setTimeout(startLoop, 1000);
            });
        }, 2800);
    });
}

// Khởi động
window.addEventListener('load', function () {
    setInterval(createLeaf, 400);
    setTimeout(startLoop, 1000);
});
