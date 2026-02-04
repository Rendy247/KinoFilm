let currentVideo = 1;
let videoLoaded = false;

function switchVideo(videoNumber) {
  document.querySelector('#Pleer1').style.backgroundColor = "#333";
  document.querySelector('#Pleer1').style.border = "none";
  document.querySelector('#Pleer2').style.backgroundColor = "#333";
  document.querySelector('#Pleer2').style.border = "none";
  document.querySelector('#Pleer3').style.backgroundColor = "#333";
  document.querySelector('#Pleer3').style.border = "none";
  document.querySelector('.Trailer').style.backgroundColor = "#333";
  document.querySelector('.Trailer').style.border = "none";
  if (videoNumber === 'trailer') {
        document.querySelector('.Trailer').style.backgroundColor = "black";
          document.querySelector('.Trailer').style.border = "1px solid white";
    }
    else {
        document.querySelector(`#Pleer${videoNumber}`).style.backgroundColor = "black";
        document.querySelector(`#Pleer${videoNumber}`).style.border = "1px solid white";
    }
    currentVideo = videoNumber;
    if (videoLoaded) {
        loadVideo();
    }
}
function loadVideo() {
    const videoBox = document.getElementById('video-box');
    // Очищаем старый плеер
    videoBox.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.allowFullscreen = true;

    // Устанавливаем нужное видео
    iframe.src = videoPlayers[currentVideo];

    // Добавляем плеер на страницу
    videoBox.appendChild(iframe);
    videoLoaded = true;
}
// Эта функция показывает кнопку "Нажми для загрузки"
function showVideoButton() {
    const videoBox = document.getElementById('video-box');

    videoBox.innerHTML = `
        <div class="video-placeholder" onclick="loadVideo()">
        <div style=" padding:20px; background:black; color:white;">
            <button style="background:#4CAF50; color:white; padding:15px 30px;
                           border:none; border-radius:10px; font-size:18px; margin-top:10px;">
                ▶ Смотреть
            </button>
        </div>
        </div>
    `;
}
// Когда страница загрузилась
document.addEventListener('DOMContentLoaded', function() {
    showVideoButton();
    switchVideo(1); // По умолчанию выбран первый плеер
});
var divLink = document.getElementById('DivLink');
var DivLinkBool = false;
function Burger(){
  if(DivLinkBool == false){
  divLink.style.display = "block";
  DivLinkBool = true;
  }
  else{
  divLink.style.display = "none";
  DivLinkBool = false;
  }
}
