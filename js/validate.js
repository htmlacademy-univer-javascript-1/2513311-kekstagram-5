import { sendData } from './api.js';
import { setPreview } from './gallery.js';
import { showUploadErrorMessage, showUploadSucccessMessage, isOnFocus, isEscapeKey, Filter } from './util.js';

const FILTERS = {
  'effect-chrome': new Filter('grayscale', 0, 1, 0.1),
  'effect-sepia': new Filter('sepia', 0, 1, 0.1),
  'effect-marvin': new Filter('invert', 0, 1, 0.01),
  'effect-phobos': new Filter('blur', 0, 3, 0.1),
  'effect-heat': new Filter('brightness', 1, 3, 0.1)
};
const SCALE_DIFFERENCE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_VOLUME = 100;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_SAMPLE = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const SUBMIT_BUTTON_TEXT = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...',
};

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileField = document.querySelector('.img-upload__input');
const cancelButton = form.querySelector('.img-upload__cancel');
const descriptionField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');
const scaleOutput = form.querySelector('.scale__control--value');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, true);
const imagePreview = form.querySelector('#preview');
const scaleAddButton = form.querySelector('.scale__control--bigger');
const scaleDecreaseButton = form.querySelector('.scale__control--smaller');
const effectLevel = form.querySelector('.effect-level__value');
const filterButtonList = document.querySelector('.effects__list');
const slider = document.querySelector('.effect-level__slider');
const submitButton = document.querySelector('.img-upload__submit');

const operateScale = (evt) => {
  let scale = parseInt(scaleOutput.value, 10);
  if (evt.target.classList.contains('scale__control--bigger') && scale + SCALE_DIFFERENCE <= MAX_SCALE) {
    scale += SCALE_DIFFERENCE;
  } else if (evt.target.classList.contains('scale__control--smaller') && scale - SCALE_DIFFERENCE >= MIN_SCALE) {
    scale -= SCALE_DIFFERENCE;
  }

  scaleOutput.value = `${scale}%`;
  imagePreview.style.transform = `scale(${scale / 100})`;
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  step: 0.01,
  start: 1,
  connect: 'lower'
});

const operateSliderValue = (filter) => {
  if (filter.name === 'blur') {
    return `${slider.noUiSlider.get()}px`;
  }

  return `${slider.noUiSlider.get()}`;
};

const setDefaultFilter = () => {
  slider.parentElement.classList.add('hidden');
  imagePreview.style.filter = '';
  effectLevel.value = DEFAULT_VOLUME;
  document.querySelector('#effect-none').checked = true;
};

const onFilterClick = (evt) => {
  if (evt.target.matches('input[type=radio]')) {
    if (evt.target.id !== 'effect-none') {
      slider.parentElement.classList.remove('hidden');
      const filter = FILTERS[`${evt.target.id}`];
      slider.noUiSlider.updateOptions({
        range: {
          min: filter.min,
          max: filter.max
        },
        step: filter.step,
        start: filter.max,
      });
      slider.noUiSlider.on('update', () => {
        imagePreview.style.filter = `${filter.name}(${operateSliderValue(filter)})`;
        effectLevel.value = slider.noUiSlider.get() / filter.max;
      });
    } else {
      setDefaultFilter();
    }
  }
};

const addFilters = () => filterButtonList.addEventListener('click', onFilterClick);

const getHashtagsArray = (value) => value.toLowerCase()
  .split(' ')
  .filter((x) => x);

const matchHashtagsToPattern = (value) => getHashtagsArray(value).every((tag) => HASHTAG_SAMPLE.test(tag));

const checkHashtagsUniqueness = (value) => {
  const hashtags = getHashtagsArray(value);
  return new Set(hashtags).size === hashtags.length;
};

const checkHashtagsLimit = (value) => getHashtagsArray(value).length <= MAX_HASHTAGS_COUNT;

const validateCommentLength = (value) => {
  value = value.trim();
  return value.length <= 140;
};

pristine.addValidator(descriptionField, validateCommentLength, 'Комментарий длиннее 140 символов');
pristine.addValidator(hashtagField, checkHashtagsLimit, 'Слишком много хэш-тегов');
pristine.addValidator(hashtagField, checkHashtagsUniqueness, 'Повтор хэш-тега');
pristine.addValidator(hashtagField, matchHashtagsToPattern, 'Невалидный хэш-тег');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) &&
    !(isOnFocus('text__description') || isOnFocus('text__hashtags')) &&
    !document.querySelector('.error')) {
    closeModal();
  }
};

const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButton.addEventListener('click', closeModal);
  scaleAddButton.addEventListener('click', operateScale);
  scaleDecreaseButton.addEventListener('click', operateScale);
  setPreview();
  addFilters();
};

function closeModal() {
  pristine.reset();
  fileField.value = '';
  descriptionField.value = '';
  hashtagField.value = '';
  scaleOutput.value = '100%';
  imagePreview.style.transform = 'scale(1)';
  setDefaultFilter();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButton.removeEventListener('click', closeModal);
  scaleAddButton.removeEventListener('click', operateScale);
  scaleDecreaseButton.removeEventListener('click', operateScale);
  filterButtonList.removeEventListener('click', onFilterClick);
}

fileField.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModal();
});

cancelButton.addEventListener('click', () => {
  closeModal();
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SUBMIT_BUTTON_TEXT.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SUBMIT_BUTTON_TEXT.IDLE;
};

const onFormSubmitSuccess = () => {
  showUploadSucccessMessage();
  closeModal();
};

const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target), onFormSubmitSuccess, showUploadErrorMessage)
        .finally(() => unblockSubmitButton());
    }
  });
};

export { setFormSubmit };
