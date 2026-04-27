// Danh sách nhạc
const ManhHung_List = [
  "https://manhhung1606.github.io/manhhung/Gặp Người Đúng Lúc [ ❣ Lời Việt ❣ ] [SASAH-gigmQ].mp3",
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
let currentIndex = 0;
const audio = new Audio(ManhHung_List[currentIndex]);

// Hàm phát nhạc - đọc lời chào trước, sau đó mới phát nhạc
function playMusic() {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance('Chào mừng bạn đến với website của Mạnh Hùng. Chúc bạn có những phút giây thư giãn thật vui vẻ.');
    msg.lang = 'vi-VN';
    msg.rate = 0.92;
    msg.onend = function () {
      audio.play().catch(err => console.log("Audio play error:", err));
    };
    // Phòng trường hợp speech bị treo
    setTimeout(function () {
      audio.play().catch(err => console.log("Audio play error:", err));
    }, 8000);
    window.speechSynthesis.speak(msg);
  } else {
    // FB WebView → phát nhạc luôn
    audio.play().catch(err => console.log("Audio play error:", err));
  }
}

// Khi nhạc kết thúc → chuyển bài tiếp theo
audio.addEventListener("ended", function() {
  currentIndex = Math.floor(Math.random() * ManhHung_List.length);
  audio.src = ManhHung_List[currentIndex];
  audio.play().catch(err => console.log("Audio play error:", err));
});
