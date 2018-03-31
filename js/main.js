// constants
const PAGE_SIZE = 20;

// global variables
let page = 0;
let currImage; // current image selected in modal

const imageContainer = document.getElementsByClassName('images__container')[0];
const modal = document.querySelector('.modal__dialog');
const modalBody = document.querySelector('.modal__body');

// create thumbnail for every image
const createThumbnails = () => {
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  for(let i=start; i<end; i++){
    // create image tag
    let img = document.createElement('img');
    img.setAttribute('src', `https://picsum.photos/200/300?image=${i}`);
    img.classList.add('images__thumbnail');

    // create anchor tag to wrap individual images
    let a = document.createElement('a');
    a.classList.add('images__anchor')
    a.href = "#"
    a.appendChild(img);
    imageContainer.appendChild(a);
  }
}
createThumbnails();

// attach event listener for getting the onclick event from every image click
imageContainer.addEventListener('click', (e) => {
  e.preventDefault();

  // open modal only if image is clicked
  if(e.target.localName === 'img') {
    // opening the modal
    modal.classList.add('open');

    // getting the bigger version of the image
    currImage = parseInt(e.target.src.split('=')[1], 10);

    let img = document.createElement('img');
    img.setAttribute('src', `https://picsum.photos/600?image=${currImage}`);
    img.classList.add('modal__image');
    modalBody.appendChild(img);
  }
})

// closing the modal & removing image from modal
const closeModal = () => {
  modal.classList.remove('open');
  modalBody.querySelector('.modal__image').remove();
}

// capture click event on close button
const modalClose = document.querySelector('.close');
modalClose.addEventListener('click', () => {
  closeModal();
});

// capturing escape key to close the modal
const body = document.querySelector('body');
body.addEventListener('keyup', (e) => {
  // if escape key is pressed and modal is open
  if(e.keyCode === 27 && modal.classList.contains('open')) {
    closeModal();
  }
});

// handling previous button click on modal
const previous = document.querySelector('.previous');
previous.addEventListener('click', (e) => {
  e.preventDefault();

  if(currImage - 1 >= 0) {
    // remove existing image
    modalBody.querySelector('.modal__image').remove();

    // add new image
    currImage = currImage - 1;
    let img = document.createElement('img');
    img.setAttribute('src', `https://picsum.photos/600?image=${currImage}`);
    img.classList.add('modal__image');
    modalBody.appendChild(img);
  }
});

// handling next button click on modal
const next = document.querySelector('.next');
next.addEventListener('click', (e) => {
  e.preventDefault();


  if(currImage + 1 <= PAGE_SIZE) {
    // remove existing image
    modalBody.querySelector('.modal__image').remove();

    // add new image
    currImage = currImage + 1;
    let img = document.createElement('img');
    img.setAttribute('src', `https://picsum.photos/600?image=${currImage}`);
    img.classList.add('modal__image');
    modalBody.appendChild(img);
  }
});

// TODO: create pagination


// TODO: fetching the images
// issue is the response does not the URL of the image
// const getImages = async () => {
//   const response = await fetch('https://picsum.photos/list');
//   images = await response.json();
// }
// getImages();

// const numItemsToGenerate = 20; //how many gallery items you want on the screen
// const imageWidth = 480; //your desired image width in pixels
// const imageHeight = 480; //desired image height in pixels
// const collectionID = 1163637; //the collection ID from the original url

// const renderGalleryItem = async () => {
//   const response = await fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/`, {mode: 'no-cors'});
//   const data = await response.json();
//   console.log(response)
//   let galleryItem = document.createElement('div');
//   galleryItem.classList.add('gallery-item');
//   galleryItem.innerHTML = `
//     <img class="gallery-image" src="${response.url}" alt="gallery image"/>
//   `
//   document.body.appendChild(galleryItem);
//   console.log(galleryItem);
// }
// for(let i=0;i<numItemsToGenerate;i++){
//   renderGalleryItem();
// }