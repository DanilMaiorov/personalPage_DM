/*BURGER MENU*/

const header = document.querySelector('.header'); //сделать делегирование и закрытие меню по клику на ссылки

const burgerBtn = document.querySelector('.burger__button');
const burgerLineBtn = document.querySelector('.burger__button-line');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');

const burgerMenuOpen = () => {
  headerMenu.classList.toggle('active');
  burgerBtn.classList.toggle('active');
    disableScrolling();
    if(!burgerBtn.classList.contains('active')) {
      window.onscroll = function () {};
    }
};

const burgerMenuClose = (menu, btn) => {
  window.onscroll = function () {};
  menu.classList.remove('active');
  btn.classList.remove('active');
};

//функция дисейблер скроллинга
const disableScrolling = () => {
  const x = window.scrollX;
  const y = window.scrollY;
  window.onscroll = function () {
      window.scrollTo(x, y) ;
  };
};

/*LOGO ANIMATE */
const words = document.querySelectorAll('.logo__link-span');
let wordArray = [];
let currentWord = 0;

window.addEventListener('DOMContentLoaded', () => {
  wordArray.forEach(item => {
    for (let i = 0; i < item.length; i++) {
      item[i].style.color = 'white';
      if (i > 5) {
        item[i].style.color = 'black';
      }
    }
  });
});

words[currentWord].style.opacity = 1;
for (let i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  let cw = wordArray[currentWord];
  let nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
  for (let i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  for (let i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;

    animateLetterIn(nw, i);
  }
  currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
  setTimeout(function () {
    cw[i].className = 'letter out';
  }, i * 80);
}

function animateLetterIn(nw, i) {
  setTimeout(function () {
    nw[i].className = 'letter in';
  }, 340 + (i * 80));
}

function splitLetters(word) {
  let content = word.innerHTML;
  word.innerHTML = '';
  let letters = [];
  for (let i = 0; i < content.length; i++) {
    let letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.append(letter);
    letters.push(letter);
  }
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 5000);

/*PORTFOLIO TABS */

const portfolioList = document.querySelector('.portfolio__list');
const cardsWrapper = document.querySelector('.portfolio__cards');
const cardInfo = document.querySelector('.portfolio__cards-info');
let landingCards = [];
let multiPageCards = [];
let miniAppCards = [];
let renderArray = [];

class PortfolioCard {
  constructor(id, title, date, description, stack, type, images = [], parentSelector) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.description = description;
    this.stack = stack;
    this.images = images;
    this.type = type;
    this.parent = document.querySelector(parentSelector);
  }
  renderMainCard() {
    const card = document.createElement('div');
    card.classList.add('portfolio__cards-item', 'hide');
    card.setAttribute('data-type', `${this.type}`);
    card.setAttribute('data-num', `${this.id - 1}`);
    card.innerHTML = `
    <div class="portfolio__cards-image">
      <img src="${this.images[0]}" alt="portfolio-site-1">
    </div>
    <div class="portfolio__cards-title">${this.title}</div>
    <div class="portfolio__cards-date">${this.date}</div>
    `;
    this.parent.append(card);
    setTimeout(() => {
      card.classList.remove('hide');
      card.classList.add('active');
    }, 200);
  }
  imagesRender(item) {
    item.images.slice(1).forEach(img => {
      const images = document.createElement('img');
      images.setAttribute('src', `${img}`);
      const imagesWrapper = document.querySelector('.portfolio__cards-info-images');
      imagesWrapper.append(images);
    });
  }
  renderInfo() {
    cardInfo.style.display = 'flex';
    cardInfo.innerHTML = `
      <div class="portfolio__cards-info-wrapper">
        <div class="portfolio__cards-info-content">
          <div class="portfolio__cards-info-title"> ${this.title} </div>
          <div class="portfolio__cards-info-description"> 
          ${this.description} 
          </div>
          <div class="portfolio__cards-info-stack"> 
            <span class="portfolio__cards-info-stack--span">Использованные технологии:</span> ${this.stack} 
          </div>
          <div class="portfolio__cards-info-date"> ${this.date} </div>
          <div class="portfolio__cards-info-images"></div>
          <div class="portfolio__cards-info-buttons">
            <button class="button portfolio__cards-info-buttons-item">Посмотреть</button>
            <button class="button portfolio__cards-info-buttons-item">Перейти на GitHub</button>
          </div>
          <div class="portfolio__cards-info-close"></div>
      </div>
    </div>
    `;
    setTimeout(() => {
      cardInfo.classList.add('show');
      document.querySelector('.portfolio__cards-info-content').classList.add('show-content');
    }, 10);
    this.closeCardInfo();
  }
  closeCardInfo() {
    if (cardInfo) {
      cardInfo.addEventListener('click', (e) => {
        if (!e.target.closest('.portfolio__cards-info-content') || e.target.classList.contains('portfolio__cards-info-close')) {
          cardInfo.classList.remove('show');
          window.onscroll = function () {};
          document.querySelector('.portfolio__cards-info-content').classList.remove('show-content');
          setTimeout(() => {
            cardInfo.style.display = 'none';
          }, 300);
        }
      });
    } else {
      return;
    }
  }
}

