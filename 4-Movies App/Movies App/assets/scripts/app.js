const addMovieModal = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector("header button");
const backDrop = document.getElementById("backdrop");
const cancelBtn = document.querySelector(".btn--passive");
const addBtn = document.querySelector(".btn--success");
const userInputs = document.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

function updateUI(){
    if(movies.length === 0){
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}

function deleteMovie(id){
    const index = 0;
    for(const movie of movies){
        if(movie.id === id){
            break;
        }
        index++;
    }
    movies.splice(index,1); // To delete movies from movies array
    listRoot.children[index].remove(); // To delete movie from UI
    cancelMovieDeletion();
    updateUI();
}

function deleteMovieHandler(id){
    deleteMovieModal.classList.add('visible');
    toggleBackDrop();
    const cancelDelBtn = deleteMovieModal.querySelector('.btn--passive');
    let confirmDelBtn = deleteMovieModal.querySelector(".btn--danger");

    confirmDelBtn.replaceWith(confirmDelBtn.cloneNode(true));
    confirmDelBtn = deleteMovieModal.querySelector(".btn--danger");
    cancelDelBtn.addEventListener('click',cancelMovieDeletion);
    confirmDelBtn.addEventListener('click',deleteMovie.bind(null,id));
}

function renderMovieElement(id,title, imageUrl, rating) {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class = "movie-element__image">
            <img src = "${imageUrl}" alt = "${title}">
        </div>
        <div class = "movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    newMovieElement.addEventListener('click',deleteMovieHandler.bind(null,id));
    listRoot.append(newMovieElement);
}

function toggleBackDrop() {
  backDrop.classList.toggle("visible");
}

function closeMovieModal(){
    addMovieModal.classList.remove('visible');
}

function showMovieModal() {
  addMovieModal.classList.add("visible");
  toggleBackDrop();
  clearInputs();
}

function cancelMovieDeletion(){
    toggleBackDrop();
    deleteMovieModal.classList.remove('visible');
}

function backDropClickHandler() {
  closeMovieModal();
  cancelMovieDeletion();
  clearInputs();
}

function clearInputs(){
    for(const userInput of userInputs){
        userInput.value = '';
    }
}

function cancelBtnClickHandler() {
  closeMovieModal();
  toggleBackDrop();
  clearInputs();
}

function addMovieHandler() {
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  
  if(title.trim() === '' || imageUrl.trim() == '' || ratingValue === '' || +ratingValue<1 || +ratingValue > 5){
    alert('Enter valid inputs.(Rating between 1 & 5)');
    return;
  }

  const newMovie = {
    id : Math.random().toString(),
    movieTitle : title,
    imageURL : imageUrl,
    rating : +ratingValue
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackDrop();
  renderMovieElement(newMovie.id, newMovie.movieTitle, newMovie.imageURL, newMovie.rating);
  updateUI();
}

startAddMovieBtn.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", backDropClickHandler);
cancelBtn.addEventListener("click", cancelBtnClickHandler);
addBtn.addEventListener("click", addMovieHandler);
