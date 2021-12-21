let switchCarousel          = true;
let currentCarouselImgIndex = 0;
let carouselImg             = null;

function setCarouselImg(data, index) {
  carouselImg.src           = data[index].image_url;
}

function checkCarouselIndex(data) {
  if (currentCarouselImgIndex >= data.length) currentCarouselImgIndex = 0;
  if (currentCarouselImgIndex < 0)            currentCarouselImgIndex = data.length - 1;
}

async function carousel(data, initCarouselTime = 1000) {
  while (switchCarousel) {
    await delay(initCarouselTime)
      .then(() => {
        setCarouselImg(data, currentCarouselImgIndex);
        carouselImg.style.opacity = 1;
      })
      .catch(() => (switchCarousel = false));

    await delay(6000)
      .then(() => {
        carouselImg.style.opacity = 0;
      })
      .catch(() => (switchCarousel = false));

    await delay(1000)
      .then(() => {
        currentCarouselImgIndex++;
        checkCarouselIndex(data);
      })
      .catch(() => (switchCarousel = false));
  }
}