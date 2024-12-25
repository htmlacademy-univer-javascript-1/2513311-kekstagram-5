const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentLoadElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const cancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentElementTemplate = document.querySelector('.social__comment');

const createComment = function({ avatar, name, message }) {
  const comment = commentElementTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComment = function(comments) {
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });
  commentListElement.append(fragment);
};

const hidePicture = function() {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

const onCancelButtonClick = function() {
  hidePicture();
};

const renderPictureDetails = function({ url, likes, description }) {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = function(data) {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentLoadElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  renderComment(data.comments);
};

cancelElement.addEventListener('click', onCancelButtonClick);

export { showBigPicture };
