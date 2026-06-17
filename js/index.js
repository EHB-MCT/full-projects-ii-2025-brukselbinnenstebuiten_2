const overlay = document.getElementById("overlay");
const back = document.getElementById("back");
const cross = document.getElementById("cross");
const dropdown_button_location = document.getElementById("dropdown_button_location");
const dropdown_content_location = document.getElementById("dropdown_content_location");
const dropdown_button_sort = document.getElementById("dropdown_button_sort");
const dropdown_content_sort = document.getElementById("dropdown_content_sort");
const sort_box = document.getElementById("sort_box");
const sort_1 = document.getElementById("sort_1");
const sort_1_button = document.getElementById("sort_1_button");
const sort_2 = document.getElementById("sort_2");
const sort_2_button = document.getElementById("sort_2_button");
const location_1 = document.getElementById("location_1");
const location_1_button = document.getElementById("location_1_button");
const location_2 = document.getElementById("location_2");
const location_2_button = document.getElementById("location_2_button");
const location_3 = document.getElementById("location_3");
const location_3_button = document.getElementById("location_3_button");
const location_none = document.getElementById("location_none");
const location_geen_button = document.getElementById("location_geen_button");
const imageList = document.getElementById("image_list");
const input = document.getElementById("searchbar");
const overlay_image = document.getElementById("overlay_image");
const title = document.getElementById("title");
const date = document.getElementById("date");
const chosen_location = document.getElementById("dropdown-grijs");
const locations = document.getElementById("location");
const filter_confirm = document.getElementById("filter_confirm");
const date_lowest = document.getElementById("date_lowest");
const date_highest = document.getElementById("date_highest");
const check1 = document.getElementById("check1");
const check3 = document.getElementById("check3");
const params = new URLSearchParams(window.location.search);
const gegeven = params.get("gegeven");
const filter_invert_btn = document.getElementById("filter_invert_btn");
const filter_normal = document.getElementById("filter_normal");
const filter_inverted = document.getElementById("filter_inverted");
const right_page = document.getElementById("right_page");
const left_page = document.getElementById("left_page");
const left_arrow = document.getElementById("left_arrow");
const right_arrow = document.getElementById("right_arrow");
const imagesPerPage = 30;
let currentPage = 1;
let totalPages = 0;
let currentImageIndex = 0;
let currentFilteredImages = [];

(async () => {
    const imagesRes = await fetch("../js/beeldbank.json");
    if (!imagesRes.ok) throw new Error(`Failed to fetch images: ${imagesRes.status}`);
    const images = await imagesRes.json();

    images.forEach(imageData => {
        let filename_date = "Geen datum";
        let filename_location = "Geen locatie";
        imageData.date = 0;
        let filename = imageData.filename.slice(0, -4);
        let filename_list = filename.split(/[ ,-]+/);
        filename_list.forEach(filename_part => {
            const year = Number(filename_part);
            if (year > 1000 && year < 5000) {
                filename_date = filename_part;
                filename_date = Number(filename_date);
                imageData.date = filename_date;
            }
            let filename_part_lower = filename_part.toLowerCase();
            if (filename_part_lower == "schaarbeek") {
                filename_location = "Schaarbeek";
            } else if (filename_part_lower == "gillis") {
                filename_location = "St-Gillis";
            } else if (filename_part_lower == "noordwijk") {
                filename_location = "Noordwijk";
            }
        });
        imageData.date_correct = filename_date;
        imageData.location = filename_location;
    });

    images.sort();
    
    createFilteredImages(images, currentPage);
    createPageIcons(images);

    left_arrow.addEventListener("click", () => {
        currentImageIndex -= 1;
        if (currentImageIndex < 0) {
            currentImageIndex = currentFilteredImages.length - 1;
        }
        showOverlayImage();
    });

    right_arrow.addEventListener("click", () => {
        currentImageIndex += 1;
        if (currentImageIndex >= currentFilteredImages.length) {
            currentImageIndex = 0;
        }
        showOverlayImage();
    });

    input.value = gegeven;
    input.dispatchEvent(new Event("input"));
    
    input.addEventListener("input", () => {
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });

    date_highest.addEventListener("input", () => {
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });

    date_lowest.addEventListener("input", () => {
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });
    
    left_page.addEventListener("click", () => {
        if (!(currentPage <= 1)) {
            currentPage -= 1;
            createFilteredImages(images, currentPage);
        }
    });
    
    right_page.addEventListener("click", () => {
        if (!(currentPage >= totalPages)) {
            currentPage += 1;
            createFilteredImages(images, currentPage);
        }
    });

    location_1_button.addEventListener("click", () => {
        dropdown_content_location.style.display = "none";
        chosen_location.innerText = location_1.innerText;
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });
    
    location_2_button.addEventListener("click", () => {
        dropdown_content_location.style.display = "none";
        chosen_location.innerText = location_2.innerText;
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });
    
    location_3_button.addEventListener("click", () => {
        dropdown_content_location.style.display = "none";
        chosen_location.innerText = location_3.innerText;
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });
    
    location_geen_button.addEventListener("click", () => {
        dropdown_content_location.style.display = "none";
        chosen_location.innerText = location_none.innerText;
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });

    check1.addEventListener("click", () => {
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });

    check3.addEventListener("click", () => {
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });

    dropdown_button_location.addEventListener("click", () => {
        if (dropdown_content_location.style.display == "block") {
            dropdown_content_location.style.display = "none";
        } else {
            dropdown_content_location.style.display = "block";
        }
    });
    
    dropdown_button_sort.addEventListener("click", () => {
        if (dropdown_content_sort.style.display == "block") {
            dropdown_content_sort.style.display = "none";
        } else {
            dropdown_content_sort.style.display = "block";
        }
    });
    
    sort_1_button.addEventListener("click", () => {
        dropdown_content_sort.style.display = "none";
        sort_box.innerText = sort_1.innerText;
        if (filter_inverted.hidden) {
            images.sort((a, b) => {
                if (a.date === null) return -1;
                if (b.date === null) return 1;
                return b.date - a.date;
            });
        } else {
            images.sort((a, b) => {
                if (a.date === null) return -1;
                if (b.date === null) return 1;
                return a.date - b.date;
            });
        }
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });
    
    sort_2_button.addEventListener("click", () => {
        dropdown_content_sort.style.display = "none";
        sort_box.innerText = sort_2.innerText;
        if (filter_inverted.hidden) {
            images.sort((a, b) => a.filename.localeCompare(b.filename));
        } else {
            images.sort((a, b) => b.filename.localeCompare(a.filename));
        }
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });

    filter_invert_btn.addEventListener("click", () => {
        if (filter_inverted.hidden) {
            filter_inverted.hidden = false;
            filter_normal.hidden = true;
            if (sort_box.innerText == "Datum") {
                images.sort((a, b) => {
                    if (a.date === null) return -1;
                    if (b.date === null) return 1;
                    return a.date - b.date;
                });
            } else {
                images.sort((a, b) => b.filename.localeCompare(a.filename));
            }
        } else {
            filter_inverted.hidden = true;
            filter_normal.hidden = false;
            if (sort_box.innerText == "Datum") {
                images.sort((a, b) => {
                    if (a.date === null) return -1;
                    if (b.date === null) return 1;
                    return b.date - a.date;
                });
            } else {
                images.sort((a, b) => a.filename.localeCompare(b.filename));
            }
        }
        currentPage = 1;
        createFilteredImages(images, currentPage);
    });
    
    back.addEventListener("click", () => {
        overlay.style.display = "none";
    });
    
    cross.addEventListener("click", () => {
        overlay.style.display = "none";
    });
})();

