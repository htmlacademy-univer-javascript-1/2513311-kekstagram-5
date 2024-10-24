/* eslint-disable no-console */
function getRandomInt(min, max) {
  return min + Math.random() * (max - min + 1) >> 0;
}

function getRandomMessage() {
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const messageCount = getRandomInt(1, 2);
  const randomMessages = [];
  for (let i = 0; i < messageCount; i++) {
    const randomIndex = getRandomInt(0, messages.length - 1);
    randomMessages.push(messages[randomIndex]);
  }
  return randomMessages.join(' ');
}

function getRandomName() {
  const names = ['Артём', 'Анна', 'Дмитрий', 'Елена', 'Иван', 'Мария', 'Николай', 'Ольга', 'Пётр', 'Светлана'];
  const randomIndex = getRandomInt(0, names.length - 1);
  return names[randomIndex];
}

function generateComment(id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomMessage(),
    name: getRandomName()
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
