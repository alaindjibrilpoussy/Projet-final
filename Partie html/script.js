const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const images = document.querySelector('.carousel-images');

let counter = 0;
const imageWidth = images.firstElementChild.clientWidth;
const intervalTime = 3000; // Temps en millisecondes entre chaque changement d'image
let slideInterval;

// Fonction pour passer à l'image suivante
function nextSlide() {
  if (counter >= images.children.length - 1) return;
  counter++;
  images.style.transform = `translateX(${-counter * imageWidth}px)`;
}

// Fonction pour passer à l'image précédente
function prevSlide() {
  if (counter <= 0) return;
  counter--;
  images.style.transform = `translateX(${-counter * imageWidth}px)`;
}

nextBtn.addEventListener('click', nextSlide);

prevBtn.addEventListener('click', prevSlide);

// Ajouter la pagination
const pagination = document.createElement('div');
pagination.className = 'pagination';

for (let i = 0; i < images.children.length; i++) {
  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.addEventListener('click', () => {
    counter = i;
    images.style.transform = `translateX(${-counter * imageWidth}px)`;
    setActiveDot();
  });
  pagination.appendChild(dot);
}

document.querySelector('.carousel').appendChild(pagination);

function setActiveDot() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === counter) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Lecture automatique
function startSlideShow() {
  slideInterval = setInterval(() => {
    nextSlide();
    setActiveDot();
  }, intervalTime);
}

// Arrêter la lecture automatique lorsque la souris est sur le carousel
images.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

// Reprendre la lecture automatique lorsque la souris quitte le carousel
images.addEventListener('mouseleave', startSlideShow);

// Démarrer la lecture automatique
startSlideShow();




