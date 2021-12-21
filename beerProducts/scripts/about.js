document.addEventListener('DOMContentLoaded', async function(e) {
  const numberOfRandomUsers     = 10;
  const response                = await includeHTMLAsync();
  const beerData                = JSON.parse(sessionStorage.getItem('beersData'));
  setHeaderLogo(beerData);
  listeners(beerData);
  
  const aboutContainer          = document.querySelector('.about-container');
  const aboutCardTemplate       = document.querySelector('#about-card-template');

  for(let i = 0; i < numberOfRandomUsers; i++) {
    const clone                 = document.importNode(aboutCardTemplate.content, true);
    aboutContainer.appendChild(clone);
  }

  const randomUsers             = await getRandomUsersAsync(numberOfRandomUsers);
  const aboutCards              = document.querySelectorAll('.about-card');

  for(let i = 0; i < randomUsers.results.length; i++) {
    const aboutCardImg          = aboutCards[i].querySelector('img');
    const aboutCardCaption      = aboutCards[i].querySelector('.about-card-caption');
    aboutCardImg.src            = randomUsers.results[i].picture.large;
    const firstName             = randomUsers.results[i].name.first;
    const lastName              = randomUsers.results[i].name.last;
    aboutCardCaption.innerHTML  = firstName.concat(' ').concat(lastName);
    aboutCardImg.style.display  = 'block';
    aboutCards[i].querySelector('.about-spinner').classList.toggle('display-none');
  }
});

async function getRandomUsersAsync(numberOfResults = 1, seed = 'abc') {
  return await fetchByIDAsync(`https://randomuser.me/api/?results=${numberOfResults}&seed=${seed}`);
}