// Этот файл теперь подключается после filter.js
// и использует уже объявленные переменные

function searchMovies(query) {
    // Используем currentFilter из filter.js
    let moviesToSearch;

    if (currentFilter === 'все') {
        moviesToSearch = moviesDatabase;
    } else {
        moviesToSearch = moviesDatabase.filter(movie =>
            movie.type === currentFilter
        );
    }

    if (!query || query.trim() === '') {
        return moviesToSearch;
    }

    const searchTerm = query.toLowerCase().trim();
    return moviesToSearch.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
    );
}

function performSearch(query) {
    currentResults = searchMovies(query);
    currentPage = 1;
    showResults(currentResults);
    updateUrlParams({ search: query, filter: currentFilter });
}

function showResults(movies) {
    const container = document.getElementById('moviesContainer');
    const pagination = document.getElementById('pagination');
    if (!container) return;

    if (movies.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px; color: white;">
                <h3>Фильмы не найдены</h3>
                <p>Попробуйте другой запрос</p>
            </div>
        `;
        pagination.innerHTML = '';
        return;
    }

    const startIndex = (currentPage - 1) * filmsPerPage;
    const endIndex = startIndex + filmsPerPage;
    const moviesToShow = movies.slice(startIndex, endIndex);

    let html = '';
    moviesToShow.forEach(movie => {
        html += `<div class="DivIkanka" onclick="window.location.href='HTML/filmlist.html?id=${movie.id}'">
            <img class="ImgIkonki" src="${movie.image}" alt="${movie.title}">
            <p class="NameFilm">${movie.title}</p>
        </div>`;
    });

    container.innerHTML = html;
    showPagination(movies.length);
}

function showPagination(totalMovies) {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(totalMovies / filmsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '';
    html += `<button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="page-btn">←</button>`;

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `<button onclick="changePage(${i})" ${currentPage === i ? 'class="page-btn active"' : 'class="page-btn"'}">${i}</button>`;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `<span class="dots">...</span>`;
        }
    }

    html += `<button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="page-btn">→</button>`;
    pagination.innerHTML = html;
}

function changePage(page) {
    const totalPages = Math.ceil(currentResults.length / filmsPerPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;
    showResults(currentResults);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Добавляем обработчик поиска при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimer;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
});
