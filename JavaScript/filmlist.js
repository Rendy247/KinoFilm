// filmlist.js
let currentVideo = 1;
let videoLoaded = false;
let currentVideoPlayers = {};

// Функция для получения параметров из URL
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Функция загрузки данных фильма
function loadMovieData() {
    const movieId = getUrlParam('id');

    if (!movieId) {
        console.log('ID фильма не указан');
        document.querySelector('.NameofFilm').textContent = 'ID фильма не указан';
        document.querySelector('.Text').textContent = 'Пожалуйста, выберите фильм на главной странице.';
        return;
    }

    // Проверяем, загружены ли данные
    if (!window.moviesDatabase || window.moviesDatabase.length === 0) {
        console.error('Данные фильмов не загружены');
        document.querySelector('.NameofFilm').textContent = 'Ошибка загрузки';
        document.querySelector('.Text').textContent = 'Не удалось загрузить данные фильмов.';
        return;
    }

    // Ищем фильм в базе данных
    const movie = window.moviesDatabase.find(m => m.id == movieId);

    if (movie) {
        // Обновляем заголовок страницы
        document.title = movie.title + " - KinoFilm";

        // Обновляем название фильма
        const titleElement = document.querySelector('.NameofFilm');
        if (titleElement) {
            titleElement.textContent = movie.title;
        }

        // Обновляем описание
        const descElement = document.querySelector('.Text');
        if (descElement) {
            if (movie.description) {
                descElement.textContent = movie.description;
            } else {
                descElement.textContent = 'Описание отсутствует.';
            }
        }

        // Обновляем фоновое изображение
        const bgElement = document.querySelector('.DivNameAndPleer');
        if (bgElement) {
            if (movie.backgroundImage) {
                bgElement.style.backgroundImage = `url('${movie.backgroundImage}')`;
            } else if (movie.image) {
                // Используем маленькую картинку как фоновую
                bgElement.style.backgroundImage = `url('${movie.image}')`;
            }
        }

        // Сохраняем ссылки на видео
        if (movie.videoPlayers) {
            currentVideoPlayers = movie.videoPlayers;

            // Скрываем недоступные плееры
            const pleer1 = document.querySelector('#Pleer1');
            const pleer2 = document.querySelector('#Pleer2');
            const pleer3 = document.querySelector('#Pleer3');
            const trailer = document.querySelector('.Trailer');

            if (pleer1 && !currentVideoPlayers[1]) {
                pleer1.style.display = 'none';
            }
            if (pleer2 && !currentVideoPlayers[2]) {
                pleer2.style.display = 'none';
            }
            if (pleer3 && !currentVideoPlayers[3]) {
                pleer3.style.display = 'none';
            }
            if (trailer && !currentVideoPlayers.trailer) {
                trailer.style.display = 'none';
            }

            // Выбираем первый доступный плеер
            if (currentVideoPlayers[1]) {
                switchVideo(1);
            } else if (currentVideoPlayers[2]) {
                switchVideo(2);
            } else if (currentVideoPlayers.trailer) {
                switchVideo('trailer');
            } else {
                // Если нет доступных плееров, скрываем всю панель
                document.querySelector('.PlachkaPleerov').style.display = 'none';
            }
        } else {
            // Если нет видеоплееров, скрываем всю панель
            document.querySelector('.PlachkaPleerov').style.display = 'none';
        }
    } else {
        console.log('Фильм не найден');
        document.querySelector('.NameofFilm').textContent = 'Фильм не найден';
        document.querySelector('.Text').textContent = 'К сожалению, информация об этом фильме отсутствует.';
        document.querySelector('.PlachkaPleerov').style.display = 'none';
    }
}

// Обновленная функция switchVideo
function switchVideo(videoNumber) {
    // Сбрасываем стили всех кнопок
    const pleer1 = document.querySelector('#Pleer1');
    const pleer2 = document.querySelector('#Pleer2');
    const pleer3 = document.querySelector('#Pleer3');
    const trailer = document.querySelector('.Trailer');

    if (pleer1) {
        pleer1.style.backgroundColor = "#333";
        pleer1.style.border = "none";
        pleer1.style.color = "white";
    }
    if (pleer2) {
        pleer2.style.backgroundColor = "#333";
        pleer2.style.border = "none";
        pleer2.style.color = "white";
    }
    if (pleer3) {
        pleer3.style.backgroundColor = "#333";
        pleer3.style.border = "none";
        pleer3.style.color = "white";
    }
    if (trailer) {
        trailer.style.backgroundColor = "#333";
        trailer.style.border = "none";
        trailer.style.color = "white";
    }

    // Устанавливаем активный плеер
    if (videoNumber === 'trailer') {
        if (trailer) {
            trailer.style.backgroundColor = "#fa0400";
            trailer.style.border = "1px solid white";
            trailer.style.color = "white";
        }
    } else {
        const player = document.querySelector(`#Pleer${videoNumber}`);
        if (player) {
            player.style.backgroundColor = "#00ff0d";
            player.style.border = "1px solid white";
            player.style.color = "black";
        }
    }

    currentVideo = videoNumber;
    if (videoLoaded) {
        loadVideo();
    }
}

