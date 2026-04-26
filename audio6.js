// Danh sách nhạc
const ManhHung_List = [
  "https://manhhung1606.github.io/manhhung/DnB - Feint - We Won t Be Alone (feat. Laura Brehm) Monstercat Release.mp3",
  "https://manhhung1606.github.io/manhhung/Edward Maya Vika Jigulina - Stereo Love (Jay Latune Remix).mp3",
  "https://manhhung1606.github.io/manhhung/Charlie Puth - One Call Away Official Video.mp3",
  "https://manhhung1606.github.io/manhhung/Daniel Powter - Free Loop (Official Music Video) [vEY_mg2y-rg].mp3",
  "https://manhhung1606.github.io/manhhung/M2M - The Day You Went Away.mp3",
  "https://manhhung1606.github.io/manhhung/Michael Learns To Rock - Take Me To Your Heart Official Video (with Lyrics Closed Caption).mp3",
  "https://manhhung1606.github.io/manhhung/Passenger - Let Her Go (Feat. Ed Sheeran - Anniversary Edition) Official Video.mp3",
  "https://manhhung1606.github.io/manhhung/SLANDER - Love Is Gone ft. Dylan Matthew (Acoustic).mp3",
  "https://manhhung1606.github.io/manhhung/So Far Away (Acoustic) - Martin Garrix David Guetta (Cover by Adam Christopher).mp3",
  "https://manhhung1606.github.io/manhhung/shayne_ward_no_promises_video_3739383572241379958.mp3"
];

// Tạo audio một lần
let currentIndex = Math.floor(Math.random() * ManhHung_List.length);
const audio = new Audio(ManhHung_List[currentIndex]);

// Hàm phát nhạc
function playMusic() {
  audio.play().catch(err => console.log("Audio play error:", err));
}

// Khi nhạc kết thúc → chuyển bài tiếp theo
audio.addEventListener("ended", function() {
  currentIndex = (currentIndex + 1) % ManhHung_List.length;
  audio.src = ManhHung_List[currentIndex];
  playMusic();
});

// Phần giọng nói chào mừng + phát nhạc
window.addEventListener('load', function () {
  setTimeout(function () {
    var confirmBtn = document.querySelector('.swal2-confirm');

    function startAudio() {
      // Kiểm tra trình duyệt có hỗ trợ SpeechSynthesis không
      if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance('Chào mừng bạn đến với website của Mạnh Hùng. Chúc bạn có những phút giây thư giãn thật vui vẻ.');
        msg.lang = 'vi-VN';
        msg.rate = 0.9;

        // Khi đọc xong thì phát nhạc
        msg.onend = function () {
          playMusic();
        };

        // Timeout phòng trường hợp speech bị treo, không gọi onend
        setTimeout(function () {
          playMusic();
        }, 8000);

        window.speechSynthesis.speak(msg);
      } else {
        // Trình duyệt không hỗ trợ (FB WebView...) → phát nhạc luôn
        playMusic();
      }
    }

    if (confirmBtn) {
      confirmBtn.addEventListener('click', startAudio, { once: true });
    } else {
      // Fallback nếu không tìm thấy nút SweetAlert
      document.addEventListener('click', function handler() {
        startAudio();
        document.removeEventListener('click', handler);
      }, { once: true });
    }
  }, 700);
});
