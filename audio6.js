// Danh sách nhạc
const ManhHung_List = [
  "https://manhhung1606.github.io/manhhung/Mây (Thazh x Đông Remix) - Jank ft Sỹ Tây ♫ Mây Hoà Theo Gió Có Người Đơn Phương Remix _ H2K Cover [i5auqtV6wvg].mp3", 
  "https://manhhung1606.github.io/manhhung/Hẹn Hò Nhưng Không Yêu Thazh x Đông Remix Wendy Thảo ♫ Em Cố Trăm Lần Chẳng Bằng Ai Đó Một Phần.mp3",
  "https://manhhung1606.github.io/manhhung/Mở Lòng Vì Ai Thazh x Đông Remix Inso Cover ♫ Em Một Lòng Vì Anh Nhưng Anh Mở Lòng Vì Ai Remix.mp3",
  "https://manhhung1606.github.io/manhhung/Ngày Hai Ta Sát Vai Remix Thazh x Đông Remix Inso ♫ Hạnh Phúc Xây Nên Từ Hai Ta Remix.mp3",
  "https://manhhung1606.github.io/manhhung/Mình Là Người Yêu Cũ Thazh x Đông Remix Khả Hiệp ♫ Ai Làm Em Khóc Nữa Rồi Remix Trend TikTok.mp3",
  "https://manhhung1606.github.io/manhhung/Nắng Dưới Chân Mây Style Huy PT Remix Nguyễn Hữu Kha ♫ Trả Lại Em Những Nỗi Buồn Remix TikTok.mp3",
  "https://manhhung1606.github.io/manhhung/SƠN THUỶ TRÙNG MÂY x THUỶ CHUNG x YẾN VÔ HIẾT (VIETZ x WI. REMIX) - JENA, ANH RỒNG,THƯƠNG VÕ,MÂY BAE.mp3",
  "https://manhhung1606.github.io/manhhung/Trả Cho Anh (Bản Hot TikTok) - Nguyễn Thạc Bảo Ngọc x Qkhanh Remix Em Trả Cho Anh Tự Do Remix.mp3",
  "https://manhhung1606.github.io/manhhung/Nặng Tình Hay Nhẹ Lòng Remix Bản Chuẩn TikTok ♫ Thà Rằng Người Hãy Nói Hết Để Em Quay Lưng Bước Đi.mp3",
  "https://manhhung1606.github.io/manhhung/DnB - Feint - We Won t Be Alone (feat. Laura Brehm) Monstercat Release.mp3",
  "https://manhhung1606.github.io/manhhung/BÔNG HOA CHẲNG TỒN TẠI TN x VIETZ REMIX HUY VẠC XA NHAU ANH BIẾT EM CHẲNG CÒN YÊU CÒN THƯƠNG.mp3",
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
  currentIndex = (currentIndex + 1) % ManhHung_List.length;
  audio.src = ManhHung_List[currentIndex];
  audio.play().catch(err => console.log("Audio play error:", err));
});
