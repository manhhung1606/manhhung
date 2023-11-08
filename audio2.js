function __ongconoimay() {
ManhHungAudio();
}
const ManhHung_List = [
"https://manhhung1606.github.io/manhhung/hoa_bang_lang_kidz_prod_tam_ke_-7278750744407002829.mp3",
"https://manhhung1606.github.io/manhhung/mv_anh_tin_minh_da_cho_nhau_mot_ky_niem_thu_thuy_ft_luong_bang_quang_6771119687899202332.mp3",
"https://manhhung1606.github.io/manhhung/vietsub_ai_phi_hau_huyen_-224110807638924782.mp3",
"https://manhhung1606.github.io/manhhung/Ong Ba Gia Tao Lo Het - Binh Gold_ Lil S.mp3",
"https://manhhung1606.github.io/manhhung/Mt_Bc_Yu_Vn_Dm_au_Lyrics_V_(getmp3.pro).mp3",
"https://manhhung1606.github.io/manhhung/y2mate.com - Alan Walker Sabrina Carpenter Farruko On My Way Official Alternate Music Video.mp3",
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
