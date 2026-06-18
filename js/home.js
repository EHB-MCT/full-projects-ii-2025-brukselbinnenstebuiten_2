const suggestion1 = document.getElementById("suggestion1");
const suggestion2 = document.getElementById("suggestion2");
const suggestion3 = document.getElementById("suggestion3");

suggestion1.addEventListener("click", () => {
    window.location.href = `pages/Collection.html?gegeven=${encodeURIComponent(suggestion1.innerText)}`;
});

suggestion2.addEventListener("click", () => {
    window.location.href = `pages/Collection.html?gegeven=${encodeURIComponent(suggestion2.innerText)}`;
});

suggestion3.addEventListener("click", () => {
    window.location.href = `pages/Collection.html?gegeven=${encodeURIComponent(suggestion3.innerText)}`;
});

(async () => {

    const imagesRes = await fetch("js/beeldbank.json");
    const images = await imagesRes.json();

    const main_row_1 = images.filter(image => image.filename.toLowerCase().includes(suggestion1.innerText.toLowerCase())).slice(0, 5);

    const main_row_2 = images.filter(image => image.filename.toLowerCase().includes(suggestion2.innerText.toLowerCase())).slice(0, 5);

    const main_row_3 = images.filter(image => image.filename.toLowerCase().includes(suggestion3.innerText.toLowerCase())).slice(0, 5);

    fillRow(main_row_1, "main_row_1");
    fillRow(main_row_2, "main_row_2");
    fillRow(main_row_3, "main_row_3");

})();

function fillRow(fotos, rowId) {

    const row = document.getElementById(rowId);

    row.innerHTML = "";
    let amount = 0;

    fotos.forEach(imageData => {
        amount += 1;
        const li = document.createElement("li");
        const img = document.createElement("img");

        img.className = "main_row_img suggested_image";
        img.src = imageData.path2;
        img.alt = imageData.filename;

        const inverted_bar_img = document.createElement("img");

        inverted_bar_img.className = "main_row_img";
        inverted_bar_img.src = "Assets/Image/Inverted_bar_image_" + amount + ".png";
        inverted_bar_img.alt = "inverted bar img";

        const choice = Math.floor(Math.random() * 5);

        li.appendChild(img);
        li.appendChild(inverted_bar_img);
        if (choice == 1) {
            const box = document.createElement("img");
            box.className = "marker-overlay";
            box.src = "Assets/Image/Vector5.png";
            box.alt = "overlay square";
            li.appendChild(box);
        } else if (choice == 2) {
            const arrow = document.createElement("img");
            arrow.className = "marker-overlay-arrow";
            arrow.src = "Assets/Image/Group 1.png";
            arrow.alt = "overlay arrow";
            li.appendChild(arrow);
        } else if (choice == 3) {
            const circle = document.createElement("img");
            circle.className = "marker-overlay";
            circle.src = "Assets/Image/Vector 1.png";
            circle.alt = "overlay circle";
            li.appendChild(circle);
        }

        row.appendChild(li);

    });

}

const carousel = document.querySelector(".right_row");

document.getElementById("next").addEventListener("click", () => {
    carousel.scrollBy({
        left: carousel.clientWidth,
        behavior: "smooth"
    });
});

document.getElementById("prev").addEventListener("click", () => {
    carousel.scrollBy({
        left: -carousel.clientWidth,
        behavior: "smooth"
    });
});