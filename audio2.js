function __MAIMAIMOTTINHYEU1606() {
ManhHungAudio();
}
const ManhHung_List = [
"https://manhhung1606.github.io/manhhung/Chờ đợi quá khứ.mp3",
"https://manhhung1606.github.io/manhhung/mv_anh_tin_minh_da_cho_nhau_mot_ky_niem_thu_thuy_ft_luong_bang_quang_6771119687899202332.mp3",
"https://manhhung1606.github.io/manhhung/vietsub_ai_phi_hau_huyen_-224110807638924782.mp3",
"https://manhhung1606.github.io/manhhung/y2meta.com - Ngồi Bên Em (320 kbps).mp3",
"https://manhhung1606.github.io/manhhung/Mt_Bc_Yu_Vn_Dm_au_Lyrics_V_(getmp3.pro).mp3",
"https://manhhung1606.github.io/manhhung/X2Download.app - █▬█ █ ▀█▀ Bài Học Trong Cuộc Sống - Tiay (Rap Việt 2012) (320 kbps).mp3",
"https://manhhung1606.github.io/manhhung/AI_L_NGI_THNG_EM_-_QUN_AP_L_(getmp3.pro).mp3",
"https://manhhung1606.github.io/manhhung/Please Tell Me Why - Bảo Thy (ft. Vương Khang)  Lyrics Video.mp3",
"https://manhhung1606.github.io/manhhung/Mong Anh Quay Về.mp3",
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