// Обновленная функция loadVideo
function loadVideo() {
    const videoBox = document.getElementById('video-box');

    // Проверяем, есть ли ссылка для выбранного плеера
    if (!currentVideoPlayers[currentVideo]) {
        videoBox.innerHTML = `
            <div style="background: #333; color: white; padding: 20px; text-align: center; border-radius: 10px;">
                <h3>Видео недоступно</h3>
                <p>Для этого фильма видео не найдено</p>
            </div>
        `;
        return;
    }

    // Очищаем старый плеер
    videoBox.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '570px';
    iframe.style.border = 'none';
    iframe.allowFullscreen = true;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";

    // Устанавливаем нужное видео из данных фильма
    iframe.src = currentVideoPlayers[currentVideo];

    // Добавляем плеер на страницу
    videoBox.appendChild(iframe);
    videoLoaded = true;
}

// Функция показывает кнопку "Нажми для загрузки"
function showVideoButton() {
    const videoBox = document.getElementById('video-box');
    videoBox.innerHTML = `
        <div class="video-placeholder" onclick="loadVideo()" style="cursor: pointer;">
            <div style="padding:20px; background:black; color:white; text-align: center; border-radius: 10px;">
                <h3>Готово к просмотру</h3>
                <button style="background:#4CAF50; color:white; padding:15px 30px;
                               border:none; border-radius:10px; font-size:18px; margin-top:10px;">
                    ▶ Смотреть
                </button>
                <p style="margin-top: 10px; opacity: 0.8;">Нажмите для загрузки видео</p>
            </div>
        </div>
    `;
}

// Инициализация бургер-меню
var divLink = document.getElementById('DivLink');
var DivLinkBool = false;

function Burger() {
    if (DivLinkBool == false) {
        divLink.style.display = "block";
        DivLinkBool = true;
    } else {
        divLink.style.display = "none";
        DivLinkBool = false;
    }
}

// ====== НАВИГАЦИЯ И ФИЛЬТРЫ ======
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем данные фильма
    loadMovieData();

    // Показываем кнопку загрузки видео
    showVideoButton();

    // === 1. Инициализация элементов ===
    const filterLinks = document.querySelectorAll('.DivLink .link');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.KnopkaPoisk');
    const logo = document.querySelector('.DivKinoFilm');

    // === 2. Заполняем поиск из URL если есть ===
    const urlParams = new URLSearchParams(window.location.search);
    const searchFromUrl = urlParams.get('search');
    if (searchFromUrl && searchInput) {
        searchInput.value = decodeURIComponent(searchFromUrl);
    }

    // === 3. Обработка фильтров ===
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const filterType = this.getAttribute('data-filter');
            if (!filterType) return;

            // Получаем текст поиска
            const searchText = searchInput ? searchInput.value.trim() : '';

            // Формируем URL
            let url = '../index.html?filter=' + encodeURIComponent(filterType);

            // Добавляем поиск если есть
            if (searchText) {
                url += '&search=' + encodeURIComponent(searchText);
            }

            console.log('Переход по фильтру:', url); // Для отладки
            window.location.href = url;
        });
    });

    // === 4. Обработка формы поиска ===
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearch();
        });
    }

    // === 5. Кнопка поиска (иконка) ===
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            handleSearch();
        });
        searchButton.style.cursor = 'pointer';
    }

    // === 6. Логотип ===
    if (logo) {
        logo.addEventListener('click', function() {
            const searchText = searchInput ? searchInput.value.trim() : '';

            if (searchText) {
                window.location.href = '../index.html?search=' + encodeURIComponent(searchText);
            } else {
                window.location.href = '../index.html';
            }
        });
        logo.style.cursor = 'pointer';
    }

    // === 7. Функция обработки поиска ===
    function handleSearch() {
        const searchText = searchInput ? searchInput.value.trim() : '';

        // Получаем текущий активный фильтр из URL
        const urlParams = new URLSearchParams(window.location.search);
        const currentFilter = urlParams.get('filter');

        // Формируем URL
        let url = '../index.html';
        let params = [];

        if (searchText) {
            params.push('search=' + encodeURIComponent(searchText));
        }

        if (currentFilter) {
            params.push('filter=' + encodeURIComponent(currentFilter));
        }

        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        console.log('Переход по поиску:', url); // Для отладки
        window.location.href = url;
    }

    // === 8. Поиск по нажатию Enter ===
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
});
