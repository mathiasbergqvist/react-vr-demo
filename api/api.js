import axios from 'axios';

export const getImages = (photoId) => {
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