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
