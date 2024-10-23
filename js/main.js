/* eslint-disable no-console */
function getRandomInt(min, max) {
  return min + Math.random() * (max - min + 1) >> 0;
}

const fixedMessage = 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.';
const fixedName = 'Анна';

function generateComment(id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: fixedMessage,
    name: fixedName
  };
}

function generateComments() {
  const commentsCount = getRandomInt(0, 30);
  const comments = [];
  for (let i = 0; i < commentsCount; i++) {
    comments.push(generateComment(getRandomInt(100, 999)));
  }
  return comments;
}

function generateDescription(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии под номером ${id}`,
    likes: getRandomInt(15, 200),
    comments: generateComments()
  };
}

function generatePhotos() {
  const photos = [];
  for (let i = 1; i <= 25; i++) {
    photos.push(generateDescription(i));
  }
  return photos;
}

const photosArray = generatePhotos();

console.log(photosArray);
