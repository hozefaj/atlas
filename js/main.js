// TODO: fetching the images

// constants
const PAGE_SIZE = 20;

// global variables
// let images = [];
let page = 0;

// issue is the response does not the URL of the image
// const getImages = async () => {
//   const response = await fetch('https://picsum.photos/list');
//   images = await response.json();
// }

const imageContainer = document.getElementsByClassName('images__container')[0];
const modal = document.querySelector('.modal__dialog');
const modalBody = document.querySelector('.modal__body');

// TODO: show spinner while image are loading
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

  // opening the modal
  modal.classList.add('open');

  // getting the bigger version of the image
  console.dir(e.target.src);
  const number = e.target.src.split('=')[1];

  let img = document.createElement('img');
  img.setAttribute('src', `https://picsum.photos/600?image=${number}`);
  img.classList.add('modal__image');
  modalBody.appendChild(img);
})

// closing the modal & removing image from modal
const modalClose = document.querySelector('.close');
modalClose.addEventListener('click', () => {
  modal.classList.remove('open');
  modalBody.querySelector('.modal__image').remove();
});


// TODO: create pagination

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