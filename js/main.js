import { getData } from './api.js';
import { setFormSubmit } from './validate.js';
import { addFilters } from './filter.js';
import { createPicture } from './miniatures.js';
import { alertLoadError } from './util.js';

let photos = [];

const onLoadSuccess = (data) => {
  photos = data.slice();
  createPicture(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

getData(onLoadSuccess, alertLoadError);
addFilters();
setFormSubmit();

export { photos };
