const lines = [
    "Tháng năm vẫn vậy...",
    "Nhưng con người thì đã đổi thay...",
    "Chỉ có những kỉ niệm là còn mãi..."
];

// Tạo lá vàng (giữ nguyên)
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

// Hàm showLine mới - Pre-render tất cả span trước để lock layout
function showLine(lineIndex, callback) {
    if (lineIndex >= lines.length) {
        if (callback) callback();
        return;
    }

    const demoIds = ['demo-1', 'demo-2', 'demo-3'];
    const el = document.getElementById(demoIds[lineIndex]);
    
    el.innerHTML = '';                    // xóa trước
    el.style.opacity = 1;

    const text = lines[lineIndex];
    
    // Bước 1: Tạo tất cả span trước (ẩn hoàn toàn)
    for (let char of text) {
        const span = document.createElement('span');
        span.classList.add('fly-char');
        span.textContent = char === ' ' ? '\u00A0' : char;
        el.appendChild(span);
    }

    // Bước 2: Animate lần lượt (sau khi layout đã ổn định)
    const spans = el.querySelectorAll('.fly-char');
    spans.forEach((span, i) => {
        setTimeout(() => {
            span.classList.add('landed');
        }, 50 + i * 12);   // stagger mượt hơn
    });

    // Sau khi hiện xong dòng này, chuyển sang dòng sau
    setTimeout(() => {
        showLine(lineIndex + 1, callback);
    }, 800 + text.length * 12);   // delay dựa trên độ dài dòng
}

// Fade out giữ nguyên
function fadeOutAll(callback) {
    const demoIds = ['demo-1', 'demo-2', 'demo-3'];
    demoIds.forEach(id => {
        const el = document.getElementById(id);
        el.style.transition = 'opacity 1.5s ease';
        el.style.opacity = 0;
    });
    setTimeout(callback, 1800);
}

// Vòng lặp chính (giữ nguyên)
function startLoop() {
    showLine(0, function() {
        setTimeout(() => {
            fadeOutAll(() => {
                setTimeout(startLoop, 1000);
            });
        }, 2500);
    });
}

// Khởi động
window.addEventListener('load', function () {
    setInterval(createLeaf, 400);
    setTimeout(startLoop, 1000);
});
