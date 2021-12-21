function openModal(e, modalCaptionText, modalCaptionSelectorText) {
  const modal               = document.querySelector('.modal');
  const modalImg            = document.querySelector('.modal-container img');
  const modalCaption        = document.querySelector('.modal-caption');

  modalImg.src              = e.target.src;
  modalImg.id               = e.target.id;

  if(modalCaptionSelectorText) {
    const detailsName       = e.target.parentNode.querySelector(modalCaptionSelectorText);
    modalCaption.innerHTML  = detailsName.innerHTML;
  } else {
    modalCaption.innerHTML  = modalCaptionText;
  }

  modal.style.display       = 'flex';
}

function closeModal() {
  const modal               = document.querySelector('.modal');
  modal.style.display       = 'none';
}