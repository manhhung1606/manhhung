// ================= LIGHT NEON TITLE =================

const targetText = "MẠNH.HÙNG☆☆☆16-06";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const colorPalettes = [
  ["#ff6b6b", "#ffd93d", "#6bff95", "#6bcBff", "#b06bff"],
  ["#00f5ff", "#00bbff", "#4d96ff", "#845ec2", "#ff6f91"],
  ["#ff8fab", "#ffc6ff", "#caffbf", "#9bf6ff", "#a0c4ff"]
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
function startLightNeon() {
  state.el = createTitle();
  renderTitle();

  // mỗi 5s đổi bảng màu
  setInterval(() => {
    changePalette();
  }, 5000);

  // mỗi 4s đổi ký tự
  setInterval(() => {
    randomizeText();
  }, 4000);
}


// ================= RUN =================
startLightNeon();

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
