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

  function openBigPicture(pictureElement) {
    const likes = pictureElement.querySelector('.picture__likes').textContent;
    const comments = pictureElement.querySelector('.picture__comments').textContent;

    const commentsData = [{ avatar: 'img/avatar1.jpg', author: 'Алиса', text: 'Очень красивое фото!', }, { avatar: 'img/avatar2.jpg', author: 'Ваня', text: 'Прекрасный вид!', },
      { avatar: 'img/avatar3.jpg', author: 'Петя', text: 'Тоже туда хочу!', }
    ];

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureImg.src = pictureElement.querySelector('.picture__img').src;
    bigPictureImg.alt = pictureElement.querySelector('.picture__img').alt;
    likesCount.textContent = likes;
    commentsCount.textContent = comments;
    caption.textContent = pictureElement.querySelector('.picture__img').alt;

    commentCountBlock.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    commentsList.innerHTML = '';
    commentsData.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');
      commentElement.innerHTML = `
          <img class="social__picture" src="${comment.avatar}" alt="${comment.author}" width="35" height="35">
          <p class="social__text">${comment.text}</p>
        `;
      commentsList.appendChild(commentElement);
    });
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
  }

  return {
    openBigPicture,
    closeBigPicture,
    addPictureListeners,
  };
}
