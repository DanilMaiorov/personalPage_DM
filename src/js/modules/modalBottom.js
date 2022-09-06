import {
  disableScrolling
} from './helpers.js';

const modalBottom = () => {
  const modal = document.querySelector('.modal');
  const modalContent = modal.querySelector('.modal__window');
  const openModal = () => {
    modal.classList.remove('modal-hide');
    modal.classList.add('modal-show');
    modalContent.classList.add('modal__window--active');
    disableScrolling();

  };
  const modalClose = () => {
    modal.classList.remove('modal-show');
    modal.classList.add('modal-hide');
    modalContent.classList.remove('modal__window--active');
  };

  modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__window') || e.target.classList.contains('modal__close')) {
      modalClose();
      window.onscroll = function () {};
    }
  });

  const endElem = document.createElement('div');
  document.querySelector('.footer').append(endElem);
  let count = 0;
  const scrollEnd = (endElement) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && count === 0) {
          count++;
          openModal();
        }
      }, {
        rootMargin: '100px',
      }
    );
    observer.observe(endElement);
  };
  scrollEnd(endElem);
};

export default modalBottom;