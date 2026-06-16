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
    imageList.innerHTML = "";

    images.forEach(imageData => {
        let filename_date = "Geen datum";
        let filename_location = "Geen locatie";
        const filename = imageData.filename.slice(0, -4);
        const filename_list = filename.split(/[ ,-]+/);
        filename_list.forEach(filename_part => {
            const year = Number(filename_part);
            if (year > 1000 && year < 5000) {
                filename_date = filename_part;
                filename_date = Number(filename_date);
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

        input.addEventListener("input", () => {
            const lowName = filename.toLowerCase();
            const lowInput = input.value.toLowerCase();
            if (lowName.includes(lowInput)) {
                container.removeAttribute("hidden");
            } else {
                container.setAttribute("hidden", true);
            }
        });

        filter_confirm.addEventListener("click", () => {
            container.setAttribute("hidden", true);
            if (date_lowest.value != "" || date_highest.value != "") {
                if (filename_date != "Geen datum") {
                    if (date_lowest.value == "" && date_highest.value != "") {
                        if (filename_date <= Number(date_highest.value)) {
                            filter_part();
                        } else {
                            container.setAttribute("hidden", true);
                        }
                    } else if (date_lowest.value != "" && date_highest.value == "") {
                        if (filename_date >= Number(date_lowest.value)) {
                            filter_part();
                        } else {
                            container.setAttribute("hidden", true);
                        }
                    } else if (date_lowest.value != "" && date_highest.value != "") {
                        if (filename_date >= Number(date_lowest.value) && filename_date <= Number(date_highest.value)) {
                            filter_part();
                        } else {
                            container.setAttribute("hidden", true);
                        }
                    }
                } else {
                    container.setAttribute("hidden", true);
                }
            } else if (chosen_location.innerText.toLowerCase() != "-") {
                if (filename.toLowerCase().includes(chosen_location.innerText.toLowerCase())) {
                    container.removeAttribute("hidden");
                } else {
                    container.setAttribute("hidden", true);
                }
            } else {
                container.removeAttribute("hidden");
            }
            if (check1.checked) {
                if (filename_date == "Geen datum" || filename_location == "Geen locatie") {
                    container.removeAttribute("hidden");
                }
            }
            if (check3.checked) {
                if (!filename.toLowerCase().includes("kaart")) {
                    container.setAttribute("hidden", true);
                }
            }
            const lowName = filename.toLowerCase();
            const lowInput = input.value.toLowerCase();
            if (!lowName.includes(lowInput)) {
                container.setAttribute("hidden", true);
            }
        });

        image.addEventListener("click", () => {
            overlay.style.display = "block";
            overlay_image.src = imageData.path;
            title.innerText = filename;
            date.innerText = filename_date;
            locations.innerText = filename_location;
        });

        function filter_part() {
            if (chosen_location.innerText.toLowerCase() != "-") {
                if (filename.toLowerCase().includes(chosen_location.innerText.toLowerCase())) {
                    container.removeAttribute("hidden");
                } else {
                    container.setAttribute("hidden", true);
                }
            } else {
                container.removeAttribute("hidden");
            }
        }
    });
}