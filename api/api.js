import axios from "axios";

export const getBackgrounds = async (destinations) => {

  const promises = destinations.map(destination =>
    getImage(destination.photoId, destination.id)
  );

  return Promise.all(promises)
    .then(images => {
      return destinations.map(destination => {
        const associatedBackground = images.find(
          image => image.id === destination.id
        );
        return {
            ...destination,
          background: associatedBackground.image
        };
      });
    })
    .catch(err => {
      console.error("when fetching background images", err);
    });
};

export const getImage = (photoId, id) => {
  const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${process.env.FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;

  return axios
    .get(flickrUrl)
    .then(data => {
      return data.data.sizes.size;
    })
    .then(allSizes => allSizes.filter(size => size.label === "Large"))
    .then(image => {
      return {
        id,
        image: image[0].source
      };
    });
};
