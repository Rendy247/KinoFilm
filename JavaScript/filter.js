let currentFilter = 'фильм'; // По умолчанию "фильм"
let currentResults = [];
let currentPage = 1;
const filmsPerPage = 24;

// Функция получения параметров из URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        filter: params.get('filter') || 'фильм',
        search: params.get('search') || ''
    };
}

// Функция фильтрации по типу
function filterByType(type) {
    if (type === 'все') {
        return moviesDatabase;
    }

    return moviesDatabase.filter(movie =>
        movie.type.toLowerCase() === type.toLowerCase()
    );
}

// Функция применения фильтра
function applyFilter(type, updateURL = true) {
    currentFilter = type;
    currentResults = filterByType(type);
    currentPage = 1;

    // Обновляем URL если нужно
    if (updateURL) {
        updateUrlParams({ filter: type });
    }

    showResults(currentResults);
    updateFilterButtons();
}

// Функция показа ВСЕХ фильмов (для логотипа)
function showAllMovies() {
    currentFilter = 'все';
    currentResults = moviesDatabase;
    currentPage = 1;

    // Обновляем URL
    updateUrlParams({ filter: 'все' });

    showResults(currentResults);
    updateFilterButtons();
}

// Функция обновления URL параметров
function updateUrlParams(params = {}) {
    const urlParams = new URLSearchParams(window.location.search);

    // Обновляем или добавляем параметры
    Object.keys(params).forEach(key => {
        if (params[key]) {
            urlParams.set(key, params[key]);
        } else {
            urlParams.delete(key);
        }
    });

    // Обновляем URL без перезагрузки страницы
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.history.pushState({}, '', newUrl);
}

// Обновление состояния кнопок фильтра (БЕЗ счетчиков)
function updateFilterButtons() {
    const buttons = document.querySelectorAll('.link[data-filter]');

    buttons.forEach(button => {
        const filterType = button.getAttribute('data-filter');

        // Удаляем активный класс со всех кнопок
        button.classList.remove('active');

        // Если сейчас показываем "все" - ни одна кнопка не активна
        // Иначе активируем соответствующую кнопку
        if (currentFilter !== 'все' && filterType === currentFilter) {
            button.classList.add('active');
        }

        // Просто текст без счетчика
        const baseText = filterType.charAt(0).toUpperCase() + filterType.slice(1);
        button.textContent = baseText;
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметры из URL
    const params = getUrlParams();

    // Устанавливаем фильтр из URL или по умолчанию
    applyFilter(params.filter, false);

    // Устанавливаем значение поиска если есть
    if (params.search) {
        document.getElementById('searchInput').value = params.search;
        performSearch(params.search);
    }

    // Добавляем обработчики на кнопки фильтрации
    const filterButtons = document.querySelectorAll('.link[data-filter]');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const filterType = this.getAttribute('data-filter');
            applyFilter(filterType);
        });
    });

    // Обработчик для логотипа KinoFilm - показывает ВСЕ фильмы
    const logo = document.querySelector('.DivKinoFilm');
    if (logo) {
        logo.addEventListener('click', function() {
            // При клике на логотип - показываем ВСЕ фильмы
            showAllMovies();

            // Очищаем поиск
            document.getElementById('searchInput').value = '';
            updateUrlParams({ filter: 'все', search: '' });
        });
        logo.style.cursor = 'pointer';
    }

    // Обработчик для формы поиска
    const searchForm = document.querySelector('.FormInput');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchValue = document.getElementById('searchInput').value;
            updateUrlParams({ search: searchValue, filter: currentFilter });
            performSearch(searchValue);
        });
    }
});

// Делаем функции доступными глобально
window.applyFilter = applyFilter;
window.showAllMovies = showAllMovies;
window.currentFilter = currentFilter;
window.filterByType = filterByType;
