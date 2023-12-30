//функция для Escape
const keyClose = (evt) => {
  if (evt.key === 'Escape') {
    const element = document.querySelector('.popup_is-opened');
    closeModal(element);
  }
};

//функция открытия модального окна 
const openModal = element => {
  element.classList.add('popup_is-opened');

  document.addEventListener('keydown', keyClose);
};
//функия закрытия модального окна
const closeModal = (element) => {
  
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyClose);
  
  // // if(element.querySelector('.popup__form')) {
  //   clearValidation(element.querySelector('.popup__form'));
  // // }
  

};

export { openModal, closeModal };