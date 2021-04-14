import gallery from "./gallery-items.js";

// references
const galleryListRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('div.lightbox');
const closeBtnRef = document.querySelector('.lightbox__button');
const overlayRef = document.querySelector('.lightbox__overlay');
const modalImageContainerRef = document.querySelector('.lightbox__image');
// markup creation
const galleryMarkup = createGalleryMarkup(gallery);
galleryListRef.insertAdjacentHTML('beforeend', galleryMarkup);
// functions
function createGalleryMarkup(gallery) {
  return gallery.map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `
  })
    .join("")
}

function onGalleryCardClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return
  }
  openModal();
  setImageToModal(event);
}

function openModal() {
  modalRef.classList.add('is-open');
}
function closeModal() {
  removeImageFromModal();
  modalRef.classList.remove('is-open')
}

function setImageToModal(event) {
  modalImageContainerRef.setAttribute("src", `${event.target.getAttribute('data-source')}`)
}
function removeImageFromModal() {
  modalImageContainerRef.setAttribute("src", "")
}
//event listeners
document.addEventListener('keyup', event => {
  if (event.key === "Escape") {
    closeModal()
  }
})
galleryListRef.addEventListener('click', onGalleryCardClick)
overlayRef.addEventListener('click', closeModal)
closeBtnRef.addEventListener('click', closeModal)
