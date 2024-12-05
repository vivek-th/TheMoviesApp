const form = document.getElementById("form");
const search = document.getElementById("search");
const SEARCH_URL ="https://api.themoviedb.org/3/search/movie?api_key=36b8863b396c558efb94367639136716&query=";
const API_URL= 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=36b8863b396c558efb94367639136716'
const IMAGE_PATH = "https://image.tmdb.org/t/p/w300/";


async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  displayMovies(data.results);
}

getMovies(API_URL)

function displayMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    console.log(title);
    movieElement.classList.add("movie");
    movieElement.innerHTML = `   
        <img src="${IMAGE_PATH}${poster_path}" alt=${title}/>
        <div class="movie-info">
             <h3>${title}</h3>
             <span class=${getClassesbyRating(vote_average)}>${vote_average}</span>
            <h3 class="overview">Overview:${overview} </h3>
        </div>
        `;

        
    main.appendChild(movieElement);

  
  });
};

function getClassesbyRating(rating){
if(rating>=8){
    return 'green'
}else if(rating>=5){
    return "orange"
}   else{
    return 'red'
}
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = search.value;

  if (searchValue != null) {
    getMovies(SEARCH_URL + searchValue);
    search.value=''
  } else {
    window.location.reload();
  }
});
