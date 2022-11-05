import Card from "./Card.js";
import FormValidator from './FormValidator.js';
import { initialCards, validationData } from './constants.js';

//попап редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileEditSubmitBtn = document.querySelector('#edit-profile_submit');
const profileEdit = document.querySelector('#popup__edit-profile');

const popupEditProfile = document.querySelector('#popup__edit-profile');

//попап добавления картинки
const newImageBtn = document.querySelector('.profile__add-button');
const newImageSubmitBtn = document.querySelector('#add-image_submit');
const newImage = document.querySelector('#popup__add-image');

const popupAddImage = document.querySelector('#popup__add-image');

//раскрытие полной картинки
const imageFull = document.querySelector('.popup-image');

const popupFull = document.querySelector('#popup__full-image');

//
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');

const photoHeading = document.querySelector('.popup__input_type_heading');
const photoLink = document.querySelector('.popup__input_type_link');

//темплейт фотографии
//const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

//открытие попапов
export default function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function openPopupEditProfile() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  openPopup(popupEditProfile);
}
function openPopupAddImage() {
  photoHeading.value = "";
  photoLink.value = "";

  openPopup(popupAddImage);
}

//закрытие попапов
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
function closeEditForm() {
  closePopup(popupEditProfile);
}
function closeSubmitForm() {
  closePopup(popupAddImage);
}
function closeFullImage() {
  closePopup(popupFull);
}
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupName = document.querySelector('.popup_opened');
    closePopup(popupName);
  }
}

function submitEditForm(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;

  closeEditForm();
}

function submitAddForm(evt) {
  evt.preventDefault();

  const cardInfo = { link: photoLink.value, name: photoHeading.value };
  addCard(cardInfo);

  closeSubmitForm();
}

//добавление фотографий
function initialImages() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i]);
  }
}

function createCard(cardInfo) {
  const card = new Card(cardInfo, '#element');
  const newCard = card.generateCard();
  return newCard;
}

function addCard(cardInfo) {
  const card = createCard(cardInfo);
  elements.prepend(card);
}

profileEditBtn.addEventListener('click', function () {
  validatorEditProfile.resetValidation();
  openPopupEditProfile();
});
newImageBtn.addEventListener('click', function () {
  validatorAddCard.resetValidation();
  openPopupAddImage();
});

profileEdit.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    closeEditForm();
  }
});

newImage.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    closeSubmitForm();
  }
});

imageFull.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup-image__close') || evt.target.classList.contains('popup_opened')) {
    closeFullImage();
  }
});

profileEditSubmitBtn.addEventListener('submit', submitEditForm);
newImageSubmitBtn.addEventListener('submit', submitAddForm);

initialImages();

const validatorEditProfile = new FormValidator(validationData, profileEdit);
const validatorAddCard = new FormValidator(validationData, popupAddImage);
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();