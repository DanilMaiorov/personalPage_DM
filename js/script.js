/*BURGER MENU*/

const header = document.querySelector('.header'); //сделать делегирование и закрытие меню по клику на ссылки

const burgerBtn = document.querySelector('.burger__button');
const burgerLineBtn = document.querySelector('.burger__button-line');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');
burgerBtn.addEventListener('click', (e) => {
  headerMenu.classList.toggle('active');
  burgerBtn.classList.toggle('active');
  body.classList.toggle('lock');
/*   if(headerMenu.classList.contains('active')) {
    document.querySelector('.header__inner').style.paddingRight = '17px';
    document.querySelector('.portfolio__content').style.paddingRight = '17px';
  } else {
    document.querySelector('.header__inner').style.paddingRight = '0px';
    document.querySelector('.portfolio__content').style.paddingRight = '0px';
  } */
});



/*LOGO ANIMATE */

const words = document.querySelectorAll('.logo__link-span');
let wordArray = [];
let currentWord = 0;

window.addEventListener('DOMContentLoaded', () => {
  wordArray.forEach(item => {
    for (let i = 0; i < item.length; i++) {
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
//setInterval(changeWord, 5000); 


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
      //document.querySelector('body').style.overflow = 'hidden';
/*       document.querySelector('.header__inner').style.paddingRight = '17px';
      document.querySelector('.portfolio__content').style.paddingRight = '17px'; */

      //document.querySelector('.wrapper').style.paddingRight = '17px';

      document.querySelector('.portfolio__cards-info-content').classList.add('show-content');
    }, 10);
    this.closeCardInfo();
    //body.classList.add('lock');
  }

  closeCardInfo() {
    if (cardInfo) {
      cardInfo.addEventListener('click', (e) => {
        if (!e.target.closest('.portfolio__cards-info-content') || e.target.classList.contains('portfolio__cards-info-close')) {
          cardInfo.classList.remove('show');
          body.classList.remove('lock');
          document.querySelector('.portfolio__cards-info-content').classList.remove('show-content');
          //document.querySelector('.portfolio__cards-info-wrapper').style.overflowY = 'clip';
/*           document.querySelector('.header__inner').style.paddingRight = '0px';
          document.querySelector('.portfolio__content').style.paddingRight = '0px'; */
          //document.querySelector('body').style.overflow = 'auto';

          //document.querySelector('.wrapper').style.paddingRight = '0px';

          console.log(document.querySelector('.portfolio__cards-info-wrapper'));
          setTimeout(() => {
            cardInfo.style.display = 'none';
          }, 300);
        }
      });
      console.log('est');
    } else {
      return;
    }
  }
}
const getData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }
  return await response.json();
};
getData('./db/db.json')
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
      //console.log(newCard);
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
    /*     console.log(renderArray);
        console.log(landingCards);
        console.log(multiPageCards);
        console.log(miniAppCards); */

    cardsWrapper.addEventListener('click', (e) => {
      const target = e.target
      if (target.tagName == 'IMG') {
        renderArray.forEach((item, index) => {
          if (target.parentNode.parentNode.dataset.num == index) {
            console.log(item);
            item.renderInfo();
            item.imagesRender(item);
          }
        });
      }
    });

  });