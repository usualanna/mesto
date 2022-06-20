let openEdit = document.querySelector(".profile__edit-button");
let closeEdit = document.querySelector(".popup__close")
let submitEdit = document.querySelector(".popup__submit");

let popup = document.querySelector(".popup");
let container = document.querySelector(".popup__container");

let formElement = document.querySelectorAll("input");
let nameInput = document.querySelector(".popup__name");
let descriptionInput = document.querySelector(".popup__description");

let userName = document.querySelector(".profile__name");
let userDescription = document.querySelector(".profile__description");

function openForm(event) {
  nameInput.value = userName.textContent;
  descriptionInput.value = userDescription.textContent;

  popup.classList.add("popup__opened");
  container.classList.add("popup__opened");
}
function closeForm(event) {
  popup.classList.remove("popup__opened");
  container.classList.remove("popup__opened");
}
function submitForm(evt) {
  evt.preventDefault();

  if (nameInput.value.trim().length === 0 || descriptionInput.value.trim().length === 0) {
    alert("Имя или описание не могут быть пустыми");
    return;
  }
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  
  closeForm();
}

openEdit.addEventListener("click", openForm);
closeEdit.addEventListener("click", closeForm);
submitEdit.addEventListener("click", submitForm);