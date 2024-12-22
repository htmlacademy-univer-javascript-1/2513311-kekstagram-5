function getRandomInt(min, max) {
  return min + Math.random() * (max - min + 1) >> 0;
}

export {getRandomInt};

import { setupBigPicture } from './view-big-picture.js';
const { addPictureListeners } = setupBigPicture();
addPictureListeners();
