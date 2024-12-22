import './generate.js';
import './util.js';
import './miniatures.js';
import { setupBigPicture } from './view-big-picture.js';
import './validation.js';

const { addPictureListeners } = setupBigPicture();
addPictureListeners();
