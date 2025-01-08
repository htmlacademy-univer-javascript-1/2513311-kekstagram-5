import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const pictureMetadata = bigPictureElement.querySelector('.big-picture__social');
const commentListElement = pictureMetadata.querySelector('.social__comments');
const closeButton = bigPictureElement.querySelector('.big-picture__cancel');
const commentLoadElement = pictureMetadata.querySelector('.social__comments-loader');
const commentShownCountElement = pictureMetadata.querySelector('.social__comment-shown-count');
const bigPicture = bigPictureElement.querySelector('.big-picture__img');
let wrapper;

const loadComment = (comment) => {
  commentListElement.insertAdjacentHTML('beforeend', `<li class="social__comment"><img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35"><p class="social__text">${comment.message}</p></li>`);
};

const handleLoaderVisibility = (totalCount) => {
  commentShownCountElement.textContent = commentListElement.children.length;
  if (totalCount === commentListElement.children.length) {
    commentLoadElement.classList.add('hidden');
  } else {
    commentLoadElement.classList.remove('hidden');
  }
};

const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  for (let i = 0; i < Math.min(comments.length, COMMENTS_PER_PORTION); ++i) {
    loadComment(comments[i]);
  }
  handleLoaderVisibility(comments.length, commentListElement.children.length);

  const onLoaderClick = () => {
    const currentCount = commentListElement.children.length;
    for (let i = currentCount; i < currentCount + Math.min(COMMENTS_PER_PORTION, comments.length - currentCount); ++i) {
      loadComment(comments[i]);
    }
    handleLoaderVisibility(comments.length, commentListElement.children.length);
  };

  wrapper = onLoaderClick;

  commentLoadElement.addEventListener('click', wrapper);
};

const drawBigPicture = (url, description, likes, comments) => {
  if (!url || !comments) {
    return;
  }

  bigPicture.querySelector('img').src = url;
  pictureMetadata.querySelector('.likes-count').textContent = likes;
  pictureMetadata.querySelector('.social__caption').textContent = description;
  pictureMetadata.querySelector('.social__comment-total-count').textContent = comments.length;
  renderComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeFullview();
  }
};

function closeFullview() {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  if (wrapper) {
    commentLoadElement.removeEventListener('click', wrapper);
    wrapper = null;
  }

  commentListElement.innerHTML = '';
}

closeButton.addEventListener('click', () => {
  closeFullview();
});

function showBigPicture(url, description, likes, comments) {
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  drawBigPicture(url, description, likes, comments);
}

export { showBigPicture };
