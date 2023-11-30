import '../pages/index.css';
import initialCards from '../components/cards';
import { createCard, deleteCard, actionLike } from '../components/card';
import { openModal, closeModal } from '../components/modal';

//темлейт карточки
const cardTemplate = document.querySelector('#card-template').content;
//список карточек
const placeList = document.querySelector('.places__list');
//кнопки для профиля и добавления карточки
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
//модальные окна
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
//форма изменения профиля
const profileForm = document.forms['edit-profile'];
const name = profileForm.elements.name;
const description = profileForm.elements.description;

//Добавление слушателя ко всем попапам
for (const popup of document.querySelectorAll('.popup')) {
  popup.addEventListener('click', (evt) => {
    const classList = evt.target.classList;
    if (classList.contains('popup__close') || classList.contains('popup')) {
      closeModal(popup);
    };
  });
}
//открытие попапа для создание карточки
cardAddButton.addEventListener('click', () => {
  cardForm.reset();
  openModal(popupNewCard);
});

//форма добавления карточки
const cardForm = document.forms['new-place'];
const placeName = cardForm.elements['place-name'];
const link = cardForm.elements.link;

//функция довления карточки в начало массива карточек
const addCard = (evt) => {
  evt.preventDefault();
  const data = {
    name: placeName.value,
    link: link.value,
  };
  initialCards.unshift(data);
  addItem(data);
  closeModal(popupNewCard);
}

cardForm.addEventListener('submit', addCard);

//функция сохранения профиля
const editProfile = (evt) => {
  evt.preventDefault();
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = name.value;
  profileDescription.textContent = description.value;

  closeModal(popupProfileEdit);
}

profileForm.addEventListener('submit', editProfile);

//Слушатель на кнопку +
profileEditButton.addEventListener('click', () => {
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});


//функция добавление созданной карточки в список по полученным данным
const addItem = (item) => {

  const openImagePopup = () => {
    const popupImg = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');
  
    popupImg.src = item.link;
    popupCaption.textContent = item.name;

    openModal(popupImage);
  }

  const newCard = createCard(item.link, item.name, cardTemplate, deleteCard, actionLike, openImagePopup);
  
  placeList.prepend(newCard);
}

initialCards.forEach(addItem);
