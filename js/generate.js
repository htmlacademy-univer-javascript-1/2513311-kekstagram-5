import {getRandomArrayElement} from './util.js';
import {getRandomInteger} from './util.js';
import {createId} from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENT_COUNT = 20;
const COMMENT_LINES = [
  'Всё отлично!',
  'Очень неплохо для новичка.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Фото выглядит так, будто сделано профессионалом!.',
  'Я бы поставил на обои!.',
];
const DESCRIPTION = [
  'что-то'
];
const NAMES = [
  'Семён',
  'Пётр',
  'Мария',
  'Василий',
  'Виктор',
  'Юлия',
  'Валерия',
  'Григорий',
];

const commentId = createId();

const createMessage = () => Array.from(
  {length:getRandomInteger(1,2)},
  () => getRandomArrayElement(COMMENT_LINES),
).join(' ');

const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  massege: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN, LIKE_MAX),
  comment: Array.from(
    {length: getRandomInteger(0, COMMENT_COUNT)},
    createComment,
  ),
});

const getPicture = () => Array.from(
  {length: PICTURE_COUNT},
  (_index, pictureIndex) => createPicture(pictureIndex + 1),
);

getPicture();

export {getPicture};
