//функция удаления карточки
const deleteCard = (card) => {
  card.remove();
}
//функция работы с лайком
const actionLike = (likeButton, numberOfLikes, likes) => {
  likeButton.classList.toggle('card__like-button_is-active');
  numberOfLikes.textContent = likes;
  refreshNumber(numberOfLikes, likeButton);
}

//функция создания карточки
const createCard = (data, userId, cardTemplate, openModal, {deleteCardCallback = deleteCard, actionLikeCallback = actionLike} = {}) => {

  const newCard = cardTemplate.querySelector('.places__item').cloneNode(true);
  newCard.querySelector('.card__image').src = data.link;
  newCard.querySelector('.card__title').textContent = data.name;
  newCard.querySelector('.card__image').alt = data.name;



  newCard.id = data._id;
 

  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCardCallback(newCard));

  if(data.owner._id === userId) {
    cardDeleteButton.style.display = "block";

  }

  const numberOfLikes = newCard.querySelector('.numberOfLikes');
  numberOfLikes.textContent = data.likes.length;

  const cardLikeButton = newCard.querySelector('.card__like-button');
  
  if(data.likes.find(user => user._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  
  refreshNumber(numberOfLikes, cardLikeButton);
  
  cardLikeButton.addEventListener('click', () => actionLikeCallback(cardLikeButton, numberOfLikes, data.likes.length))
  const imageEditButton = newCard.querySelector('.card__image');

  imageEditButton.addEventListener('click', () => openModal(data));

  return newCard;
}

function refreshNumber(numberOfLikes, cardLikeButton) {
  if(numberOfLikes.textContent === "0") {
    numberOfLikes.classList.add("numberOfLikes__zero");
    cardLikeButton.classList.add("card__like-button__zeroLikes");
  } else {
    numberOfLikes.classList.remove("numberOfLikes__zero");
    cardLikeButton.classList.remove("card__like-button__zeroLikes");
  }
}


export { createCard, deleteCard, actionLike };