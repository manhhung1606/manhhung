
   audio = new Audio("https://hungdeptrai.com/Bn_nhc_c_gi_chi_Violin_bun_nh_(getmp3.pro).mp3");

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
         
