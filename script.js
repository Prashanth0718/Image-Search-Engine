const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = document.querySelector(".uil-times");

//API key, paginations, searchTerm variables
const apiKey = "R99gFkpqFYrrct89nximMKplrJ0ElrmlVtPBrveqTiJx8SkGLs5GsoMp";
const perPage = 15 //we will load 15 images on every API call
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgURL) => {
    //res.blob() is a method that extracts the body of the response as a Blob (Binary Large Object). A Blob represents binary data, which in this case is the image file
    fetch(imgURL).then(res => res.blob()).then(file => { 
        // Converting received img to blob, creating its download link, and downloading it
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file); //Creates a temporary URL for the Blob object using URL.createObjectURL(file)
        a.download = new Date().getTime(); // Passing current time in milliseconds as <a> download value
        a.click();
    }).catch(() => alert("Failed to download image!"));
}

const showLightbox = (name, img) => {
    //showing lightbox and setting img source, name
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").innerText = name;
    lightBox.classList.add("show")
    //hiding the scrollbar when lightbox is shown
    document.body.style.overflow = "hidden";
}

const hideLightbox = () => { 
    //hiding the lightbox on close button
    lightBox.classList.remove("show")
    //showing the scrollbar when lightbox is shown
    document.body.style.overflow = "auto";
}


const generateHTML = (images) => {
    //Making li of all fetched images and adding them to the exiting image wrapper
    imagesWrapper.innerHTML += images.map(img => 
        ` <li class="card" onclick="showLightbox('${img.photographer}', '${img.src.large2x}')">
                <img src="${img.src.large2x}" alt="img">
                <div class="details">
                    <div class="photographer">
                        <i class="uil uil-camera"></i>
                        <span>${img.photographer}</span>
                    </div>
                    <button onclick="downloadImg('${img.src.large2x}')">
                        <i class="uil uil-import"></i>
                    </button>
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
    }).catch(()=> alert("Failed to load images!"));
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
closeBtn.addEventListener("click", hideLightbox);