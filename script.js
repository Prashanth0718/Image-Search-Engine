const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");

const apiKey = "R99gFkpqFYrrct89nximMKplrJ0ElrmlVtPBrveqTiJx8SkGLs5GsoMp";
const perPage = 15 //we will load 15 images on every API call
let currentPage = 1;

const generateHTML = (images) => {
    //Making li of all fetched images and adding them to the exiting image wrapper
    imagesWrapper.innerHTML += images.map(img => 
        ` <li class="card">
                <img src="${img.src.large2x}" alt="img">
                <div class="details">
                    <div class="photographer">
                        <i class="uil uil-camera"></i>
                        <span>${img.photographer}</span>
                    </div>
                    <button><i class="uil uil-import"></i></button>
                </div>
            </li>`
    ).join("");
}

const getImages = (apiURL) => {
    // featching images by API call with authorization header
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
    })
}

const loadMoreImages = () => {
    currentPage++; // Increment currentPage by 1
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
    getImages(apiURL);
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

loadMoreBtn.addEventListener("click", loadMoreImages);