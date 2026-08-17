let movies = JSON.parse(localStorage.getItem("movies")) || [];

let selectedRating = 0;


/* =========================
   HEART RATING
========================= */

const hearts = document.querySelectorAll(".heart");

hearts.forEach(heart => {

    heart.addEventListener("click", function() {

        selectedRating = Number(this.dataset.rating);

        updateHearts();

    });

});


function updateHearts() {

    hearts.forEach(heart => {

        const rating = Number(heart.dataset.rating);

        if (rating <= selectedRating) {

            heart.textContent = "♥";

            heart.classList.add("active");

        } else {

            heart.textContent = "♡";

            heart.classList.remove("active");

        }

    });


    const ratingText = document.getElementById("ratingText");


    const messages = {

        1: "Not really for me ♡",

        2: "It was okay ♡",

        3: "I liked it ♡",

        4: "I really liked it! ♡",

        5: "I LOVED IT! ♡"

    };


    if (selectedRating > 0) {

        ratingText.textContent = messages[selectedRating];

    } else {

        ratingText.textContent = "Click the hearts to rate";

    }

}


/* =========================
   ADD MOVIE
========================= */

function addMovie() {

    const title =
        document.getElementById("movieTitle").value.trim();

    const selectedGenres = Array.from(
    document.querySelectorAll(
        ".genre-option input:checked"
    )
).map(checkbox => checkbox.value);

const genre = selectedGenres.join(" • ");

    const poster =
        document.getElementById("moviePoster").value.trim();

    const review =
        document.getElementById("movieReview").value.trim();

    const likes =
        document.getElementById("movieLikes").value.trim();

    const dislikes =
        document.getElementById("movieDislikes").value.trim();


    if (title === "") {

        alert("Please enter the movie title ♡");

        return;

    }


    if (selectedRating === 0) {

        alert("Please choose your heart rating ♡");

        return;

    }


    if (review === "") {

        alert("Tell me your thoughts about the movie first ♡");

        return;

    }


    const movie = {

        id: Date.now(),

        title: title,

        genre: genre || "Movie",

        poster: poster,

        rating: selectedRating,

        review: review,

        likes: likes,

        dislikes: dislikes

    };


    movies.push(movie);


    localStorage.setItem(
        "movies",
        JSON.stringify(movies)
    );


    clearForm();

    displayMovies();

}


/* =========================
   DISPLAY MOVIES
========================= */

function displayMovies() {

    const movieList =
        document.getElementById("movieList");

    const emptyMessage =
        document.getElementById("emptyMessage");

    const search =
        document
        .getElementById("searchMovie")
        .value
        .toLowerCase();


    movieList.innerHTML = "";


    const filteredMovies = movies.filter(movie =>

        movie.title
        .toLowerCase()
        .includes(search)

    );


    if (filteredMovies.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    filteredMovies.forEach(movie => {

        const card =
            document.createElement("div");

        card.className = "movie-card";


        let posterImage = movie.poster;


        if (!posterImage) {

            posterImage =
                "https://placehold.co/500x750/fbe8ef/9b6578?text=No+Poster";

        }


        let heartDisplay = "";


        for (let i = 1; i <= 5; i++) {

            if (i <= movie.rating) {

                heartDisplay += "♥";

            } else {

                heartDisplay += "♡";

            }

        }


        card.innerHTML = `

            <img
                src="${posterImage}"
                alt="${movie.title}"
                onerror="this.src='https://placehold.co/500x750/fbe8ef/9b6578?text=No+Poster'"
            >

            <div class="movie-info">

                <h3>
                    ${escapeHTML(movie.title)}
                </h3>

                <div class="genre">
                    ${escapeHTML(movie.genre)}
                </div>

                <div class="card-rating">
                    ${heartDisplay}
                </div>


                <h4>♡ My Insight</h4>

                <p>
                    ${escapeHTML(movie.review)}
                </p>


                <h4>♡ What I Liked</h4>

                <p>
                    ${escapeHTML(
                        movie.likes || "Nothing added."
                    )}
                </p>


                <h4>♡ What I Didn't Like</h4>

                <p>
                    ${escapeHTML(
                        movie.dislikes || "Nothing added."
                    )}
                </p>


                <button
                    class="delete-btn"
                    onclick="deleteMovie(${movie.id})"
                >
                    Remove from Diary
                </button>

            </div>

        `;


        movieList.appendChild(card);

    });

}


/* =========================
   DELETE MOVIE
========================= */

function deleteMovie(id) {

    const confirmed =
        confirm("Remove this movie from your diary?");


    if (!confirmed) {

        return;

    }


    movies =
        movies.filter(movie => movie.id !== id);


    localStorage.setItem(
        "movies",
        JSON.stringify(movies)
    );


    displayMovies();

}


/* =========================
   CLEAR FORM
========================= */

function clearForm() {

    document.getElementById("movieTitle").value = "";

   document.querySelectorAll(
    ".genre-option input"
).forEach(checkbox => {

    checkbox.checked = false;

});

    document.getElementById("moviePoster").value = "";

    document.getElementById("movieReview").value = "";

    document.getElementById("movieLikes").value = "";

    document.getElementById("movieDislikes").value = "";


    selectedRating = 0;

    updateHearts();

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================
   START WEBSITE
========================= */

displayMovies();