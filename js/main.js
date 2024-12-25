import {getPicture} from './generate.js';
import {processPicture} from './miniatures.js';
import {renderGallery} from './gallery.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {hideModal, setOnFormSubmit} from './validate.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderGallery(data);
} catch (err) {
  showAlert(err.message);
}

const picturesContainer = document.querySelector('.pictures');
processPicture(getPicture(), picturesContainer);

const photos = getPicture();
renderGallery(photos);

// eslint-disable-next-line no-console
console.log(getPicture());
