const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = function({comments, description, likes, url, id}) {
  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.pictureId = id;

  return thumbnail;
};

const processPicture = function(pictures, container) {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createPicture(picture);
    fragment.append(thumbnail);
  });
  container.append(fragment);
};

export {processPicture};
