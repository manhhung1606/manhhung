// ================= CHAFFLE EFFECT (GỘP) =================
const targetText = "MẠNH.HÙNG☆☆☆16-06";
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

const colorPalettes = [
  ["#FF0000","#FF2200","#FF4400","#FF6600","#FF8800","#FFaa00","#FFcc00","#FFee00","#FFff00","#FFee00","#FFcc00","#FFaa00","#FF8800","#FF6600","#FF4400","#FF2200"],
  ["#00FFFF","#00DDFF","#00BBFF","#0099FF","#0077FF","#0055FF","#0033FF","#0011FF","#0011FF","#0033FF","#0055FF","#0077FF","#0099FF","#00BBFF","#00DDFF","#00FFFF"],
  ["#FF0000","#FF4000","#FF8000","#FFC000","#FFFF00","#C0FF00","#80FF00","#40FF00","#00FF00","#00FF40","#00FF80","#00FFC0","#00FFFF","#00C0FF","#0080FF","#FF00FF"],
  ["#FF00FF","#EE00EE","#DD00DD","#CC00CC","#BB00BB","#AA00AA","#9900AA","#8800BB","#7700CC","#6600DD","#5500EE","#4400FF","#5500EE","#6600DD","#7700CC","#8800BB"],
];

let chaffleState = {
  el: null,
  iteration: 0,
  colorOffset: 0,
  palette: colorPalettes[0],
  running: false,
  paletteInterval: null
};

function createChaffleEl() {
  let old = document.getElementById("chaffle-title");
  if (old) old.remove();

  const div = document.createElement("div");
  div.id = "chaffle-title";
  div.style.cssText = `
    font-family: 'Jura', sans-serif;
    font-size: 37px;
    text-align: center;
    padding: 10px;
    letter-spacing: 2px;
  `;

  document.body.prepend(div);
  return div;
}

function updateChaffle() {
  if (!chaffleState.running) return;

  const { el, iteration } = chaffleState;
  const maxIteration = targetText.length * 5;

  const spans = targetText.split("").map((char, i) => {
    if (i < Math.floor(iteration / 5)) return targetText[i];
    if (char === ' ' || char === '.' || char === '☆') return char;
    return chars[Math.floor(Math.random() * chars.length)];
  });

  el.innerHTML = spans.map(c => `<span>${c}</span>`).join("");

  const spanEls = el.querySelectorAll("span");
  spanEls.forEach((span, i) => {
    const colorIndex = (i + chaffleState.colorOffset) % chaffleState.palette.length;
    span.style.color = chaffleState.palette[colorIndex];
    span.style.textShadow = `0 0 8px ${chaffleState.palette[colorIndex]}`;
  });

  chaffleState.colorOffset = (chaffleState.colorOffset + 1) % chaffleState.palette.length;

  if (iteration < maxIteration) {
    chaffleState.iteration++;
  } else {
    setTimeout(() => {
      chaffleState.iteration = 0;
    }, 3000);
  }

  requestAnimationFrame(updateChaffle);
}

function startChaffle() {
  stopChaffle(); // đảm bảo không bị chồng

  chaffleState.el = createChaffleEl();
  chaffleState.iteration = 0;
  chaffleState.running = true;

  chaffleState.paletteInterval = setInterval(() => {
    chaffleState.palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
  }, 5000);

  updateChaffle();
}

function stopChaffle() {
  chaffleState.running = false;

  if (chaffleState.paletteInterval) {
    clearInterval(chaffleState.paletteInterval);
    chaffleState.paletteInterval = null;
  }

  let el = document.getElementById("chaffle-title");
  if (el) el.remove();
}
// ================= END CHAFFLE =================


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
