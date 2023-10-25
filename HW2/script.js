let currentImageIndex = 0;

const images = ["img/img1.jpeg", "img/img2.jpeg", "img/img3.avif"];

const imageElement = document.getElementById("currentImage");
const navigationDotsContainer = document.querySelector(".navigation-dots");

function updateImage() {
    imageElement.src = images[currentImageIndex];

    const dots = Array.from(navigationDotsContainer.children);
    dots.forEach((dot, index) => {
        dot.className = index === currentImageIndex ? 'active' : '';
    });
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
}

images.forEach((image, index) => {
    const dot = document.createElement("span");
    dot.onclick = () => {
        currentImageIndex = index;
        updateImage();
    };
    navigationDotsContainer.appendChild(dot);
});

updateImage();
