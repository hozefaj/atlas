import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "23738",
  secret: "3ddc2f197b80b569f266743fa6b00b7b7c38dd27361fff7ae6d2cabb80e384ed",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

unsplash.photos.listPhotos(2, 15, "latest")
  .then(toJson)
  .then(json => {
    // Your code
    console.log(json);
  });