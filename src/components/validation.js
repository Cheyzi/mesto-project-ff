const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement)=>{
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });

  function setEventListeners(formElement){
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    
    const dataMessageError = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    const patternForTextInput = "^[a-zA-Zа-яёА-яЁ\\-\\s]+$"
  
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      if(inputElement.type === 'text') {
        inputElement.setAttribute("pattern", patternForTextInput);
        inputElement.setAttribute("data-error-message", dataMessageError);
      }
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  function checkInputValidity(formElement, inputElement){
  
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
     
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  function toggleButtonState(inputList, buttonElement){
    if (hasInValidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(selectors.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(selectors.inactiveButtonClass);
    }
  };

  function hasInValidInput(inputList){
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  };

  function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  };
  
  function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
  };
};

const clearValidation = (formElement) => {
  const buttonElement = formElement.querySelector('.popup__button')
  buttonElement.classList.add("popup__button_disabled");

  const inputList = formElement.querySelectorAll('.popup__input'); 
  inputList.forEach(input => {
    const errorElement = formElement.querySelector(`.${input.name}-error`);
    input.classList.remove('popup__input_type_error');
    errorElement.textContent = "";
    errorElement.classList.remove('popup__input-error');
  });
};

export { enableValidation, clearValidation};
