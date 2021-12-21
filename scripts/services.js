document.addEventListener('DOMContentLoaded', async function (e) {
  const response  = await includeHTMLAsync();

  const beersData = JSON.parse(sessionStorage.getItem('beersData'));

  setHeaderLogo(beersData); 

  listeners(beersData); 
}, false);