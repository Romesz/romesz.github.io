(function () {
'use strict';

var slides = document.querySelectorAll('.slides');
var pickers = document.querySelectorAll('.picker > li');
var sliderLength = slides.length;
var choosenSlide = 0;
var sliderInterval = void 0;

slides[0].style.height = 'auto';
slides[0].style.opacity = 1;
pickers[0].classList.add('picked');

function autoSlideChnange() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(function () {
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
[].forEach.call(pickers, function (picker) {
  picker.addEventListener('click', function (e) {
    onSlideShow(parseInt(e.target.getAttribute('data-id')));
    picker.classList.add('picked');
  });
});

function deletePickedClass() {
  [].forEach.call(pickers, function (picker) {
    picker.classList.remove('picked');
  });
}

function onSlideShow(currSide) {
  choosenSlide = currSide;
  [].forEach.call(slides, function (slide, index) {
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

}());
//# sourceMappingURL=index.js.map
