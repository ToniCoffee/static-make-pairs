document.addEventListener('DOMContentLoaded', async function (e) {
  sessionStorage.removeItem('beerData');
  // sessionStorage.clear();
  
  const response        = await includeHTMLAsync();
  const beerData        = await getBeerDataAsync(10);
  const sectionInfoImg  = await getSectionInfoDataAsync();

  const spinner         = document.querySelector('.spinner-include');
  const carousel        = document.querySelector('.carousel-include');
  const sectionInfo     = document.querySelector('.section-info');
  const footer          = document.querySelector('.footer-include');

  carouselImg             = document.querySelector('.carousel img');
  carouselDescription     = document.querySelector('.carousel-description-details');

  const test = beerData[0].image_url;
  setHeaderLogo(beerData);
  setSectionInfoImg(sectionInfoImg);
  initialize(beerData);

  carousel.classList.toggle('display-none');
  spinner.classList.toggle('display-none'); 
  sectionInfo.classList.toggle('display-none'); 
  footer.classList.toggle('display-none'); 
});

async function getBeerDataAsync(numberOfResults = 1) {
  const data = [];
  for (let i = 1; i <= numberOfResults; i++) {
    const response = await fetchByIDAsync('https://api.punkapi.com/v2/beers/', i + 54);
    data.push(response[0]);
  }
  return data;
}

async function getSectionInfoDataAsync() {
  return await fetch('https://picsum.photos/id/103/400');
}

function setSectionInfoImg(data) {
  const sectionInfo        = document.querySelector('.section-info');
  const sectionInfoImg     = document.createElement('img');

  sectionInfoImg.classList = 'contrast-opacity';
  sectionInfoImg.src       = data.url;
  sectionInfoImg.alt       = 'imagen';
  appendChildAt(sectionInfoImg, sectionInfo, 0);
}

function initialize(beerData) {
  listeners(beerData);
  // setHeaderLogo(beerData);
  setCarouselImg(beerData, 0);
  setCarouselDescription(beerData, 0);
  carousel(beerData);
}
