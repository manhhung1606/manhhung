// ================= LIGHT NEON TITLE =================

const targetText = "MẠNH.HÙNG☆☆☆16-06";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const colorPalettes = [
    ["#FF0000","#FF2200","#FF4400","#FF6600","#FF8800","#FFaa00","#FFcc00","#FFee00","#FFff00","#FFee00","#FFcc00","#FFaa00","#FF8800","#FF6600","#FF4400","#FF2200"],
    ["#00FFFF","#00DDFF","#00BBFF","#0099FF","#0077FF","#0055FF","#0033FF","#0011FF","#0011FF","#0033FF","#0055FF","#0077FF","#0099FF","#00BBFF","#00DDFF","#00FFFF"],
    ["#FF0000","#FF4000","#FF8000","#FFC000","#FFFF00","#C0FF00","#80FF00","#40FF00","#00FF00","#00FF40","#00FF80","#00FFC0","#00FFFF","#00C0FF","#0080FF","#FF00FF"],
    ["#FF00FF","#EE00EE","#DD00DD","#CC00CC","#BB00BB","#AA00AA","#9900AA","#8800BB","#7700CC","#6600DD","#5500EE","#4400FF","#5500EE","#6600DD","#7700CC","#8800BB"],
];

let state = {
  el: null,
  currentText: targetText,
  currentPalette: colorPalettes[0],
  colorIndex: 0
};


// ================= CREATE TITLE =================
function createTitle() {
  let old = document.getElementById("neon-title");
  if (old) old.remove();

  const div = document.createElement("div");
  div.id = "neon-title";

  div.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;

    font-family: 'Jura', sans-serif;
    font-size: clamp(18px, 5vw, 38px);
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;

    white-space: nowrap;
    max-width: 95vw;
    overflow: hidden;

    pointer-events: none;
    user-select: none;
  `;

  document.body.appendChild(div);
  document.body.style.paddingTop = "90px";

  return div;
}


// ================= RANDOM TEXT =================
function randomizeText() {
  state.currentText = targetText
    .split("")
    .map((char) => {
      if (char === " " || char === "." || char === "-" || char === "☆") {
        return char;
      }
      return Math.random() > 0.5
        ? char
        : chars[Math.floor(Math.random() * chars.length)];
    })
    .join("");

  renderTitle();
}


// ================= CHANGE COLOR =================
function changePalette() {
  state.colorIndex = (state.colorIndex + 1) % colorPalettes.length;
  state.currentPalette = colorPalettes[state.colorIndex];
  renderTitle();
}


// ================= RENDER =================
function renderTitle() {
  const html = state.currentText
    .split("")
    .map((char, i) => {
      const color = state.currentPalette[i % state.currentPalette.length];

      return `
        <span style="
          display:inline-block;
          color:${color};
          text-shadow:
            0 0 5px ${color},
            0 0 12px ${color},
            0 0 24px ${color};
          transition: all 0.4s ease;
        ">${char}</span>
      `;
    })
    .join("");

  state.el.innerHTML = html;
}


// ================= START =================

function startChaffle() {
  // xoá toàn bộ title cũ nếu bị nhân đôi
  document.querySelectorAll("#chaffle-title").forEach(el => el.remove());

  // reset khoảng cách phía trên
  document.body.style.paddingTop = "80px";

  const title = createTitle();
  chaffleText(title);
}

// chỉ chạy 1 lần duy nhất
if (!window.__CHAFFLE_RUNNING__) {
  window.__CHAFFLE_RUNNING__ = true;

  window.addEventListener("load", () => {
    startChaffle();
  });
}
