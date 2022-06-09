
   audio = new Audio("https://hungdeptrai.com/AI_L_NGI_THNG_EM_-_QUN_AP_L_(getmp3.pro).mp3");

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
         
