import { processPicture } from './miniatures.js';
import { showBigPicture } from './view-big-picture.js';

const container = document.querySelector('.pictures');

let pictures = [];
const onContainerClick = (evt) => {

  const picture = evt.target.closest('[data-picture-id]');
  if (!picture) {
    return;
  }

  evt.preventDefault();
  const photo = pictures.find((item) => item.id === +picture.dataset.pictureId);
  if (photo) {
    showBigPicture(photo);
  }
};

const renderGallery = (currentPictures) => {
  pictures = currentPictures;
  processPicture(pictures, container);
  container.addEventListener('click', onContainerClick);
};

export { renderGallery };
