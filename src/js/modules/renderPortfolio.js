import {
  getData
} from './getData.js';
import {
  disableScrolling
} from './helpers.js';

const renderPortfolio = () => {
  const portfolioList = document.querySelector('.portfolio__list');
  const cardsWrapper = document.querySelector('.portfolio__cards');
  const cardInfo = document.querySelector('.portfolio__cards-info');
  let landingCards = [];
  let multiPageCards = [];
  let miniAppCards = [];
  let renderArray = [];

  class PortfolioCard {
    constructor(id, title, date, description, stack, type, images = [], rootLink, showLink, parentSelector) {
      this.id = id;
      this.title = title;
      this.date = date;
      this.description = description;
      this.stack = stack;
      this.images = images;
      this.type = type;
      this.rootLink = rootLink;
      this.showLink = showLink;
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
    <div class="portfolio__cards-descr">
      <div class="portfolio__cards-title">${this.title}</div>
      <div class="portfolio__cards-date">${this.date}</div>
    </div>
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
            <a class="button portfolio__cards-info-buttons-item" href="${this.showLink}" target="_blank">Посмотреть</a>
            <a class="button portfolio__cards-info-buttons-item" href="${this.rootLink}" target="_blank">Перейти на GitHub</a>
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
  getData('./db/db.json')
    .then(data => {
      data.forEach(({
        id,
        title,
        date,
        description,
        stack,
        type,
        images,
        rootLink,
        showLink
      }) => {
        let newCard = new PortfolioCard(id, title, date, description, stack, type, images, rootLink, showLink, '.portfolio__cards');
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
      const animRender = (arr) => {
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
};

export default renderPortfolio;