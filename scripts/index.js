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
  openPopup(popupAddImage);
}

//закрытие попапов
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
function closeEditForm() {
  const popupButton = document.querySelector('#edit-profile_submit-button');
  closePopup(popupEditProfile);

  popupButton.classList.add('popup__submit_invalid');
  popupButton.setAttribute('disabled', true);
}
function closeSubmitForm() {
  const popupButton = document.querySelector('#add-image_submit-button');
  closePopup(popupAddImage);
  newImageSubmitBtn.reset();

  popupButton.classList.add('popup__submit_invalid');
  popupButton.setAttribute('disabled', true);
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

//добавление фотографий
function initialImages() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i]);
  }
}
//function createImage(param) {
//  const elementClone = elementTemplate.querySelector('.element').cloneNode(true);
 /// const elementCloneImage = elementClone.querySelector('.element__photo');

 // elementCloneImage.src = param.link;
 // elementCloneImage.alt = param.name;
 // elementClone.querySelector('.element__name').textContent = param.name;

           //like button
 // elementClone.querySelector('.element__like-button').addEventListener('click', function (evt) {
 //   evt.target.classList.toggle('element__like-button_active');
 // });
           //delete button
 // elementClone.querySelector('.element__delete').addEventListener('click', function (evt) {
 //   elementClone.remove();
 // })

          //раскрытие полной картинки
  //elementCloneImage.addEventListener('click', function () {
   // imageFull.querySelector('.popup-image__image').src = param.link;
   // imageFull.querySelector('.popup-image__heading').textContent = param.name;
   // imageFull.querySelector('.popup-image__image').alt = param.name;

   // openPopup(imageFull);
 // })

 // return elementClone;
//}

function addCard(cardInfo) {
  const card = new Card(cardInfo);
  const newCard = card.generateCard();

  elements.prepend(newCard);
}

//function addImage(param) {
//  elements.prepend(param);
//}
function submitAddForm(evt) {
  evt.preventDefault();

  const cardInfo = { link: photoLink.value, name: photoHeading.value };
  addCard(cardInfo);

  closeSubmitForm();
}

profileEditBtn.addEventListener('click', openPopupEditProfile);
newImageBtn.addEventListener('click', openPopupAddImage);

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