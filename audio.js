
   audio = new Audio("https://hungdeptrai.com/y2mate.com - Alan Walker Sabrina Carpenter Farruko On My Way Official Alternate Music Video.mp3");

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
         
