const mouseHoverActions = {
  footerSocial: function(e) { footerMouseHover(e); }
}

const mouseOutActions = {
  footerSocial: function(e) { footerMouseOut(e); } 
}

const clickActions = {
  carouselLeft:   function (e, data) { carouselLeft(data);  },
  carouselRight:  function (e, data) { carouselRight(data); },
  link: async function (e, data) {
    if(window.location.pathname === '/') {
      const query = await fetchByIDAsync('https://api.punkapi.com/v2/beers/', carouselImg.id);
      setSessionStorage('beerData', query[0]);
      setSessionStorage('lastUrl', '/');
      redirectTo(`/pages/beerDetails.html?id=${carouselImg.id}`);
    } else {
      const id = e.target.previousElementSibling.id;
      const query = await fetchByIDAsync('https://api.punkapi.com/v2/beers/', id);
      setSessionStorage('beerData', query[0]);
      setSessionStorage('lastUrl', window.location.pathname);
      closeModal();
      redirectTo(`/pages/beerDetails.html?id=${id}`);
    }
  },
  products:   function (e, data) { setSessionStorage('beersData', data);  },
  menu:       function (e, data) { navbarAnimation();                     },
  openModal:  function (e, data) { openModal(e, null, '#details-name');   },
  closeModal: function (e, data) { closeModal();                          },
};

function listeners(data) {
  document.addEventListener('click', function (e) {
    if (clickActions[e.target.getAttribute('name')]) {
      clickActions[e.target.getAttribute('name')](e, data);
    }
  }, false);

  document.addEventListener("mouseover", function (e) {
    if (mouseHoverActions[e.target.getAttribute('name')]) {
      mouseHoverActions[e.target.getAttribute('name')](e);
    }
  }, false);

  document.addEventListener("mouseout", function (e) {
    if (mouseOutActions[e.target.getAttribute('name')]) {
      mouseOutActions[e.target.getAttribute('name')](e);
    }
  }, false);
}