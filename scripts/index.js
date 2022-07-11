const openEdit = document.querySelector('.profile__edit-button');
const openSubmit = document.querySelector('.profile__add-button')

const closeEdit = document.querySelector('#edit-close');
const closeSubmit = document.querySelector('#add-close');
const closeFull = document.querySelector('#full-close');

const submitEdit = document.querySelector('#edit-submit');
const submitAdd = document.querySelector('#add-submit');

const photoFull = document.querySelector('.popup-image');

let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');

let userName = document.querySelector('.profile__name');
let userDescription = document.querySelector('.profile__description');

let photoHeading = document.querySelector('.popup__input_type_heading');
let photoLink = document.querySelector('.popup__input_type_link');

//фотографии
const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 



//открытие попапов
function openPopup(id) {
  let popup = document.querySelector('#' + id);

  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  popup.classList.add('popup_opened');
}

//закрытие попапов
function closeEditForm() {
  let popup = document.querySelector('#edit');
  popup.classList.remove('popup_opened');
}
function closeSubmitForm() {
  let popup = document.querySelector('#add');
  popup.classList.remove('popup_opened');
}
function closeFullImage() {
  let popup = document.querySelector('#full');
  popup.classList.remove('popup_opened');
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
    addImage(initialCards[i].link, initialCards[i].name)
  }
}
function addImage(imageLink, imageName) {
  const elementClone = elementTemplate.cloneNode(true);
  elementClone.querySelector('.element__photo').src = imageLink;
  elementClone.querySelector('.element__name').textContent = imageName;
  elementClone.querySelector('.element__photo').alt = imageName;

  //like button
  elementClone.querySelector('.element__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  //delete button
  elementClone.querySelector('.element__delete').addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  })
  
  //раскрытие полной картинки
  elementClone.querySelector('.element__photo').addEventListener('click', function() {
    photoFull.querySelector('.popup-image__image').src = imageLink;
    photoFull.querySelector('.popup-image__heading').textContent = imageName;
    
    photoFull.classList.add('popup_opened');
  })

  elements.prepend(elementClone);
}
function submitAddForm(evt) {
  evt.preventDefault();

  addImage(photoLink.value, photoHeading.value);

  closeSubmitForm();

  photoLink.value = '';
  photoHeading.value = '';
}


openEdit.addEventListener('click', function() {
  openPopup('edit');
});
openSubmit.addEventListener('click', function() {
  openPopup('add');
});
closeEdit.addEventListener('click', closeEditForm);
closeSubmit.addEventListener('click', closeSubmitForm);
closeFull.addEventListener('click', closeFullImage)
submitEdit.addEventListener('click', submitEditForm);
submitAdd.addEventListener('click', submitAddForm);



initialImages();