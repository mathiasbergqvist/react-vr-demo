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
    const FLICKR_API_KEY = '294f34ea89e701cd06bf7f63d4b7e8c5';
    const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;

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