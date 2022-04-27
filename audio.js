
   audio = new Audio("https://hungdeptrai.com/late_night_melancholy_rude_boy_white_cherry_slowed_reverb_-2607903975075864947.mp3");

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
         
