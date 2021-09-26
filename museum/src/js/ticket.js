const ticketBtn = document.querySelector('.tickets__btn')
const overlayElem = document.querySelector('.overlay')
const ticketsForm = document.querySelector('.form')
const ticketFormBtn = document.querySelector('.form__close-btn')


 const clickBtn = () => {
  ticketBtn.addEventListener('click', () => {
    overlayElem.classList.remove('hiden');
    ticketsForm.classList.add('open');
    overlayElem.classList.add('open');
  })

  ticketFormBtn.addEventListener('click', () => {
    overlayElem.classList.add('hiden');
    ticketsForm.classList.remove('open');
    overlayElem.classList.remove('open');
  })


}

export default clickBtn()