function createFilteredImages(images, page = 1) {
    imageList.innerHTML = "";

    const filteredImages = images.filter(imageData => {
        const filename = imageData.filename.slice(0, -4).toLowerCase();

        if (!filename.includes(input.value.toLowerCase())) {
            return false;
        }
        if (chosen_location.innerText !== "-" && imageData.location.toLowerCase() !== chosen_location.innerText.toLowerCase()) {
            return false;
        }
        if (date_lowest.value && imageData.date_correct !== "Geen datum" && imageData.date_correct < Number(date_lowest.value)) {
            return false;
        }
        if (date_highest.value && imageData.date_correct !== "Geen datum" && imageData.date_correct > Number(date_highest.value)) {
            return false;
        }
        if (check1.checked && imageData.date_correct !== "Geen datum" && imageData.location !== "Geen locatie") {
            return false;
        }
        if (check3.checked && !filename.includes("kaart")) {
            return false;
        }
        return true;
    });
    currentFilteredImages = filteredImages;

    const start = (page - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    const pageImages = filteredImages.slice(start, end);

    pageImages.forEach(imageData => {
        let filename = imageData.filename.slice(0, -4);
        const container = document.createElement("li");
        container.className = "filtered_image_container";

        const image = document.createElement("img");
        image.className = "filtered_image";
        image.src = imageData.path;
        image.alt = "Filtered image";

        const text = document.createElement("p");
        text.id = "filtered_image_txt";
        text.textContent = filename;
        text.hidden = true;

        container.appendChild(image);
        container.appendChild(text);
        imageList.appendChild(container);

        image.addEventListener("click", () => {
            currentImageIndex = filteredImages.indexOf(imageData);
            showOverlayImage();
        });
    });
    createPageIcons(filteredImages);
}

function showOverlayImage() {
    const imageData = currentFilteredImages[currentImageIndex];

    overlay.style.display = "block";
    overlay_image.src = imageData.path;
    title.innerText = imageData.filename.slice(0, -4);
    date.innerText = imageData.date_correct;
    locations.innerText = imageData.location;
}

function createPageIcons(images) {
    const page_icons = document.getElementById("page_icons");
    page_icons.innerHTML = "";

    totalPages = Math.ceil(images.length / imagesPerPage);

    function addButton(page) {
        const btn = document.createElement("button");
        btn.textContent = page;
        btn.addEventListener("click", () => {
            currentPage = page;
            createFilteredImages(images, currentPage);
            createPageIcons(images);
        });
        page_icons.appendChild(btn);
    }

    function addDots() {
        const span = document.createElement("span");
        span.textContent = "...";
        page_icons.appendChild(span);
    }

    addButton(1);
    if (currentPage > 3) {
        addDots();
    }
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        addButton(i);
    }
    if (currentPage < totalPages - 2) {
        addDots();
    }
    if (totalPages > 1) {
        addButton(totalPages);
    }
}