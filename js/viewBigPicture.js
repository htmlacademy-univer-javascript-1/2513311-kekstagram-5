const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const cancelBtn = bigPicture.querySelector('.big-picture__cancel');


function openBigPicture(pictureElement) {
  const imageSrc = pictureElement.querySelector('.picture__img').src;
  const imageAlt = pictureElement.querySelector('.picture__img').alt;
  const likes = pictureElement.querySelector('.picture__likes').textContent;
  const comments = pictureElement.querySelector('.picture__comments').textContent;

  const commentsData = [];

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = imageSrc;
  bigPictureImg.alt = imageAlt;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  caption.textContent = imageAlt;

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
