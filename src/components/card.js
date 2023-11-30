//функция создания карточки
const createCard = (link, name, cardTemplate, deleteCard, actionLike, openModal) => {
  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  newCard.querySelector('.card__image').src = link;
  newCard.querySelector('.card__title').textContent = name;
  newCard.querySelector('.card__image').alt = name;

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', e => deleteCard(e.target));

  const cardLikeButton = newCard.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', e => actionLike(e.target))

  const imageEditButton = newCard.querySelector('.card__image');

  imageEditButton.addEventListener('click', openModal);

  return newCard;
}
//функция удаления карточки
const deleteCard = (deleteButton) => {
  const cardItem = deleteButton.closest('.places__item');
  cardItem.remove();
}
//функция работы с лайком
const actionLike = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, actionLike };

