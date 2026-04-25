const lines = [
    "Tháng năm vẫn vậy...",
    "Nhưng con người thì đã đổi thay...",
    "Chỉ có những kỉ niệm là còn mãi..."
];

// Tạo lá vàng
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.innerHTML = '🍂';
    leaf.style.top = Math.random() * 100 + 'vh';
    leaf.style.fontSize = (Math.random() * 20 + 10) + 'px';
    leaf.style.animationDuration = (Math.random() * 3 + 2) + 's';
    leaf.style.opacity = Math.random() * 0.7 + 0.3;
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 5000);
}

// Hiện từng chữ cái bay từ phải qua trái
function showLine(lineIndex) {
    if (lineIndex >= lines.length) return;

    const demoIds = ['demo-1', 'demo-2', 'demo-3'];
    const el = document.getElementById(demoIds[lineIndex]);
    el.innerHTML = '';

    const text = lines[lineIndex];
    let i = 0;

    const interval = setInterval(() => {
        if (i >= text.length) {
            clearInterval(interval);
            // Hiện dòng tiếp theo sau 1 giây
            setTimeout(() => showLine(lineIndex + 1), 1000);
            return;
        }

        const span = document.createElement('span');
        span.classList.add('fly-char');
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        el.appendChild(span);

        // Trigger animation
        setTimeout(() => span.classList.add('landed'), 50);

        i++;
    }, 80);
}

// Khởi động
window.addEventListener('load', function () {
    // Tạo lá bay liên tục
    setInterval(createLeaf, 400);

    // Ẩn hết text trước
    ['demo-1', 'demo-2', 'demo-3'].forEach(id => {
        document.getElementById(id).innerHTML = '';
    });

    // Bắt đầu hiện chữ sau 1 giây
    setTimeout(() => showLine(0), 1000);
});
