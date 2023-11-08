function __ongconoimay() {
ManhHungAudio();
}
const ManhHung_List = [
"https://manhhung1606.github.io/manhhung/Happynewyear.mp3",
"https://manhhung1606.github.io/manhhung/Alan_Walker_-_Sunday_Music_Video_(getmp3.pro).mp3",
"https://manhhung1606.github.io/manhhung/Passlives.mp3",
"https://manhhung1606.github.io/manhhung/Ong Ba Gia Tao Lo Het - Binh Gold_ Lil S.mp3",
"https://manhhung1606.github.io/manhhung/Mt_Bc_Yu_Vn_Dm_au_Lyrics_V_(getmp3.pro).mp3",
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
