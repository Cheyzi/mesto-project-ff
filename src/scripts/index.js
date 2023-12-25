import "../pages/index.css";
import { createCard, deleteCard, actionLike } from "../components/card";
import { openModal, closeModal } from "../components/modal";
import { enableValidation } from "../components/validation";
import {
  getCards,
  getUser,
  patchUser,
  postCard,
  putLike,
  deleteLike,
  deleteCardApi,
  patchAvatar,
} from "../scripts/api";
import { Promise } from "core-js";

import {clearValidation} from '../components/validation';

//темлейт карточки
const cardTemplate = document.querySelector("#card-template").content;
//список карточек
const placeList = document.querySelector(".places__list");
//кнопки для профиля и добавления карточки
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
//модальные окна
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");
const popupImg = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

const popupImageProfile = document.querySelector(".popup_type_image-profile");
const popupDeleteCard = document.querySelector(".popup_type_delete-card");


//Элементы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");


//форма изменения картинки профиля
const cardFormImageProfile = document.forms["new-image-profile"];
const linkImageProfile = cardFormImageProfile.elements["image-profile"];

//форма изменения профиля
const profileForm = document.forms["edit-profile"];
const name = profileForm.elements.name;
const description = profileForm.elements.description;

profileImage.addEventListener("click", () => {
  cardFormImageProfile.reset();
  clearValidation(cardFormImageProfile);
  openModal(popupImageProfile);
});

cardFormImageProfile.addEventListener("submit", (e) => {
  const defaultText = e.submitter.textContent;
  e.submitter.textContent += '...';

  patchAvatar(linkImageProfile.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${linkImageProfile.value})`;
      closeModal(popupImageProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      e.submitter.textContent = defaultText;
    })

});

//Добавление слушателя ко всем попапам
for (const popup of document.querySelectorAll(".popup")) {
  popup.addEventListener("click", (evt) => {
    const classList = evt.target.classList;
    if (classList.contains("popup__close") || classList.contains("popup")) {
      closeModal(popup);
    }
  });
}
//открытие попапа для создание карточки
cardAddButton.addEventListener("click", () => {
  cardForm.reset();

  clearValidation(cardForm);
  openModal(popupNewCard);
});

//форма добавления карточки
const cardForm = document.forms["new-place"];
const placeName = cardForm.elements["place-name"];
const link = cardForm.elements.link;

//функция довления карточки в начало массива карточек
const addCard = (e) => {
  const defaultText = e.submitter.textContent;
  e.submitter.textContent += '...';
  postCard(placeName.value, link.value)
    .then((data)=> {
      const userId = data.owner._id;
      addItem(data, userId);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      e.submitter.textContent = defaultText;
    });
};

cardForm.addEventListener("submit", addCard);

//функция сохранения профиля
const editProfile = (e) => {
  
  const defaultText = e.submitter.textContent;
  e.submitter.textContent += '...';
  patchUser(name.value, description.value)
    .then(() => {
      profileTitle.textContent = name.value;
      profileDescription.textContent = description.value;
      closeModal(popupProfileEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      e.submitter.textContent = defaultText;
    });
};

profileForm.addEventListener("submit", editProfile);

profileEditButton.addEventListener("click", () => {
  clearValidation(profileForm);
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

const openImagePopup = (data) => {

  popupImg.src = data.link;
  popupImg.alt = data.name;
  popupCaption.textContent = data.name;

  openModal(popupImage);
};

//функция добавление созданной карточки в список по полученным данным
const addItem = (item, userId) => {
  
  const actionLikeOverride = (likeButton) => {
    actionLike(likeButton);

    const numberLikes = likeButton.parentElement.querySelector('.numberOfLikes');

    const refreshNumber = (data) => {
      likeButton.classList.toggle('card__like-button_is-active');
      numberLikes.textContent = data.likes.length;
      if(numberLikes.textContent === "0") {
        numberLikes.classList.add("numberOfLikes__zero");
        likeButton.classList.add("card__like-button__zeroLikes");
      } else {
        numberLikes.classList.remove("numberOfLikes__zero");
        likeButton.classList.remove("card__like-button__zeroLikes");
      }
    }

    if (!likeButton.classList.contains("card__like-button_is-active")) {
      putLike(item._id)
        .then(refreshNumber)
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteLike(item._id)
        .then(refreshNumber)
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const buttonPopupDeleteCard = document.querySelector(".popup__button_delete");

  const deleteCardOverride = (deleteButton) => {
    deleteCard(deleteButton);

    openModal(popupDeleteCard);

    buttonPopupDeleteCard.addEventListener("click", (e) => {
      const defaultText = e.target.textContent;
      e.target.textContent = 'Удаление...';
      deleteCardApi(item._id)
        .then(data => {
          deleteButton.parentElement.remove();
          closeModal(popupDeleteCard);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          e.target.textContent = defaultText;
        });
    });
  };

  const newCard = createCard(item, userId, cardTemplate, openImagePopup, {
    deleteCardCallback: deleteCardOverride,
    actionLikeCallback: actionLikeOverride,
  });

  placeList.prepend(newCard);
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
});


Promise.all([getUser(), getCards()])
.then((data) => {
  const dataUser = data[0];
  const dataCards = data[1];
  profileTitle.textContent = dataUser.name;
  profileDescription.textContent = dataUser.about;
  profileImage.style.backgroundImage = `url(${dataUser.avatar})`;
  const userId = dataUser._id;
  const userName = dataUser.name;

  placeList.innerHTML = "";

  dataCards.reverse().forEach((card) => addItem(card, userId));
})
.catch((err) => {
  console.log(err);
});
