function navbarVisibility (navbar, value) { navbar.style.visibility = value; }
function navbarOpacity    (navbar, value) { navbar.style.opacity    = value; }
function navbarWidth      (navbar, value) { navbar.style.width      = value; }
function navbarTransition (navbar, value) { navbar.style.transition = value; }

function navbarAnimation() {
  const navbar  = document.getElementById('nav-bar');
  if(getStyle(navbar, 'opacity') == 0) {
    navbarVisibility  (navbar, 'visible');
    navbarOpacity     (navbar, 1);
    navbarWidth       (navbar, '100%');
    navbarTransition  (navbar, '1s');
  } else {
    navbarVisibility  (navbar, 'hidden');
    navbarOpacity     (navbar, 0);
    navbarWidth       (navbar, '0%');
    navbarTransition  (navbar, '1s');
  }
}