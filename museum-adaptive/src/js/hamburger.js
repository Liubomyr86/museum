const MENU_BUTTON = document.querySelector('.hamburger');
const MENU = document.querySelector('.navigation-header');
const NAV_LINKS = document.querySelectorAll('.navigation__link');
const SOC_LINKS = document.querySelectorAll('.social__link');
const welcomeContent = document.querySelector('.welcome__content')

const hamburgerListner = () => {
  const  menuOpen = () => {
    MENU_BUTTON.classList.toggle('open')
    MENU.classList.toggle('open')
    welcomeContent.classList.toggle('hiden')
  }

  const menuClose = () => {
    MENU_BUTTON.classList.remove('open')
    MENU.classList.remove('open')
    welcomeContent.classList.remove('hiden')
  }

  MENU_BUTTON.addEventListener('click', menuOpen);
  NAV_LINKS.forEach((link) => {
    link.addEventListener('click', menuClose);
  });
  SOC_LINKS.forEach((link) => {
    link.addEventListener('click', menuClose);
  });
}



export default hamburgerListner();