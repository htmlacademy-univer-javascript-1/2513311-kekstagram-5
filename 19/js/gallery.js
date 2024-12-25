import { processPicture } from './miniatures.js';
import { showBigPicture } from './view-big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = function(photos) {
  container.addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-picture-id]');
    if (!picture) {
      return;
    }

    evt.preventDefault();
    const photo = photos.find((item) => item.id === +picture.dataset.pictureId);
    if (photo) {
      showBigPicture(photo);
    }
  });

  processPicture(photos, container);
};

export { renderGallery };
