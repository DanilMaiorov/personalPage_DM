import {
  getData
} from './getData.js';

const renderBlog = () => {
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
          if (e.target === btn) {
            numberBlog = (index + 1);
            console.log(numberBlog);
            window.open('./html/blog.html?&' + numberBlog);
          }
        });
      });
    });

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
    if (sumLength(arrLength) > symbolsStop) {}
    newArray.forEach(item => {
      item.textContent = item.textContent;
      item.style.display = 'block';
    });
  };
};

export default renderBlog;