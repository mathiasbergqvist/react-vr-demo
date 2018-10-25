import axios from 'axios';

export const getBackgrounds = async () => {
    const photoIds = [
        34506405094,
        5097827282,
    ];
    const promises = photoIds.map(id => getImage(id));

    return Promise.all(promises)
    .then(results => results)
    .catch(err => {
        console.error("when fetching background images", err);
    });
};

export const getImage = (photoId) => {
    const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${process.env.FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;

    return axios.get(flickrUrl)
    .then(data => { 
        return data.data.sizes.size;
    })
    .then(allSizes => (
        allSizes.filter(size => size.label === "Large")
    ))
    .then(image => {
        return image[0].source;
    })
};