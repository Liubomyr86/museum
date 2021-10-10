const items = document.querySelectorAll('.slider__container .slider__item');
const leftBtn = document.querySelector('#left-control');
const rightBtn = document.querySelector('#right-control');
const welcomeSlider = document.querySelector('.welcome__slider');
const sliderDots = document.querySelectorAll('.dots__item_welcome');
const sliderDotsContainer = document.querySelector('.slider__dots');
const sliderCounter = document.querySelector('.counter__active');
let currentItem = 0;
let isEnabled = true;


function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item-active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('item-next', direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('item-next', direction);
    this.classList.add('item-active');
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}

function nextDot(n) {
  sliderDots[n].classList.remove('active_welcome');

  if (n + 1 === items.length) {
    sliderDots[0].classList.add('active_welcome');
    sliderCounter.innerText = `0${1}`
  } else {
    sliderDots[n + 1].classList.add('active_welcome');
    sliderCounter.innerText = `0${n + 2}`
  }



}
function previousDot(n) {
  sliderDots[n].classList.remove('active_welcome');

  if (n - 1 === -1) {
    sliderDots[items.length - 1].classList.add('active_welcome');
    sliderCounter.innerText = `0${5}`
  } else {
    sliderDots[n - 1].classList.add('active_welcome');
    sliderCounter.innerText = `0${n}`
  }

}

leftBtn.addEventListener('click', function() {
  if (isEnabled) {
    previousDot(currentItem);
    previousItem(currentItem);
  }
});

rightBtn.addEventListener('click', function() {

  if (isEnabled) {
    nextDot(currentItem)
    nextItem(currentItem);
  }
});

const swipedetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distanceX = 0;
  let distanceY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let thresholdForSwipe = 150;
  let restraint = 100;
  let allowedTime = 500;

  surface.addEventListener('mousedown', function(event) {
    startX = event.pageX;
    startY = event.pageY;
    startTime = new Date().getTime();
    event.preventDefault();
  });

  surface.addEventListener('mouseup', function(event) {
    distanceX = event.pageX - startX;
    distanceY = event.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distanceX) >= thresholdForSwipe && Math.abs(distanceY) <= restraint) {
        if (distanceX > 0) {
          if (isEnabled) {
            previousDot(currentItem);
            previousItem(currentItem)
          }
        } else {
          if (isEnabled) {
            nextDot(currentItem)
            nextItem(currentItem)
          }
        }
      }
    }
    event.preventDefault();
  })

  surface.addEventListener('touchstart', function(event) {
    let touchObj = event.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    event.preventDefault();
  });

  surface.addEventListener('touchmouve', function(event) {
    event.preventDefault();
  });

  surface.addEventListener('touchend', function(event) {
    let touchObj = event.changedTouches[0];
    distanceX = touchObj.pageX - startX;
    distanceY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distanceX) >= thresholdForSwipe && Math.abs(distanceY) <= restraint) {
        if (distanceX > 0) {
          if (isEnabled) {
            previousDot(currentItem);
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextDot(currentItem);
            nextItem(currentItem);
          }
        }
      }
    }
    event.preventDefault();
  })
};

const changeDot = (el) => {
  let dots = el;

  dots.addEventListener('click', function(event) {
    let target = event.target;
    let itemIndex = +target.dataset.index;
    if (!target.classList.contains('active_welcome')) {
      sliderDots.forEach( (dot) => {
        dot.classList.remove('active_welcome');
      });

      if (itemIndex > currentItem) {
        if (isEnabled) {
          nextDot(itemIndex - 1);
          nextItem(itemIndex - 1);
        }
      } else {
        if (isEnabled) {
          previousDot(itemIndex + 1);
          previousItem(itemIndex + 1);
        }
      }
    }
  });
};

swipedetect(welcomeSlider);
changeDot(sliderDotsContainer);
