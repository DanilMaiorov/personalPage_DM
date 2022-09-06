import {
  sendData
} from './sendData.js';

const sendForm = () => {
  const form = document.querySelector('form');
  const message = {
    loading: 'Отправляю сообщение...',
    loadingImg: './img/tumblr_mudg73OFlK1rgpyeqo1_500.gif',
    success: 'Спасибо, за доверие! Я отвечу вам в ближайшее время!',
    successImg: './img/okcatt.gif',
    failure: 'Что-то пошло не так',
    failureImg: './img/error.png',
  };

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
        if (e.target.value) {
          input.classList.remove('error');
        }
        if (inputName.value && inputEmail.value && formTextarea.value) {
          empty.remove();
        }
      });
    });
  };
  emptyRemove();

  const noticeRemove = (field) => {
    field.addEventListener('input', () => {
      if (field.value) {
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
      if (input.value === '') {
        noticeAdd(input, 'Поля не должны быть пустыми', empty);
      } else {
        input.classList.remove('error');
      }
    });
    if (emptyInputs.length !== 0) {
      return false;
    }
    if (!testEmail(emailValue)) {
      noticeAdd(inputEmail, 'Некорректный E-mail', notice);
      return false;
    } else {
      remover(inputEmail);
    }
    if (messageValue.length < 10) {
      noticeAdd(formTextarea, 'Минимум 10 символов', notice);
      return false;
    } else {
      remover(formTextarea);
    }
    return true;
  };

  const bindPostData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');

      if (validate()) {
        showLoadBlock(form, statusMessage);
      }
      const formData = new FormData(form);
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      if (validate()) {
        sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(object)).then(data => {
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
};

export default sendForm;