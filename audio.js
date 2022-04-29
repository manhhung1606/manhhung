
   audio = new Audio("https://hungdeptrai.com/nhac_nen_co_be_ban_diem_bat_hu_1489387.mp3");

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
         
