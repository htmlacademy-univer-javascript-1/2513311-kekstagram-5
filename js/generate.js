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
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTION = [
  'Вся красота мира в одной картинке',
  'Моменты, которые запечатлены навсегда',
  'Счастье в каждом кадре',
  'Когда слова не нужны, достаточно фотографии',
  'История, рассказанная через объектив',
  'Остановить время в одном кадре',
  'Фотография — это способ улыбнуться в будущем',
  'Сегодня — самый лучший день',
  'Я не доверяю словам. Я доверяю фотографиям',
  'Фотографии — это свидетельство о том, что мы жили',
  'Момент, когда небо и земля сливаются воедино',
  'В объектив всегда видна правда — это как детектор лжи',
  'Сделано объективом и любовью',
  'Счастье никогда не выходит из моды',
  'Лишь тот, кто странствует, открывает новые пути',
  'Зарядитесь нашим теплом',
  'Жизнь лучше, когда ты смеешься'
];
const NAMES = [
  'Артём',
  'Анна',
  'Дмитрий',
  'Елена',
  'Иван',
  'Мария',
  'Николай',
  'Ольга',
  'Пётр',
  'Светлана',
  'Виктория',
  'Дарьяна'
];

const commentId = createId();

const createMessage = () => Array.from(
  {length:getRandomInteger(1,2)},
  () => getRandomArrayElement(COMMENT_LINES),
).join(' ');

const createComment = () => ({
  id: commentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN, LIKE_MAX),
  comments: Array.from(
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