////////////////////////////////////////////////////////////

const getData = async (url) => { //функция getData
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }
  return await response.json();
};

////////////////////////////////////////////////////////////




getData('./db/db.json') //вызов getData для карточек портфолио
  .then(data => {
    data.forEach(({
      id,
      title,
      date,
      description,
      stack,
      type,
      images
    }) => {
      let newCard = new PortfolioCard(id, title, date, description, stack, type, images, '.portfolio__cards');
      newCard.renderMainCard();
      for (let key in newCard) {
        if (newCard[key] === 'landing-page') {
          landingCards.push(newCard);
        }
        if (newCard[key] === 'multi-page') {
          multiPageCards.push(newCard);
        }
        if (newCard[key] === 'mini-app') {
          miniAppCards.push(newCard);
        }
      }
      renderArray.push(newCard);
    });
    const renderArr = async (arr) => {
      return await arr.forEach(item => {
        item.renderMainCard();
      });
    };
    const animRender = (arr) => { //отрисовка анимации
      cardsWrapper.classList.add('hide');
      setTimeout(() => {
        cardsWrapper.innerHTML = '';
        renderArr(arr);
        cardsWrapper.classList.remove('hide');
      }, 200);
    };
    const renderCards = (arr, elem) => {
      if (elem.classList.contains('item-active')) {
        return;
      } else {
        animRender(arr);
      }
    };
    portfolioList.addEventListener('click', (e) => {
      const target = e.target;
      if (target.dataset.project === '0') {
        renderCards(renderArray, target);
      }
      if (target.dataset.project === '1') {
        renderCards(landingCards, target);
      }
      if (target.dataset.project === '2') {
        renderCards(multiPageCards, target);
      }
      if (target.dataset.project === '3') {
        renderCards(miniAppCards, target);
      }
      document.querySelectorAll('.portfolio__list-item').forEach((item, index) => {
        if (target.dataset.project == index) {
          item.classList.add('item-active');
        } else {
          item.classList.remove('item-active');
        }
      });
    });
    cardsWrapper.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName == 'IMG') {
        renderArray.forEach((item, index) => {
          if (target.parentNode.parentNode.dataset.num == index) {
            item.renderInfo();
            item.imagesRender(item);
            disableScrolling();
          }
        });
      }
    });
  });



/* BLOG */

