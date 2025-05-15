// 🔶 Supprime les anciens surlignages
function removeHighlights() {
    const highlights = document.querySelectorAll(".highlight");
    highlights.forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize(); // fusionne les textes adjacents
    });
}

// 🔶 Surligne le texte trouvé sans utiliser innerHTML (plus sûr)
function highlightText(node, keyword) {
    const regex = new RegExp(`(${keyword})`, "gi");
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    textNodes.forEach(textNode => {
        const value = textNode.nodeValue;
        if (regex.test(value)) {
            const fragments = value.split(regex);
            const parent = textNode.parentNode;
            const newNodes = document.createDocumentFragment();

            fragments.forEach(part => {
                if (part.toLowerCase() === keyword.toLowerCase()) {
                    const span = document.createElement("span");
                    span.className = "highlight";
                    span.textContent = part;
                    newNodes.appendChild(span);
                } else {
                    newNodes.appendChild(document.createTextNode(part));
                }
            });

            parent.replaceChild(newNodes, textNode);
        }
    });
}

// 🔶 Recherche déclenchée par l’utilisateur
function searchKeyword() {
    removeHighlights(); // nettoie les anciens

    const keyword = document.getElementById("searchInput").value.trim();
    if (!keyword) {
        alert("Veuillez entrer un mot clé.");
        return;
    }

    const contentZones = document.querySelectorAll("main, .glossaire-content, footer");
    contentZones.forEach(zone => {
        highlightText(zone, keyword);
    });
}

// 🔶 CARROUSEL D’IMAGES
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-track img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Navigation
nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Mise à jour au redimensionnement et chargement
window.addEventListener('resize', updateCarousel);
window.addEventListener('load', updateCarousel); // 👍 Ajout important

function initVideoCarousel() {
    const carousel = document.getElementById('video-carousel');
    const track = carousel.querySelector('.carousel-track');
    const videos = track.querySelectorAll('video');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    
    let index = 0;

    function updateCarousel() {
        const width = videos[0].clientWidth;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (index < videos.length - 1) {
            index++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
}

// Lance uniquement le carrousel vidéo après chargement
document.addEventListener("DOMContentLoaded", () => {
    initVideoCarousel();
});

