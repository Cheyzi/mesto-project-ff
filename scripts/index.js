// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placeList = document.querySelector('.content').querySelector('.places__list');
const cardLikeButton = cardTemplate.querySelector('.card__like-button');

// @todo: DOM узлы

// @todo: Функция создания карточки
const createCard = (link, name, deleteCard) => {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  newCard.querySelector('.card__image').src = link;
  newCard.querySelector('.card__title').textContent = name;
  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', e => deleteCard(e.target));
  return newCard;
}
// @todo: Функция удаления карточки
const deleteCard = (deleteButton) => {
  const cardItem = deleteButton.closest('.places__item');
  cardItem.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  const card = createCard(item.link, item.name, deleteCard);
  placeList.append(card);
});