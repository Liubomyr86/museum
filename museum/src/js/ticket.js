const ticketBtn = document.querySelector('.tickets__btn')
const overlayElem = document.querySelector('.overlay')
const ticketForm = document.querySelector('.form')
const ticketFormBtn = document.querySelector('.form__close-btn')
const bookBtn = document.querySelector('.form__btn')


export function clickBtn() {
  ticketBtn.addEventListener('click', () => {
    overlayElem.classList.remove('hiden');
    ticketForm.classList.add('open');
    overlayElem.classList.add('open');
  })

  ticketFormBtn.addEventListener('click', () => {
    overlayElem.classList.add('hiden');
    ticketForm.classList.remove('open');
    overlayElem.classList.remove('open');
  })
}

export function rippleEffect() {
  bookBtn.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    const elementTop = bookBtn.getBoundingClientRect().top;
    const elementLeft = bookBtn.getBoundingClientRect().left;

    const xInside = x - elementLeft;
    const yInside = y - elementTop;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px'
    circle.style.left = xInside + 'px'

    bookBtn.appendChild(circle)

    const remoweTime = 500;
    setTimeout(() => circle.remove(), remoweTime);
  })
}

clickBtn()
rippleEffect()

// export {clickBtn, rippleEffect}
