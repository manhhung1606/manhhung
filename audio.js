
   audio = new Audio("https://hungdeptrai.com/X2Download.com - TheFatRat & Anjulie - Close To The Sun x Origin (128 kbps).mp3");

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
         
