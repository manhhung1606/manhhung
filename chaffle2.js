// Chaffle effect + màu sắc cho dòng MẠNH.HÙNG☆☆☆16-06
const targetText = "MẠNH.HÙNG☆☆☆16-06";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

// Bảng màu như hungdeptrai.js cũ
const colorPalettes = [
    ["#FF0000","#FF2200","#FF4400","#FF6600","#FF8800","#FFaa00","#FFcc00","#FFee00","#FFff00","#FFee00","#FFcc00","#FFaa00","#FF8800","#FF6600","#FF4400","#FF2200"],
    ["#00FFFF","#00DDFF","#00BBFF","#0099FF","#0077FF","#0055FF","#0033FF","#0011FF","#0011FF","#0033FF","#0055FF","#0077FF","#0099FF","#00BBFF","#00DDFF","#00FFFF"],
    ["#FF0000","#FF4000","#FF8000","#FFC000","#FFFF00","#C0FF00","#80FF00","#40FF00","#00FF00","#00FF40","#00FF80","#00FFC0","#00FFFF","#00C0FF","#0080FF","#FF00FF"],
    ["#FF00FF","#EE00EE","#DD00DD","#CC00CC","#BB00BB","#AA00AA","#9900AA","#8800BB","#7700CC","#6600DD","#5500EE","#4400FF","#5500EE","#6600DD","#7700CC","#8800BB"],
];

let currentPalette = colorPalettes[0];
let colorOffset = 0;

setInterval(() => {
    currentPalette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}, 5000);

function updateColors(el) {
    const spans = el.querySelectorAll('span');
    spans.forEach((span, i) => {
        const colorIndex = (i + colorOffset) % currentPalette.length;
        span.style.color = currentPalette[colorIndex];
        span.style.textShadow = `0 0 8px ${currentPalette[colorIndex]}`;
    });
    colorOffset = (colorOffset + 1) % currentPalette.length;
}

function chaffleText(el) {
    let iteration = 0;
    const maxIteration = targetText.length * 5;
    let colorInterval;

    const interval = setInterval(() => {
        const displayed = targetText
            .split("")
            .map((char, index) => {
                if (index < Math.floor(iteration / 5)) return targetText[index];
                if (char === ' ' || char === '.' || char === '☆') return char;
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        el.innerHTML = displayed.split('').map(c => `<span>${c}</span>`).join('');
        updateColors(el);

        if (iteration >= maxIteration) {
            clearInterval(interval);
            el.innerHTML = targetText.split('').map(c => `<span>${c}</span>`).join('');
            colorInterval = setInterval(() => updateColors(el), 30);
            setTimeout(() => {
                clearInterval(colorInterval);
                chaffleText(el);
            }, 4000);
        }

        iteration++;
    }, 30);
}

window.addEventListener('load', function () {
    const div = document.createElement('div');
    div.id = 'chaffle-title';
    div.style.cssText = `
        font-family: 'Jura', sans-serif;
        font-size: 37px;
        text-align: center;
        padding: 10px;
        letter-spacing: 2px;
    `;
    document.body.insertBefore(div, document.body.firstChild);
    chaffleText(div);
});
