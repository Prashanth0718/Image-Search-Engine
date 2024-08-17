const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");

//API key, paginations, searchTerm variables
const apiKey = "R99gFkpqFYrrct89nximMKplrJ0ElrmlVtPBrveqTiJx8SkGLs5GsoMp";
const perPage = 15 //we will load 15 images on every API call
let currentPage = 1;
let searchTerm = null;

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
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    })
}

const loadMoreImages = () => {
    currentPage++; // Increment currentPage by 1
    //if searchTerm has some value then call API with the search term else call default API
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiURL;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    //if the search input is empty, set the searchTerm to null and return from here
    if(e.target.value === "") return searchTerm = null ;
    //If pressed key is Enter, update the current page, search term & call getImages
    if(e.key === 'Enter') {
        currentPage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`)
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);