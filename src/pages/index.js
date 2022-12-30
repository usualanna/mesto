import './index.css';

import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, validationData } from '../components/constants.js';

const elements = document.querySelector('.elements');

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileEdit = document.querySelector('#popup__edit-profile');

const newImageBtn = document.querySelector('.profile__add-button');
const popupAddImage = document.querySelector('#popup__add-image');

const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const headingInputId = document.querySelector('#heading-input');
const linkInputId = document.querySelector('#link-input');
const nameInputId = document.querySelector('#name-input');
const descriptionInputId = document.querySelector('#description-input');

const validatorEditProfile = new FormValidator(validationData, profileEdit);
validatorEditProfile.enableValidation();

const validatorAddCard = new FormValidator(validationData, popupAddImage);
validatorAddCard.enableValidation();

const popupAdd = new PopupWithForm('#popup__add-image', addCard);
popupAdd.setEventListeners();

function createCard(cardInfo) {
  const card = new Card(cardInfo, '#element', imageFull.open.bind(imageFull));
  const newCard = card.generateCard();
  return newCard;
}
function addCard(cardInfo) {
  const card = createCard(cardInfo);

  cardList.addItem(card);
}

const popupEdit = new PopupWithForm('#popup__edit-profile', submitEditForm);
popupEdit.setEventListeners();

function submitEditForm({name, description}) {
  userInfo.setUserInfo(name, description);
}

const imageFull = new PopupWithImage('#popup__full-image');
imageFull.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__description')

const cardList = new Section({
  items: initialCards,
  renderer: addCard
}, ".elements")
cardList.renderInitCards();

profileEditBtn.addEventListener('click', setInitialProfileData);
function setInitialProfileData() {
  const { userName, userDescription } = userInfo.getUserInfo();

  nameInput.value = userName;
  descriptionInput.value = userDescription;

  validatorEditProfile.disableButton();  
  validatorEditProfile.hideInputError(nameInputId);
  validatorEditProfile.hideInputError(descriptionInputId);

  popupEdit.open();
}

newImageBtn.addEventListener('click', () => {
  validatorAddCard.disableButton(); 
  validatorAddCard.hideInputError(headingInputId);
  validatorAddCard.hideInputError(linkInputId);

  popupAdd.open();
});