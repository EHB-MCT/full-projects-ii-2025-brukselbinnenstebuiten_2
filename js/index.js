const overlay = document.getElementById("overlay");
const filtered_image = document.querySelector("#filtered_image");
const back = document.querySelector(".back");
const cross = document.querySelector(".cross");
const dropdown_button_location = document.querySelector("#dropdown_button_location");
const dropdown_content_location = document.querySelector("#dropdown_content_location");
const dropdown_button_sort = document.querySelector("#dropdown_button_sort");
const dropdown_content_sort = document.querySelector("#dropdown_content_sort");
const sort_box = document.querySelector("#sort_box");
const sort_1 = document.querySelector("#sort_1");
const sort_1_button = document.querySelector("#sort_1_button");
const sort_2 = document.querySelector("#sort_2");
const sort_2_button = document.querySelector("#sort_2_button");
const location_box = document.querySelector("#dropdown-grijs");
const location_1 = document.querySelector("#location_1");
const location_1_button = document.querySelector("#location_1_button");
const location_2 = document.querySelector("#location_2");
const location_2_button = document.querySelector("#location_2_button");
const location_3 = document.querySelector("#location_3");
const location_3_button = document.querySelector("#location_3_button");
const location_geen = document.querySelector("#location_geen");
const location_geen_button = document.querySelector("#location_geen_button");
let images = [];


fetch("../js/beeldbank.json")
    .then(res => res.json())
    .then(data => {
        images = data;
        console.log(data);


        filtered_image.src = images[0].path;

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
    });
    