class BlogCard {
  constructor(id, title, date, text, tags, image, parentSelector) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.text = text;
    this.tags = tags;
    this.image = image;
    this.parent = document.querySelector(parentSelector); //blog__content
  }
  renderBlogCard() {
    const blogCard = document.createElement('div');
    blogCard.classList.add('content-item');
    blogCard.setAttribute('data-blog', `${this.id}`);
    blogCard.innerHTML = `
      <div class="content-item__title">${this.title}</div>
      <div class="content-item__wrapper">
        <div class="content-item__image">
          <img src="${this.image}" alt="">
        </div>
      </div>
      <div class="content-item__button">
        <button class="content-item__button-item">Читать далее</button>
      </div>
    `;
    this.parent.append(blogCard);
    this.renderParagraphs();
  }
  renderParagraphs() {
    for (let key in this.text) {
      const par = document.createElement('p');
      par.classList.add('content-item__text');
      par.textContent = this.text[key];
      const itemWrapper = document.querySelectorAll('.content-item__wrapper');
      itemWrapper.forEach((wrap, index) => {
        if (this.id - 1 == index) {
          wrap.append(par);
        }
      });
    }
  }

}
let numberBlog;
getData('./db/dbBlog.json')
  .then(data => {
    data.forEach(({
      id,
      title,
      date,
      text,
      tags,
      image
    }) => {
      let newBlogCard = new BlogCard(id, title, date, text, tags, image, '.blog__content');
      newBlogCard.renderBlogCard();
    });
      const blogItems = document.querySelectorAll('.content-item');
      blogItems.forEach(item => {
        slicer(item);
      });
      const blogBtns = document.querySelectorAll('.content-item__button-item');
      blogBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          if(e.target === btn) {
            numberBlog = (index + 1);
            console.log(numberBlog);
            window.open('./blog.html?&' + numberBlog);
          }
        });
      });
  });
  console.log(numberBlog);

  //slicer
const slicer = (par) => {
  let arrLength = [];
  let sliceLengths = [];
  let symbolsStop = 500;
  let amount = 0;
  let parCollection = par.querySelectorAll('p');
  parCollection.forEach(item => {
    arrLength.push(item.textContent.length);
    item.style.display = 'none';
  });

  arrLength.forEach(item => {
    amount += item;
    while (amount - symbolsStop > 0) {
      sliceLengths.push(item);
      break;
    }
  });
  let res = 0;
  const sumLength = (arr) => {
    return arr.reduce((a, b) => a + b);
  };
  const addDots = () => {
    return newArray[newArray.length - 1].textContent.slice(0, res).trim() + '...';
  };
  if (sliceLengths.length && arrLength.length !== 0) {
    const oldArr = arrLength.splice(-sliceLengths.length);
    arrLength.push(sliceLengths[0] = (symbolsStop - sumLength(arrLength)));
    res = arrLength[arrLength.length - 1];
  }
  const newArray = Array.from(parCollection);
  const slicedArray = newArray.splice(arrLength.length);
  if (sumLength(arrLength) === symbolsStop || (arrLength.length == 1 && arrLength[0] >= symbolsStop)) {
    newArray[newArray.length - 1].textContent = addDots();
  }
  if (sumLength(arrLength) > symbolsStop) {
  }
  newArray.forEach(item => {
    item.textContent = item.textContent;
    item.style.display = 'block';
  });
};

/*SMOOTH SCROLL*/

const linksHeader = header.querySelectorAll('.header__link');

linksHeader.forEach((item, index) => {
  item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item = e.target) {
          let idAnchor = item.getAttribute('href');
          document.querySelector(idAnchor).scrollIntoView({
              block: 'start',
              behavior: 'smooth'
          });
      }
      burgerMenuClose(headerMenu, burgerBtn);
  });
});



//formSend

const form = document.querySelector('form');

const message = {
  loading: 'Отправляю сообщение...',
  loadingImg: './img/tumblr_mudg73OFlK1rgpyeqo1_500.gif',
  success: 'Спасибо, за доверие! Я отвечу вам в ближайшее время!',
  successImg: './img/okcatt.gif',
  failure: 'Что-то пошло не так',
  failureImg: './img/error.png',
};

///////////////////////////////////

const sendData = async (url, data) => { //postData
  const resolve = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await resolve.json();
};

////////////////////////////////////

/*VALIDATION */

