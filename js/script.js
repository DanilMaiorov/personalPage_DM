console.log('Готов верстать?');
/*BURGER MENU*/

const header = document.querySelector('.header');//сделать делегирование и закрытие меню по клику на ссылки

const burgerBtn = document.querySelector('.burger__button');
const burgerLineBtn = document.querySelector('.burger__button-line');
const headerMenu = document.querySelector('.header__menu');
const body = document.querySelector('body');
burgerBtn.addEventListener('click', (e) => {
  headerMenu.classList.toggle('active');
  burgerBtn.classList.toggle('active');
  body.classList.toggle('lock');
});


/*LOGO ANIMATE */


const words = document.querySelectorAll('.logo__link-span');
let wordArray = [];
let currentWord = 0;

window.addEventListener('DOMContentLoaded', () => {
  wordArray.forEach(item => {
    for (let i = 0; i < item.length; i++) {
      if(i > 5) {
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
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i * 80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
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