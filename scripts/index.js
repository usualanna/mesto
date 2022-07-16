//попап редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileEditSubmitBtn = document.querySelector('#edit-profile_submit');
const profileEditCloseBtn = document.querySelector('#edit-profile_close');

const popupEditProfile = document.querySelector('#popup__edit-profile');

//попап добавления картинки
const newImageBtn = document.querySelector('.profile__add-button');
const newImageSubmitBtn = document.querySelector('#add-image_submit');
const newImageCloseBtn = document.querySelector('#add-image_close');

const popupAddImage = document.querySelector('#popup__add-image');

//раскрытие полной картинки
const imageFull = document.querySelector('.popup-image');
const imageFullCloseBtn = document.querySelector('#full-image_close');

const popupFull = document.querySelector('#popup__full-image');

//
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');

const photoHeading = document.querySelector('.popup__input_type_heading');
const photoLink = document.querySelector('.popup__input_type_link');

//темплейт фотографии
const elementTemplate = document.querySelector('#element');
const elements = document.querySelector('.elements');

//открытие попапов
function openPopupEditProfile() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  popupEditProfile.classList.add('popup_opened');
}

function openPopupAddImage() {
  popupAddImage.classList.add('popup_opened');
}

//закрытие попапов
function closeEditForm() {
  popupEditProfile.classList.remove('popup_opened');
}
function closeSubmitForm() {
  popupAddImage.classList.remove('popup_opened');
}
function closeFullImage() {
  popupFull.classList.remove('popup_opened');
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
    addImage(createImage(initialCards[i]))
  }
}

function createImage(param) {
  const elementClone = elementTemplate.content.cloneNode(true);
  const elementCloneImage = elementClone.querySelector('.element__photo');

  elementCloneImage.src = param.link;
  elementCloneImage.alt = param.name;
  elementClone.querySelector('.element__name').textContent = param.name;

  //like button
  elementClone.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  //delete button
  elementClone.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  })

  //раскрытие полной картинки
  elementCloneImage.addEventListener('click', function () {
    imageFull.querySelector('.popup-image__image').src = param.link;
    imageFull.querySelector('.popup-image__heading').textContent = param.name;
    imageFull.querySelector('.popup-image__image').alt = param.name;

    imageFull.classList.add('popup_opened');
  })

  return elementClone;
}
function addImage(param) {
  elements.prepend(param);
}

function submitAddForm(evt) {
  evt.preventDefault();

  addImage(createImage({link: photoLink.value, name: photoHeading.value}));

  closeSubmitForm();
  newImageSubmitBtn.reset();
}

profileEditBtn.addEventListener('click', openPopupEditProfile);
newImageBtn.addEventListener('click', openPopupAddImage);

profileEditCloseBtn.addEventListener('click', closeEditForm);
newImageCloseBtn.addEventListener('click', closeSubmitForm);
imageFullCloseBtn.addEventListener('click', closeFullImage);

profileEditSubmitBtn.addEventListener('submit', submitEditForm);
newImageSubmitBtn.addEventListener('submit', submitAddForm);

initialImages();