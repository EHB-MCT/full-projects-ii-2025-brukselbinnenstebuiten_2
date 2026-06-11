const overlay = document.getElementById("overlay");
const filtered_image = document.querySelector(".filtered_image");
const back = document.querySelector(".back");
const cross = document.querySelector(".cross");
const dropdown_button_location = document.querySelector("#dropdown_button_location");
const dropdown_content_location = document.querySelector("#dropdown_content_location");
const dropdown_button_sort = document.querySelector("#dropdown_button_sort");
const dropdown_content_sort = document.querySelector("#dropdown_content_sort");

filtered_image.addEventListener("click", () => {
    overlay.style.display = "block";
});

back.addEventListener("click", () => {
    overlay.style.display = "none";
});

cross.addEventListener("click", () => {
    overlay.style.display = "none";
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