const form = document.querySelector('#upload-select-image');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
}, true);

const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/);
  const regex = /^#[a-zA-Z0-9]{1,19}$/;
  const uniqueTags = new Set(hashtags.map((tag) => tag.toLowerCase()));

  return hashtags.every((tag) => regex.test(tag)) &&
    hashtags.length <= 5 &&
    uniqueTags.size === hashtags.length;
};

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashtags,
  'Некорректные хэш-теги. Проверьте формат, количество (до 5), уникальность.'
);

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  form.querySelector('.text__description'),
  validateComment,
  'Комментарий не может быть длиннее 140 символов.'
);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const fileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

fileInput.addEventListener('change', () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeButton.addEventListener('click', () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
});

const stopEscPropagation = (evt) => evt.stopPropagation();
form.querySelector('.text__hashtags').addEventListener('keydown', stopEscPropagation);
form.querySelector('.text__description').addEventListener('keydown', stopEscPropagation);

const scaleValue = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const updateScale = (value) => {
  scaleValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

scaleSmallerButton.addEventListener('click', () => {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale(currentScale);
  }
});

scaleBiggerButton.addEventListener('click', () => {
  let currentScale = parseInt(scaleValue.value, 10);
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale(currentScale);
  }
});

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const EFFECTS = {
  'none': { filter: '', unit: '' },
  'chrome': { filter: 'grayscale', unit: '' },
  'sepia': { filter: 'sepia', unit: '' },
  'marvin': { filter: 'invert', unit: '%' },
  'phobos': { filter: 'blur', unit: 'px', max: 3 },
  'heat': { filter: 'brightness', unit: '', max: 3 },
};

const resetEffects = () => {
  imagePreview.style.filter = '';
  sliderElement.setAttribute('disabled', true);
};

const applyEffect = (effect) => {
  if (effect === 'none') {
    resetEffects();
    return;
  }

  const { filter, unit, max } = EFFECTS[effect];
  const sliderMax = max || 1;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: sliderMax,
    },
    start: sliderMax,
    step: 0.1,
  });

  sliderElement.removeAttribute('disabled');
  sliderElement.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    effectLevelValue.value = value;
    imagePreview.style.filter = `${filter}(${value}${unit})`;
  });
};

sliderElement.setAttribute('disabled', true);
effectsList.addEventListener('change', (evt) => {
  if (evt.target.matches('.effects__radio')) {
    applyEffect(evt.target.value);
  }
});
