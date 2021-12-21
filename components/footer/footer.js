function footerMouseHover(e) {
  e.target.parentNode.style.border      = '2px solid #000000';
  e.target.parentNode.style.transition  = '.5s';
}

function footerMouseOut(e) {
  e.target.parentNode.style.backgroundColor = 'unset';
  e.target.parentNode.style.border          = '2px solid #ffffff00';
}