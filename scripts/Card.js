import openPopup from "./index.js";
export default class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._imageFull = document.querySelector('.popup-image');
  }

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector).content.cloneNode(true);
    
    return elementTemplate;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _deleteCard(evt) {
    const deletedCard = evt.target.closest('.element');
    deletedCard.remove();
  }

  _setEventListeners(imageElm, likeElm, deleteElm) {
    imageElm.addEventListener('click', () => {
//      const imageFull = document.querySelector('.popup-image');

      this._imageFull.querySelector('.popup-image__image').src = this._link;
      this._imageFull.querySelector('.popup-image__heading').textContent = this._name;
      this._imageFull.querySelector('.popup-image__image').alt = this._name;

      openPopup(this._imageFull);
    });

    likeElm.addEventListener('click', this._toggleLike);
    deleteElm.addEventListener('click', this._deleteCard);
  }

  generateCard() {
    const elementClone = this._getTemplate();
    const imageElm = elementClone.querySelector('.element__photo');

    imageElm.src = this._link;
    imageElm.alt = this._name;
    elementClone.querySelector('.element__name').textContent = this._name;

    const likeElm = elementClone.querySelector('.element__like-button');
    const deleteElm = elementClone.querySelector('.element__delete');

    this._setEventListeners(imageElm, likeElm, deleteElm);

    return elementClone;
  }
}