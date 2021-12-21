document.addEventListener('DOMContentLoaded', function (e) {
  let beerData                  = JSON.parse(sessionStorage.getItem('beerData'));
  const wrapper                 = document.querySelector('.wrapper');
  const beerDetailsImg          = document.querySelector('.beer-card-img img');
  const beerTitle               = document.querySelector('#beer-card-details-title');
  const beerDescription         = document.querySelector('#beer-card-details-description');
  const backBtn                 = document.querySelector('#back-btn');

  beerDetailsImg.src            = beerData.image_url;
  beerTitle.innerHTML           = beerData.name;
  beerDescription.innerHTML     = beerData.description;

  const beerIngredientsHops     = document.querySelector(
    '#beer-card-details-ingredients-hops-table tbody'
  );

  beerIngredientsHops.innerHTML = '';
  const hops                    = beerData.ingredients.hops;

  for (let i = 0; i < hops.length; i++) {
    const tr              = document.createElement('tr');
    const tdName          = document.createElement('td');
    const tdAttribute     = document.createElement('td');
    const tdUnits         = document.createElement('td');
    const tdValue         = document.createElement('td');
    tdName.innerHTML      = `${hops[i].name}`;
    tdAttribute.innerHTML = `${hops[i].attribute}`;
    tdUnits.innerHTML     = `${hops[i].amount.unit}`;
    tdValue.innerHTML     = `${hops[i].amount.value}`;
    tr.appendChild(tdName);
    tr.appendChild(tdAttribute);
    tr.appendChild(tdUnits);
    tr.appendChild(tdValue);
    beerIngredientsHops.appendChild(tr);
  }

  const beerIngredientsMalt = document.querySelector(
    '#beer-card-details-ingredients-malt-table tbody'
  );

  beerIngredientsMalt.innerHTML = '';
  const malt                    = beerData.ingredients.malt;

  for (let i = 0; i < malt.length; i++) {
    const tr          = document.createElement('tr');
    const tdYeast     = document.createElement('td');
    const tdName      = document.createElement('td');
    const tdUnits     = document.createElement('td');
    const tdValue     = document.createElement('td');
    tdYeast.innerHTML = `${beerData.ingredients.yeast}`;
    tdName.innerHTML  = `${malt[i].name}`;
    tdUnits.innerHTML = `${malt[i].amount.unit}`;
    tdValue.innerHTML = `${malt[i].amount.value}`;
    tr.appendChild(tdYeast);
    tr.appendChild(tdName);
    tr.appendChild(tdUnits);
    tr.appendChild(tdValue);
    beerIngredientsMalt.appendChild(tr);
  }

  const coll = document.getElementsByClassName('collapsible');
  
  for (let i = 0; i < coll.length; i++) {
    // const randomColor = '#' + (((1 << 24) * Math.random()) | 0).toString(16);
    // coll[i].style.backgroundColor = randomColor;
    coll[i].addEventListener('click', function () {
      this.classList.toggle('active');
      let content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  }

  backBtn.addEventListener('click', function (e) {
    sessionStorage.removeItem('beerData');
    // sessionStorage.clear();
    // Simulate a mouse click:
    // window.location.href = '/';
    // Simulate an HTTP redirect:
    // window.location.replace("http://www.w3schools.com");
    window.history.back();
    // console.log(window.history.length)
  });
});
