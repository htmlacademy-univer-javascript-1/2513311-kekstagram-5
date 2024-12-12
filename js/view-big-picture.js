export function setupBigPicture() {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const commentsList = bigPicture.querySelector('.social__comments');
  const caption = bigPicture.querySelector('.social__caption');
  const cancelBtn = bigPicture.querySelector('.big-picture__cancel');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');

  let allComments = [];
  let shownCommentsCount = 0;

  function renderComments() {
    const fragment = document.createDocumentFragment();
    const nextComments = allComments.slice(shownCommentsCount, shownCommentsCount + 5);

    nextComments.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');
      commentElement.innerHTML = `
        <img class="social__picture" src="${comment.avatar}" alt="${comment.author}" width="35" height="35">
        <p class="social__text">${comment.text}</p>
      `;
      fragment.appendChild(commentElement);
    });

    commentsList.appendChild(fragment);
    shownCommentsCount += nextComments.length;

    commentCountBlock.textContent = `${shownCommentsCount} из ${allComments.length} комментариев`;

    if (shownCommentsCount >= allComments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  }

  function openBigPicture(pictureElement) {
    const likes = pictureElement.querySelector('.picture__likes').textContent;
    const comments = pictureElement.querySelector('.picture__comments').textContent;

    allComments = [
      { avatar: 'img/avatar1.jpg', author: 'Алиса', text: 'Очень красивое фото!' },
      { avatar: 'img/avatar2.jpg', author: 'Ваня', text: 'Прекрасный вид!' },
      { avatar: 'img/avatar3.jpg', author: 'Петя', text: 'Тоже туда хочу!' },
      { avatar: 'img/avatar4.jpg', author: 'Коля', text: 'Удивительно!' },
      { avatar: 'img/avatar5.jpg', author: 'Света', text: 'Какой закат!' },
      { avatar: 'img/avatar6.jpg', author: 'Олег', text: 'Супер!' },
    ];

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureImg.src = pictureElement.querySelector('.picture__img').src;
    bigPictureImg.alt = pictureElement.querySelector('.picture__img').alt;
    likesCount.textContent = likes;
    commentsCount.textContent = comments;
    caption.textContent = pictureElement.querySelector('.picture__img').alt;

    commentsList.innerHTML = '';
    shownCommentsCount = 0;

    renderComments();
  }

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  function addPictureListeners() {
    const pictureLinks = document.querySelectorAll('.pictures .picture');
    pictureLinks.forEach((pictureLink) => {
      pictureLink.addEventListener('click', (event) => {
        event.preventDefault();
        openBigPicture(pictureLink);
      });
    });

    cancelBtn.addEventListener('click', closeBigPicture);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeBigPicture();
      }
    });

    commentsLoader.addEventListener('click', renderComments);
  }

  return {
    openBigPicture,
    closeBigPicture,
    addPictureListeners,
  };
}
