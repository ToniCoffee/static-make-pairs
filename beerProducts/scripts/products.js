document.addEventListener('DOMContentLoaded', async function (e) {
  const response                = await includeHTMLAsync();

  const beersData               = JSON.parse(sessionStorage.getItem('beersData'));
  const wrapper                 = document.querySelector('.wrapper');
  const beerCardTemplate        = document.querySelector('#beer-card-tamplate');
  const beerImgTemplate         = beerCardTemplate.content.querySelector('.beer-card img');
  const beerNameTemplate        = beerCardTemplate.content.querySelector('#details-name');
  const beerDescriptionTemplate = beerCardTemplate.content.querySelector('#details-description');

  setHeaderLogo(beersData); 

  for (let i = 0; i < beersData.length; i++) {
    beerImgTemplate.src               = beersData[i].image_url;
    beerImgTemplate.id                = beersData[i].id;
    beerNameTemplate.innerHTML        = beersData[i].name;
    beerDescriptionTemplate.innerHTML = beersData[i].description;
    const clone                       = document.importNode(beerCardTemplate.content, true);
    wrapper.appendChild(clone);
  } 

  listeners(beersData);

  // sessionStorage.removeItem('beersData');
  // sessionStorage.clear();
});
