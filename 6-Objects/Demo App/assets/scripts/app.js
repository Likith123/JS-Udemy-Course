const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

function searchMovieHandler(){
    const filterTerm = document.getElementById("filter-title").value;
    renderMovies(filterTerm);
}

function renderMovies(filter = "") {
  const moviesList = document.getElementById("movie-list");

  if (movies.length === 0) {
    moviesList.classList.remove("visible");
  } else {
    moviesList.classList.add("visible");
  }
  moviesList.innerHTML = "";

  const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieElement = document.createElement("li");
    const {info, id} = movie;
    let text = info.title + ' => ';
    for(const key in info){
        if(key !== 'title'){
            text += `${key} : ${info[key]}`;
        }
    }
    movieElement.textContent = text;
    moviesList.append(movieElement);
  });
}

function addMovieHandler(){
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;
    if(title.trim() === '' || extraName.trim() === '' || extraValue.trim() === ''){ 
        return;
    }

    const newMovie = {
        info : {
            title,
            [extraName] : extraValue
        },
        id : Math.random()
    };

    movies.push(newMovie);
    console.log(newMovie);
    renderMovies();
}

addMovieBtn.addEventListener('click',addMovieHandler);
searchBtn.addEventListener('click',searchMovieHandler);