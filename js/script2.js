console.log(location.search);

const getData = async (url) => { //функция getData
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }
  return await response.json();
};

const blogAdress = location.search;

const idBlog = (adress) => {
  return +adress.toString().substr(-1);
};
console.log(idBlog(blogAdress));

class BlogCardRender {
  constructor(id, title, date, text, tags, image, parentSelector) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.text = text;
    this.tags = tags;
    this.image = image;
    this.parent = document.querySelector(parentSelector); //blog__content
  }
  renderCard() {
    const blogCard = document.createElement('div');
    blogCard.classList.add('content-item-blog');
    blogCard.setAttribute('data-blog', `${this.id}`);
    blogCard.innerHTML = `
      <div class="content-item__title-blog">${this.title}</div>
      <div class="content-item__wrapper-blog">
        <div class="content-item__image-blog">
          <img src="${this.image}" alt="">
        </div>
      </div>
      `;
    this.parent.append(blogCard);
    this.renderParagraphs();
  }
  renderParagraphs() {
    for (let key in this.text) {
      const par = document.createElement('p');
      par.classList.add('content-item__text-blog');
      par.textContent = this.text[key];
      const itemWrapper = document.querySelector('.content-item__wrapper-blog');






      itemWrapper.append(par);
    }
  }
  renderLetters() {

  }
}


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
      let newCard = new BlogCardRender(id, title, date, text, tags, image, '.blog__content');
      if(idBlog(blogAdress) === id) {
        newCard.renderCard();
      }
    });
  });

    /*               animate({
                duration: 1000,
                timing: makeEaseOut(bounce),
                draw(progress) {
                  letters.forEach(letter => {
                    console.dir(letter);
                    letter.style.opacity = progress;
                  });
                  //ball.style.top = to * progress + 'px';
                }
              });  */ 