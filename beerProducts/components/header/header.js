function setHeaderLogo(data) {
  const headerLogoImgs    = document.querySelector('.header-logo-imgs');

  if(data.constructor === Array) {
    for (let i = 0; i < data.length; i++) {
      const newImg        = document.createElement('img');
      newImg.src          = data[i].image_url;
      newImg.alt          = 'imagen';
      headerLogoImgs.appendChild(newImg); 
    }
  } else {
    const newImg          = document.createElement('img');
    newImg.src            = data;
    newImg.alt            = 'imagen';
    headerLogoImgs.appendChild(newImg); 
  }
}