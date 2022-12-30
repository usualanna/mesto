export default class Card {
  constructor(data, templateSelector, open) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._imageFull = document.querySelector('.popup-image');
    this._imageFullImg = this._imageFull.querySelector('.popup-image__image');
    this._imageFullTxt = this._imageFull.querySelector('.popup-image__heading');
    this._open = open;
    this._element = document.querySelector('.element');
  }

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector).content;
    const elementClone = elementTemplate.querySelector('.element').cloneNode(true);

    return elementClone;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(imageElm, likeElm, deleteElm) {
    imageElm.addEventListener('click', () => {
      this._imageFullImg.src = this._link;

      this._imageFullTxt.textContent = this._name;
      this._imageFullImg.alt = this._name;

      this._open(this._link, this._name);
    });

    likeElm.addEventListener('click', this._toggleLike);
    deleteElm.addEventListener('click', this._deleteCard.bind(this));
  }

  generateCard() {
    this._element = this._getTemplate();
    const imageElm = this._element.querySelector('.element__photo');

    imageElm.src = this._link;
    imageElm.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    const likeElm = this._element.querySelector('.element__like-button');
    const deleteElm = this._element.querySelector('.element__delete');

    this._setEventListeners(imageElm, likeElm, deleteElm);

    return this._element;
  }
}