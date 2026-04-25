// Chaffle effect cho dòng MẠNH.HÙNG☆☆☆16-06
const targetText = "MẠNH.HÙNG☆☆☆16-06";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

function chaffleText(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let iteration = 0;
    const maxIteration = targetText.length * 5;

    const interval = setInterval(() => {
        el.textContent = targetText
            .split("")
            .map((char, index) => {
                if (index < Math.floor(iteration / 5)) {
                    return targetText[index]; // hiện chữ đúng dần dần
                }
                if (char === ' ' || char === '.' || char === '☆') return char;
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iteration >= maxIteration) {
            clearInterval(interval);
            el.textContent = targetText;
            // Lặp lại sau 3 giây
            setTimeout(() => chaffleText(elementId), 3000);
        }

        iteration++;
    }, 30);
}

window.addEventListener('load', function () {
    // Tạo element mới thay thế hungdeptrai.js
    const existing = document.querySelector('div span[id^="a"]')?.parentElement?.parentElement;
    
    const div = document.createElement('div');
    div.id = 'chaffle-title';
    div.style.cssText = `
        font-family: 'Jura', sans-serif;
        font-size: 37px;
        text-align: center;
        color: #FAFAFA;
        text-shadow: 0 0 0.5em cyan, 0 0 0.5em cyan;
        padding: 10px;
        letter-spacing: 2px;
    `;
    
    // Chèn vào đầu body
    document.body.insertBefore(div, document.body.firstChild);
    
    chaffleText('chaffle-title');
});
