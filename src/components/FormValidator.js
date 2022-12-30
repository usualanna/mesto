export default class FormValidator {

  constructor(settings, element) {
    this._settings = settings;
    this._element = element;
    this._formElement = element.querySelector(this._settings.formSelector);
    this._inputList = Array.from(element.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = element.querySelector(this._settings.submitButtonSelector);
  }
  
  _showInputError(inputElement, errorMessage) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);

    formError.textContent = errorMessage;
    formError.classList.add(this._settings.errorClass);
  }

  hideInputError(inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);

    formError.textContent = '';
    formError.classList.remove(this._settings.errorClass);
  }

  _isValid(inputElement) {
   if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
     this.hideInputError(inputElement);
   }
  }

  _setEventListeners() {
    this._toggleButton();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButton();
        this._isValid(inputElement);
     });
    })
  }

  resetValidation = () => {
    this._toggleButton();
    this._inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
  };

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

  _toggleButton() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  disableButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
}