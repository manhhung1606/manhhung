
   audio = new Audio("https://hungdeptrai.com/Past_Lives_Violin_Cover_Bn_F_(getmp3.pro).mp3");

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
         
