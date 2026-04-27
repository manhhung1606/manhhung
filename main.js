// ================= MATRIX BACKGROUND =================
const canvas = document.createElement("canvas");
canvas.id = "matrix";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.cssText = `
position: fixed;
top: 0;
left: 0;
z-index: -1;
opacity: 0.2;
pointer-events: none;
`;

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const matrixChars = "01MATRIXMANHHUNG☆☆☆HACK";
const fontSize = 16;
let drops = Array(Math.floor(window.innerWidth / fontSize)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#00ff99";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > h && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

drawMatrix();


// ================= NEON TITLE =================
const targetText = "MẠNH.HÙNG☆☆☆16-06";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const colorPalettes = [
  ["#ff0000", "#ff7300", "#fffb00", "#48ff00", "#00ffd5", "#002bff", "#7a00ff", "#ff00c8"],
  ["#00f0ff", "#00aaff", "#0066ff", "#0033ff", "#2200ff", "#4400ff", "#6600ff", "#8800ff"],
  ["#ff0080", "#ff00ff", "#cc00ff", "#9900ff", "#6600ff", "#3300ff", "#0000ff", "#00ccff"]
];

let chaffleState = {
  el: null,
  running: false,
  iteration: 0,
  palette: colorPalettes[0]
};


// ================= CREATE TITLE =================
function createChaffleEl() {
  let old = document.getElementById("chaffle-title");
  if (old) old.remove();

  const div = document.createElement("div");
  div.id = "chaffle-title";

  div.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;

    font-family: 'Jura', sans-serif;
    font-size: clamp(18px, 5vw, 42px);
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;

    color: white;
    white-space: nowrap;
    max-width: 95vw;
    overflow: hidden;

    pointer-events: none;
    user-select: none;
  `;

  document.body.appendChild(div);

  // tránh đè nội dung phía dưới
  document.body.style.paddingTop = "90px";

  return div;
}


// ================= EXPLOSION EFFECT =================
function explode() {
  const el = chaffleState.el;

  el.style.transition = "0.2s";
  el.style.transform = "translateX(-50%) scale(1.2)";
  el.style.filter = "brightness(2.5) drop-shadow(0 0 30px cyan)";

  setTimeout(() => {
    el.style.transform = "translateX(-50%) scale(1)";
    el.style.filter = "none";
  }, 200);
}


// ================= UPDATE ENGINE =================
function updateChaffle() {
  if (!chaffleState.running) return;

  requestAnimationFrame(updateChaffle);

  let html = targetText.split("").map((char, i) => {
    let display =
      i < Math.floor(chaffleState.iteration / 2)
        ? char
        : chars[Math.floor(Math.random() * chars.length)];

    if (Math.random() < 0.12) {
      display = chars[Math.floor(Math.random() * chars.length)];
    }

    const palette = chaffleState.palette;
    const color =
      palette[(i + Math.floor(chaffleState.iteration / 2)) % palette.length];

    return `
      <span style="
        display: inline-block;
        color: ${color};
        text-shadow:
          0 0 5px ${color},
          0 0 15px ${color},
          0 0 30px ${color},
          0 0 60px ${color};
        transition: 0.05s linear;
      ">${display}</span>
    `;
  }).join("");

  chaffleState.el.innerHTML = html;

  if (chaffleState.iteration % 180 === 0 && chaffleState.iteration !== 0) {
    explode();
  }

  chaffleState.iteration++;
}


// ================= START =================
function startChaffle() {
  stopChaffle();

  chaffleState.el = createChaffleEl();
  chaffleState.running = true;
  chaffleState.iteration = 0;

  setInterval(() => {
    chaffleState.palette =
      colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
  }, 2500);

  updateChaffle();
}


// ================= STOP =================
function stopChaffle() {
  chaffleState.running = false;

  let el = document.getElementById("chaffle-title");
  if (el) el.remove();

  document.body.style.paddingTop = "0px";
}


// ================= RUN =================
startChaffle();

// ================= CODE CŨ =================
$(document).ready(function() {
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({'overflow': 'visible'});
    }, 600);
});

function init(){
    $('#title').text(CONFIG.title)
    $('#desc').text(CONFIG.desc)
    $('#yes').text(CONFIG.btnYes)
    $('#no').text(CONFIG.btnNo)
}

function firstQuestion(){
    $('body').css('overflow', 'hidden');
    
    // Ẩn + XÓA chaffle luôn
    $('#wrapper, header, #yes, #no, .inner-width, center, .demo, p, span[id^="a"], #slider, footer, #demo-1, #demo-2, #demo-3').hide();
    stopChaffle(); // 🔥 QUAN TRỌNG

    $('.leaf').remove();

    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'https://manhhung1606.github.io/manhhung/Save = Follow♡「Hương 」♡.jpeg',
        imageWidth: 500,
        imageHeight: 500,
        background: '#fff url("https://manhhung1606.github.io/manhhung/291de5d2aac98028a7c1d139298a3b46.jpg")',
        imageAlt: ' Xấu zai từ bé ',
        confirmButtonText: CONFIG.btnIntro
    }).then(function(){
        
        $('#wrapper, header, #yes, #no, .inner-width, center, .demo, p, span[id^="a"], #slider, footer, #demo-1, #demo-2, #demo-3').show(200);
        
        $('#demo-1, #demo-2, #demo-3').css('opacity', '1');

        if (typeof window.startTextEffect === 'function') {
            window.startTextEffect();
        }

        // 🔥 CHẠY CHAFFLE SAU POPUP
        setTimeout(() => {
            startChaffle();
        }, 300);

        setTimeout(() => {
            if (typeof playMusic === 'function') {
                playMusic();
            }
        }, 800);
    });
}

// ================= BUTTON =================
function switchButton() {
    var audio = new Audio('https://manhhung1606.github.io/manhhung/Cau-noi-ao-that-day-kha-banh-www_tiengdong_com.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}

function moveButton() {
    var audio = new Audio('https://manhhung1606.github.io/manhhung/Cau-noi-ao-that-day-kha-banh-www_tiengdong_com.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9 ;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.3;
    $('#no').css("left", x + 'px');
    $('#no').css("top", y + 'px');
}

init()

var n = 0;
$('#no').mousemove(function() {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
});

$('#no').click(() => {
    if (screen.width>=900) switchButton();
});

// ================= INPUT TEXT =================
function textGenerate() {
    var n = "";
    var text = " " + CONFIG.reply;
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// ================= YES BUTTON =================
$('#yes').click(function() {
    var audio = new Audio('https://hungdeptrai.com');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        width: 800,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate() placeholder=' Viết gì cũng được '>",
        background: '#fff url("https://manhhung1606.github.io/manhhung/291de5d2aac98028a7c1d139298a3b46.jpg")',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://manhhung1606.github.io/manhhung/FB_IMG_1630673201387.jpg")
          center top
          no-repeat
        `,
        confirmButtonColor: '#fe8a71',
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("https://manhhung1606.github.io/manhhung/291de5d2aac98028a7c1d139298a3b46.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            });
        }
    });
});
