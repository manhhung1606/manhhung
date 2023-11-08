manhhungaudio();
}
const manhhung_list = [
"manhhung1606.github.io/manhhung/Happynewyear.mp3",
"manhhung1606.github.io/manhhung/Alan_Walker_-_Sunday_Music_Video_(getmp3.pro).mp3",
"manhhung1606.github.io/manhhung/Passlives.mp3",
"manhhung1606.github.io/manhhung/Ong Ba Gia Tao Lo Het - Binh Gold_ Lil S.mp3",
"manhhung1606.github.io/manhhung/Mt_Bc_Yu_Vn_Dm_au_Lyrics_V_(getmp3.pro).mp3",
  ];
  //Random music
  let index = Math.floor(Math.random() * ThanhDieu_List.length);
  const audio = new Audio(manhhung_list[index]);
  function manhhungaudio() {audio.play();}
  document.addEventListener("click", manhhungaudio);
  audio.addEventListener("ended", function() {
    index = (index + 1) % manhhung_list.length;
    audio.src = manhhung_list[index];
    audio.play();
  });
