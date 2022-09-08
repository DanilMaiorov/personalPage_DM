import {
  disableScrolling
} from './helpers.js';

const burger = () => {
  const header = document.querySelector('.header'); //сделать делегирование и закрытие меню по клику на ссылки
  const burgerBtn = header.querySelector('.burger__button');
  const burgerLineBtn = document.querySelector('.burger__button-line');
  const headerMenu = header.querySelector('.header__menu');
  const body = document.querySelector('body');

  const linksHeader = header.querySelectorAll('.header__link');

  seamless.polyfill();
  const burgerMenuOpen = () => {
    headerMenu.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    disableScrolling();
    if (!burgerBtn.classList.contains('active')) {
      window.onscroll = function () {};
    }
  };

  const burgerMenuClose = (menu, btn) => {
    window.onscroll = function () {};
    menu.classList.remove('active');
    btn.classList.remove('active');
  };

  linksHeader.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let idAnchor = item.getAttribute('href').substring(1);
      const section = document.getElementById(idAnchor);
      if(section) {
        section.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      } else {
        seamless.elementScrollIntoView(document.querySelector('#contacts'), {
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
      });
      }
      burgerMenuClose(headerMenu, burgerBtn);
    });
  });
  burgerBtn.addEventListener('click', burgerMenuOpen);
};

export default burger;