let openEdit = document.querySelector(".profile__edit-button");
let closeEdit = document.querySelector(".popup__close")
let submitEdit = document.querySelector(".popup__submit");

let popup = document.querySelector(".popup");

let formElement = document.querySelectorAll("input");
let nameInput = document.querySelector(".popup__input_name");
let descriptionInput = document.querySelector(".popup__input_description");

let userName = document.querySelector(".profile__name");
let userDescription = document.querySelector(".profile__description");

function openPopup() {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  popup.classList.add("popup_opened");
}
function closePopup() {
  popup.classList.remove("popup_opened");
}
function submitForm(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  
  closePopup();
}

openEdit.addEventListener("click", openPopup);
closeEdit.addEventListener("click", closePopup);
submitEdit.addEventListener("click", submitForm);