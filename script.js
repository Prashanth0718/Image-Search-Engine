const apiKey = "R99gFkpqFYrrct89nximMKplrJ0ElrmlVtPBrveqTiJx8SkGLs5GsoMp";
const perPage = 15 //we will load 15 images on every API call
let currentPage = 1;

const getImages = (apiURL) => {
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        console.log(data);
    })
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);