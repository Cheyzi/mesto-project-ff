//ссылка для правильной работы обработчика
let keyClose = null;
//функция открытия модального окна с функи
const openModal = element => {
  element.classList.add('popup_is-opened');
  //функция-обработчик для Escape
  keyClose = (evt) => {
    if (evt.key === 'Escape') {
      closeModal(element);
      return;
    }
  }
  document.addEventListener('keydown', keyClose);
};
//функия закрытия модального окна
const closeModal = element => {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyClose);
};

export {openModal, closeModal};