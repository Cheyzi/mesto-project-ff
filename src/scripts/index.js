import '../pages/index.css';
import initialCards from '../components/cards';
import {createCard, deleteCard, actionLike} from '../components/card';
import {openModal, closeModal} from '../components/modal'; 

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
//функция сохранения профиля
const editProfile = (evt) => {
  evt.preventDefault();
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent = name.value;
  profileDescription.textContent = description.value;
  closeModal(popupProfileEdit);
  name.value = '';
  description.value = '';
}

profileForm.addEventListener('submit', editProfile);
//форма добавления карточки
const cardForm = document.forms['new-place'];
const placeName = cardForm.elements['place-name'];
const link = cardForm.elements.link;
//функция довления карточки в начало массива карточек
const addCard = (evt) => {
  evt.preventDefault();
  const data = {
    name:placeName.value,
    link:link.value,
  };
  initialCards.unshift(data);
  addItem(data);
  closeModal(popupNewCard);
  placeName.value = '';
  link.value = '';
}
cardForm.addEventListener('submit', addCard)

//функция добавления событий модальных окон и их открытие и закрытие
const popupEvent = (elementListener, popup, item=null)=> {

  elementListener.addEventListener('click', () => {

    if(elementListener.classList.contains('card__image'))
    {
      const popupImg = popup.querySelector('.popup__image');
      const popupCaption = popup.querySelector('.popup__caption');
  
      popupImg.src = item.link;
      popupCaption.textContent = item.name;
    }
    openModal(popup)
  });

  popup.addEventListener('click', (evt) => {

    const classList = evt.target.classList;
    if (classList.contains('popup__close') || classList.contains('popup')) {
      closeModal(popup)
    };
  });
};
popupEvent(cardAddButton, popupNewCard);
popupEvent(profileEditButton, popupProfileEdit);

//функция добавление созданной карточки в список по полученным данным
const addItem = (item) => {
  const newCard = createCard(item.link, item.name, cardTemplate);

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', e => deleteCard(e.target));

  const cardLikeButton = newCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', e => actionLike(e.target))
  
  const imageEditButton = newCard.querySelector('.card__image');
  
  popupEvent(imageEditButton, popupImage, item);
  
  placeList.prepend(newCard);
}

initialCards.forEach(addItem);
