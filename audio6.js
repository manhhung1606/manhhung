function __MAIMAIMOTTINHYEU1606() {
ManhHungAudio();
}
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
  "https://manhhung1606.github.io/manhhung/shayne_ward_no_promises_video_3739383572241379958.mp3",
];

//Random music
  let index = Math.floor(Math.random() * ManhHung_List.length);
  const audio = new Audio(ManhHung_List[index]);
  function ManhHungAudio() {audio.play();}
  document.addEventListener("click", ManhHungAudio);
  audio.addEventListener("ended", function() {
    index = (index + 1) % ManhHung_List.length;
    audio.src = ManhHung_List[index];
    audio.play();
  });
// Giọng đọc lời chào, xong rồi nhạc mới chạy
  window.addEventListener('load', function () {
    const msg = new SpeechSynthesisUtterance('Chào mừng bạn đến với website của Mạnh Hùng.Chúc bạn có những phút giây thư giãn thật vui vẻ. ');
    msg.lang = 'vi-VN';
    msg.rate = 0.9;

    msg.onend = function () {
      audio.play();
    };

    document.addEventListener('click', function () {
      window.speechSynthesis.speak(msg);
    }, { once: true });
  });
