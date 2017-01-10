const slides = document.querySelectorAll('.slides');
const pickers = document.querySelectorAll('.picker > li');
const sliderLength = slides.length;
let choosenSlide = 0;
let sliderInterval;

slides[0].style.height = 'auto';
slides[0].style.opacity = 1;
pickers[0].classList.add('picked');

function autoSlideChnange() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => {
    ++choosenSlide;
    if (sliderLength % (choosenSlide + 1) === sliderLength) {
      onSlideShow(0);
      choosenSlide = 0;
    } else {
      onSlideShow(choosenSlide);
    }
  }, 15000);
}

autoSlideChnange();

// IE hack for nodeList foreach
[].forEach.call(pickers, (picker) => {
  picker.addEventListener('click', (e) => {
    onSlideShow(parseInt(e.target.getAttribute('data-id')));
    picker.classList.add('picked');
  });
});

function deletePickedClass() {
  [].forEach.call(pickers, (picker) => {
    picker.classList.remove('picked');
  });
}

function onSlideShow(currSide) {
  choosenSlide = currSide;
  [].forEach.call(slides, (slide, index) => {
    if (index === currSide) {
      slide.style.opacity = 1;
      slide.style.height = 'auto';
    } else {
      slide.style.opacity = 0;
      slide.style.height = 0;
    }
  });
  deletePickedClass();
  pickers[currSide].classList.add('picked');
  autoSlideChnange();
}

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../worker.js').then((reg) => {
    console.log('ServiceWorker registered');
    console.log(reg);
  }, (err) => {
    console.log('Error happend during registering ServiceWorker');
    console.log(err);
  });
} else {
  console.log('Your browser does not support serviceWorker :(');
}