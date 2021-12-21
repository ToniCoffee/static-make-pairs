let switchCarousel          = true;
let currentCarouselImgIndex = 0;
let carouselImg             = null;
let carouselDescription     = null;

function setCarouselImg(data, index) {
  carouselImg.src           = data[index].image_url;
  carouselImg.id            = data[index].id;
}

function checkCarouselIndex(data) {
  if (currentCarouselImgIndex >= data.length) currentCarouselImgIndex = 0;
  if (currentCarouselImgIndex < 0)            currentCarouselImgIndex = data.length - 1;
}

function setCarouselDescription(data, index) {
  carouselDescription.children[0].innerHTML = data[index].name;
  const words                               = data[index].description.split(' ').splice(0, 50).join(' ');
  carouselDescription.children[1].innerHTML = words.concat(' ...');
}

function carouselLeft(beerData) {
  switchCarousel = false;
  currentCarouselImgIndex--;
  checkCarouselIndex(beerData);
  setCarouselImg(beerData, currentCarouselImgIndex);
  setCarouselDescription(
    beerData,
    currentCarouselImgIndex
  );
  switchCarousel = true;
}

function carouselRight(beerData) {
  switchCarousel = false;
  currentCarouselImgIndex++;
  checkCarouselIndex(beerData);
  setCarouselImg(beerData, currentCarouselImgIndex);
  setCarouselDescription(
    beerData,
    currentCarouselImgIndex
  );
  switchCarousel = true;
}

async function carousel(data, initCarouselTime = 1000) {
  while (switchCarousel) {
    await delayAsync(initCarouselTime) 
      .then(() => {
        setCarouselImg(data, currentCarouselImgIndex);
        setCarouselDescription(data, currentCarouselImgIndex);
        carouselImg.style.opacity             = 1;
        carouselDescription.style.opacity     = 1;
        carouselDescription.style.visibility  = 'visible';
      })
      .catch(() => (switchCarousel = false));

    await delayAsync(6000)
      .then(() => {
        carouselImg.style.opacity             = 0;
        carouselDescription.style.opacity     = 0;
        carouselDescription.style.visibility  = 'hidden';
      })
      .catch(() => (switchCarousel = false));

    await delayAsync(1000)
      .then(() => {
        currentCarouselImgIndex++;
        checkCarouselIndex(data);
      })
      .catch(() => (switchCarousel = false));
  }
}