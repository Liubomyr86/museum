
const gallerInnerPictures = document.querySelector('.gallery__inner-pictures');

const imgPath = [
  './assets/img/galery/galery1.jpg',
  './assets/img/galery/galery2.jpg',
  './assets/img/galery/galery3.jpg',
  './assets/img/galery/galery4.jpg',
  './assets/img/galery/galery5.jpg',
  './assets/img/galery/galery6.jpg',
  './assets/img/galery/galery7.jpg',
  './assets/img/galery/galery8.jpg',
  './assets/img/galery/galery9.jpg',
  './assets/img/galery/galery10.jpg',
  './assets/img/galery/galery11.jpg',
  './assets/img/galery/galery12.jpg',
  './assets/img/galery/galery13.jpg',
  './assets/img/galery/galery14.jpg',
  './assets/img/galery/galery15.jpg',
]

export const createGallery = () => {
  imgPath.sort(() => Math.random() - 0.5)
  imgPath.map((elem) => {
    const image = document.createElement('img')
    image.classList.add('gallery__img', 'js-scroll', 'fade-in-bottom')
    image.src = elem
    image.alt = 'gallery__img'
    gallerInnerPictures.append(image)
  })
}

export const checkSlide =() => {
  const scrollElements = document.querySelectorAll('.js-scroll');
  let throttleTimer;

  const throttle = (callback, time) => {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout( () => {
      callback();
      throttleTimer = false;
    }, time);
  }

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  }

  const elementOutOfView = (el) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
      elementTop > (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else if (elementOutOfView(el)) {
        hideScrollElement(el)
      }
    })
  }

  window.addEventListener("scroll", () => {
    throttle(() => {
      handleScrollAnimation();
    }, 250);
  });
}

createGallery();
checkSlide();
