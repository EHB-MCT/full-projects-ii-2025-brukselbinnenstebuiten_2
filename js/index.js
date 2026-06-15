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
const location_box = document.getElementById("dropdown-grijs");
const location_1 = document.getElementById("location_1");
const location_1_button = document.getElementById("location_1_button");
const location_2 = document.getElementById("location_2");
const location_2_button = document.getElementById("location_2_button");
const location_3 = document.getElementById("location_3");
const location_3_button = document.getElementById("location_3_button");
const location_geen = document.getElementById("location_geen");
const location_geen_button = document.getElementById("location_geen_button");

(async () => {
    const imagesRes = await fetch("../js/beeldbank.json");
    if (!imagesRes.ok) throw new Error(`Failed to fetch images: ${imagesRes.status}`);
    const images = await imagesRes.json();
    images.sort();
    console.log(images);

    createFilteredImages(images);
    
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
    });
    
    sort_2_button.addEventListener("click", () => {
        dropdown_content_sort.style.display = "none";
        sort_box.innerText = sort_2.innerText;
    });
    
    location_1_button.addEventListener("click", () => {
        dropdown_content_location.style.display = "none";
        location_box.innerText = location_1.innerText;
    });
    
    location_2_button.addEventListener("click", () => {
        dropdown_content_location.style.display = "none";
        location_box.innerText = location_2.innerText;
    });
    
    location_3_button.addEventListener("click", () => {
        dropdown_content_location.style.display = "none";
        location_box.innerText = location_3.innerText;
    });
    
    location_geen_button.addEventListener("click", () => {
        dropdown_content_location.style.display = "none";
        location_box.innerText = location_geen.innerText;
    });
    
    back.addEventListener("click", () => {
        overlay.style.display = "none";
    });
    
    cross.addEventListener("click", () => {
        overlay.style.display = "none";
    });
})();

function createFilteredImages(images) {
    const imageList = document.getElementById("image_list");
    const input = document.getElementById("searchbar");

    imageList.innerHTML = "";
    let image_id = 0;
    let text_id = 0;

    images.forEach(imageData => {
        const container = document.createElement("li");
        container.className = "filtered_image_container";

        const image = document.createElement("img");
        image.className = "filtered_image";
        image.src = imageData.path;
        image.alt = "Filtered image";

        const text = document.createElement("p");
        text.id = "filtered_image_txt";
        text.textContent = imageData.filename;
        text.hidden = true;

        container.appendChild(image);
        container.appendChild(text);
        imageList.appendChild(container);

        image.addEventListener("click", () => {
            overlay.style.display = "block";
        });

        input.addEventListener("input", () => {
            const lowName = imageData.filename.toLowerCase();
            const lowInput = input.value.toLowerCase();
            if (lowName.includes(lowInput)) {
                container.removeAttribute("hidden");
            } else {
                container.setAttribute("hidden", true);
            }
        });
    });
}