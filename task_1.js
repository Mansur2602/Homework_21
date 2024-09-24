


const bigBox = document.querySelector('.films');
const searchButton = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const submitButton = document.getElementById('submitButton');


fetch('https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=Harry%20Potter', 
    { 
        headers: { 
            'accept': 'application/json', 
            'X-API-KEY': 'FT44EKK-8H4MPNY-H0RHS15-Z5H22JZ' 
        } 
    })
    .then(response => response.json())
    .then(data => {
        const movies = data.docs
        displayMovies(movies)

        searchButton.addEventListener('click', function() {
            searchInput.style.display = "block"
            submitButton.style.display = "block"
            searchButton.style.display = "none"
            searchInput.focus()
        });


        submitButton.addEventListener('click', function() {
            const query = searchInput.value.trim().toLowerCase()
            const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(query))
            
            bigBox.innerHTML = ''
            displayMovies(filteredMovies)

            searchInput.style.display = "none"
            submitButton.style.display = "none"
            searchButton.style.display = "block"
            searchInput.value = ""
        });

      
        document.getElementById('genreSelect').addEventListener('change', function() {
            const selectedGenre = this.value
            const filteredMoviesByGenre = movies.filter(movie => 
                movie.genres && movie.genres.some(genre => genre.name === selectedGenre)
            )
            
            bigBox.innerHTML = ''
            displayMovies(filteredMoviesByGenre)
        });
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });


function displayMovies(movies) {
    movies.forEach(element => {
        const filmContainer = document.createElement('div')
        filmContainer.classList.add('film-container')

        const image = document.createElement('img')
        image.src = element.poster.url
        
        const title = document.createElement('h3')
        title.textContent = element.name
        
        const description = document.createElement('p')
        const shortDescription = element.shortDescription || element.description || 'Описание отсутствует'
        

        description.textContent = shortDescription.length > 30 ? shortDescription.substring(0, 30) + '...' : shortDescription;
        
        filmContainer.append(image, title, description)
        bigBox.append(filmContainer)
    });
}


