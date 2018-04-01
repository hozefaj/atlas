// constants
const PAGE_SIZE = 28;

// global variables
let images = [];
let currImageIndex; // current image selected in modal

const imageContainer = document.getElementsByClassName('images__container')[0];
const modal = document.querySelector('.modal__dialog');
const modalBody = document.querySelector('.modal__body');

const getImages = async () => {
  const response = await fetch(
    `https://api.unsplash.com/photos/?client_id=4a0e0fa13f07d403a9763ad73f6e06a5c767574e890c7121bdf5249c48e2146f&page=0&per_page=${PAGE_SIZE}`
  );
  images = await response.json();

  // create thumbnail for every image
  for (let i = 0; i < PAGE_SIZE; i++) {
    // create image tag
    let img = document.createElement('img');
    img.setAttribute('src', images[i].urls.thumb);
    img.setAttribute('data-image-index', i);
    img.classList.add('images__thumbnail');

    // create anchor tag to wrap individual images
    let a = document.createElement('a');
    a.classList.add('images__anchor');
    a.href = '#';
    a.setAttribute('data-image-index', i);
    a.appendChild(img);
    imageContainer.appendChild(a);
  }
};
getImages();

// attach event listener for getting the onclick event from every image click
imageContainer.addEventListener('click', e => {
  e.preventDefault();

  // open modal only if image/anchor is clicked
  if (!e.target.classList.contains('images__container')) {
    // opening the modal
    modal.classList.add('open');
    currImageIndex = parseInt(e.target.dataset.imageIndex, 10);

    // getting the bigger version of the image
    let div = document.createElement('div');
    div.classList.add('modal_container');
    div.innerHTML = `
      <img
        src="${images[currImageIndex].urls.small}"
        class="modal__image"
      />
      <div class="modal__attribution">
        <a
          href="${images[currImageIndex].user.portfolio_url}"
          target="_blank"
          class="modal__link"
          >
          ${images[currImageIndex].user.first_name || ''}
          ${images[currImageIndex].user.last_name || ''}
        </a>
      </div>
    `;
    modalBody.appendChild(div);
  }
});

// closing the modal & removing image from modal
const closeModal = () => {
  modal.classList.remove('open');
  modalBody.querySelector('.modal_container').remove();
};

// capture click event on close button
const modalClose = document.querySelector('.close');
modalClose.addEventListener('click', () => {
  closeModal();
});

// capturing escape key to close the modal
const body = document.querySelector('body');
body.addEventListener('keyup', e => {
  // if escape key is pressed and modal is open
  if (e.keyCode === 27 && modal.classList.contains('open')) {
    closeModal();
  }
});

// handling previous button click on modal
const previous = document.querySelector('.previous');
previous.addEventListener('click', e => {
  e.preventDefault();

  if (currImageIndex - 1 >= 0) {
    next.classList.remove('disable');
    currImageIndex = currImageIndex - 1;

    updateContent();
  } else {
    previous.classList.add('disable');
  }
});

// handling next button click on modal
const next = document.querySelector('.next');
next.addEventListener('click', e => {
  e.preventDefault();

  if (currImageIndex + 1 < PAGE_SIZE) {
    previous.classList.remove('disable');
    currImageIndex = currImageIndex + 1;

    updateContent();
  } else {
    next.classList.add('disable');
  }
});

const updateContent = () => {
  // replace source with new image src
  let img = modalBody.querySelector('.modal__image');
  img.setAttribute('src', images[currImageIndex].urls.small);

  // replace author
  let a = modalBody.querySelector('.modal__link');
  a.setAttribute('href', images[currImageIndex].user.portfolio_url);
  a.innerHTML = images[currImageIndex].user.first_name + images[currImageIndex].user.last_name;
};
