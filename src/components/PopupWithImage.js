import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup-image__image');
    this._caption = this._popup.querySelector('.popup-image__heading');
  }
  
  open(imageLink, imageTitle) {
    

    this._caption.textcontent = imageTitle;
    this._image.alt = imageTitle;
    this._image.src = imageLink;

    super.open();
  }
}