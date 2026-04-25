const lines = [
    "Tháng năm vẫn vậy...",
    "Nhưng con người thì đã đổi thay...",
    "Chỉ có những kỉ niệm là còn mãi..."
];

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
const demoIds = ['demo-1', 'demo-2', 'demo-3'];

function randomChar() {
    return chars[Math.floor(Math.random() * chars.length)];
}

function chaffleLine(lineIndex, callback) {
    const el = document.getElementById(demoIds[lineIndex]);
    const text = lines[lineIndex];
    let iteration = 0;
    const maxIteration = text.length * 5;

    // Reset opacity
    el.style.transition = 'none';
    el.style.opacity = 1;

    const interval = setInterval(() => {
        el.textContent = text
            .split("")
            .map((char, index) => {
                if (index < Math.floor(iteration / 5)) return char;
                if (char === ' ' || char === '.') return char;
                return randomChar();
            })
            .join("");

        if (iteration >= maxIteration) {
            clearInterval(interval);
            el.textContent = text;

            // Đợi 1.5 giây rồi mờ dần
            setTimeout(() => {
                el.style.transition = 'opacity 1s ease';
                el.style.opacity = 0;
                setTimeout(() => {
                    el.textContent = '';
                    if (callback) callback();
                }, 1000);
            }, 1500);
        }

        iteration++;
    }, 30);
}

function startLoop() {
    // Reset tất cả
    demoIds.forEach(id => {
        const el = document.getElementById(id);
        el.textContent = '';
        el.style.opacity = 0;
    });

    // Hiện lần lượt từng dòng
    chaffleLine(0, function() {
        chaffleLine(1, function() {
            chaffleLine(2, function() {
                // Lặp lại sau 1 giây
                setTimeout(startLoop, 1000);
            });
        });
    });
}

window.addEventListener('load', function() {
    setTimeout(startLoop, 1000);
});
// Tạo trái tim rơi
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        top: -30px;
        left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 20 + 10}px;
        opacity: ${Math.random() * 0.7 + 0.3};
        animation: heartFall ${Math.random() * 3 + 3}s linear forwards;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 500);
