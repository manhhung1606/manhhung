
   audio = new Audio("https://hungdeptrai.com/Mt_Bc_Yu_Vn_Dm_au_Lyrics_V_(getmp3.pro).mp3");

document.onclick = function() {
  audio.play();
  if (typeof audio.loop == 'boolean')
{
    audio.loop = true;
}
else
{
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}
audio.play();
  
}
         
