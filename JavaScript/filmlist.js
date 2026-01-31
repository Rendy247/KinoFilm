let currentVideo = 1;
let videoLoaded = false;

function switchVideo(videoNumber) {
  document.querySelector('#Pleer1').style.backgroundColor = "#cf6000";
  document.querySelector('#Pleer2').style.backgroundColor = "#cf6000";
  document.querySelector('#Pleer3').style.backgroundColor = "#cf6000";
  document.querySelector('.Trailer').style.backgroundColor = "#cf6000";
  if (videoNumber === 'trailer') {
        document.querySelector('.Trailer').style.backgroundColor = "#00ff0d";
    }
    else {
        document.querySelector(`#Pleer${videoNumber}`).style.backgroundColor = "#00ff0d";
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
    iframe.style.height = '570px';
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
            <img src="https://via.placeholder.com/1280x720/222/fff?text=Нажми+сюда+для+загрузки+видео"
                 style="width:100%; height:300px; object-fit:cover;">
            <div style="text-align:center; padding:20px; background:#333; color:white;">
                <button style="background:#4CAF50; color:white; padding:15px 30px;
                               border:none; border-radius:10px; font-size:18px; margin-top:10px;">
                    ▶ Загрузить видео
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
