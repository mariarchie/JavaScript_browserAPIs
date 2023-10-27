const photoElement = document.getElementById("photo");
const photographerElement = document.getElementById("photographer");
const likeButton = document.getElementById("likeButton");
const likesCounter = document.getElementById("likesCounter");
const prevPhotoButton = document.getElementById("prevPhoto");
const nextPhotoButton = document.getElementById("nextPhoto");

const UNSPLASH_API_KEY = 'LFy4oOoipo10nGE-PeJwt9uYGSO1YUM__RSp66NF0cA';
const UNSPLASH_URL = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_API_KEY}`;

let currentPhotoId = '';
let history = [];
let currentPhotoIndex = -1;

function loadHistoryFromLocalStorage() {
    const savedHistory = localStorage.getItem("photoHistory");
    if (savedHistory) {
        history = JSON.parse(savedHistory);
        currentPhotoIndex = history.length - 1;
        updateUIFromHistory();
    }
}

function updateButtonsState() {
    prevPhotoButton.disabled = currentPhotoIndex <= 0;
    nextPhotoButton.disabled = currentPhotoIndex >= history.length - 1;
}

function updateUIFromHistory() {
    const data = history[currentPhotoIndex];
    photoElement.src = data.urls.small;
    photographerElement.textContent = `Фотограф: ${data.user.name}`;
    currentPhotoId = data.id;
    updateLikesCounter();
    updateButtonsState();
}

function saveHistoryToLocalStorage() {
    localStorage.setItem("photoHistory", JSON.stringify(history));
}

function fetchRandomPhoto() {
    fetch(UNSPLASH_URL)
        .then(response => response.json())
        .then(data => {
            photoElement.src = data.urls.small;
            photographerElement.textContent = `Фотограф: ${data.user.name}`;
            currentPhotoId = data.id;
            history.push(data);
            currentPhotoIndex = history.length - 1;
            saveHistoryToLocalStorage();
            updateLikesCounter();
        });
}

function updateLikesCounter() {
    let likes = localStorage.getItem(currentPhotoId) || 0;
    likesCounter.textContent = likes;
}

likeButton.addEventListener('click', () => {
    let likes = localStorage.getItem(currentPhotoId) || 0;
    likes = parseInt(likes) + 1;
    localStorage.setItem(currentPhotoId, likes);
    updateLikesCounter();
});

prevPhotoButton.addEventListener('click', () => {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        updateUIFromHistory();
    }
});

nextPhotoButton.addEventListener('click', () => {
    if (currentPhotoIndex < history.length - 1) {
        currentPhotoIndex++;
        updateUIFromHistory();
    }
});

loadHistoryFromLocalStorage();
fetchRandomPhoto();