const inputName = document.querySelector('.name-input');
const inputEmail = document.querySelector('.email-input');
const formTextarea = document.querySelector('.contact__form-textarea-item');
const formInputs = [inputName, inputEmail, formTextarea];

const testEmail = (email) => {
  let test = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/gi;
  return test.test(String(email).toLowerCase());
};

inputName.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9a-zA-Zа-яА-Я]+/, '');
});
formTextarea.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9a-zA-Zа-яА-Я\.\,\!\?\+\=\%\@\-\_]+/, '');
});
const notice = document.createElement('div');
notice.classList.add('notice');

const empty = document.createElement('div');
empty.classList.add('empty');

const emptyRemove = () => {
  formInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      if(e.target.value) {
        input.classList.remove('error');
      }
      if(inputName.value && inputEmail.value && formTextarea.value) {
        empty.remove();
      }
    }); 
  });
};
emptyRemove();

const noticeRemove = (field) => {
  field.addEventListener('input', () => {
      if(field.value) {
        field.classList.remove('error');
        notice.remove();
      }
    });
};
noticeRemove(inputEmail);
noticeRemove(formTextarea);

const noticeAdd = (inputItem, text, elem) => {
  inputItem.classList.add('error');
  elem.textContent = text;
  form.append(elem);
};

const remover = (inputItem) => {
  noticeRemove(inputItem);
  inputItem.classList.remove('error');
};

const validate = () => {
  let nameValue = inputName.value;
  let emailValue = inputEmail.value;
  let messageValue = formTextarea.value;
  let emptyInputs = Array.from(formInputs).filter(input => input.value === '');
  formInputs.forEach(input => {
    if(input.value === '') {
      noticeAdd(input, 'Поля не должны быть пустыми', empty);
    } else {
      input.classList.remove('error');
    }
  });
  if(emptyInputs.length !== 0) {
    return false;
  }
  if(!testEmail(emailValue)) {
    noticeAdd(inputEmail, 'Некорректный E-mail', notice);
    return false;
  } else {
    remover(inputEmail);
  }
  if(messageValue.length < 10) {
    noticeAdd(formTextarea, 'Минимум 10 символов', notice);
    return false;
  } else {
    remover(formTextarea);
  }
  return true;
};

/*ОТПРАВКА ФОРМЫ */

const bindPostData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');

      if(validate()) {
        showLoadBlock(form, statusMessage);
      }
      const formData = new FormData(form);
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      if(validate()) {
        sendData(/*'./server.php'*/'https://jsonplaceholder.typicode.com/posts', JSON.stringify(object)).then(data => {
          console.log(data);
          setTimeout(() => {
            showResultBlock(form, statusMessage, message.successImg, message.success);
            setTimeout(() => {
              renderForm(form, statusMessage);
            }, 2000);
          }, 1000);
        }).catch(() => {
          showResultBlock(form, statusMessage, message.failureImg, message.failure);
          setTimeout(() => {
            renderForm(form, statusMessage);
          }, 2500);
        }).finally(() => {
          form.reset();
        });
      } else {
        return;
      }
    }); 
};
bindPostData(form);

/*функции отрисовки сообщения*/
const showLoadBlock = (form, block) => {
  Array.from(form.children).forEach(item => {
    item.style.display = 'none';
  });
  block.textContent = message.loading;
  block.innerHTML = `
    <img src="${message.loadingImg}" alt="load-cat">
    ${block.textContent}
  `;
  form.append(block);
};
const showResultBlock = (form, block, resultImg, result) => {
  block.innerHTML = `
  <img src="${resultImg}" alt="load-cat">
  ${block.textContent = result}
    `;
  form.reset();
};
const renderForm = (form, block) => {
  block.remove();
  Array.from(form.children).forEach(item => {
    item.style.display = 'block';
  });
};




//observer
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
          if(entries[0].isIntersecting && count === 0) {
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


//open burger
burgerBtn.addEventListener('click', burgerMenuOpen);



