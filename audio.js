
   audio = new Audio("https://hungdeptrai.com/tinh_yeu_mau_hong_lofi_ver_ho_van_quy_x_xam_x_freak_d_-3194897992726004723.mp3");

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
         
