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
const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

//открытие попапов
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
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
  popupName.classList.remove('popup_opened')
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
  const elementClone = elementTemplate.querySelector('.element').cloneNode(true);
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
    elementClone.remove();
  })

  //раскрытие полной картинки
  elementCloneImage.addEventListener('click', function () {
    imageFull.querySelector('.popup-image__image').src = param.link;
    imageFull.querySelector('.popup-image__heading').textContent = param.name;
    imageFull.querySelector('.popup-image__image').alt = param.name;

    openPopup(imageFull);
  })

  return elementClone;
}
function addImage(param) {
  elements.prepend(param);
}
function submitAddForm(evt) {
  evt.preventDefault();

  addImage(createImage({ link: photoLink.value, name: photoHeading.value }));

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