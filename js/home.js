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

    fotos.forEach(imageData => {

        const li = document.createElement("li");

        const img = document.createElement("img");

        img.className = "main_row_img";
        img.src = imageData.path;
        img.alt = imageData.filename;

        const inverted_bar_img = document.createElement("img");

        inverted_bar_img.className = "main_row_img";
        inverted_bar_img.src = imageData.path;
        inverted_bar_img.alt = "inverted bar img";

        li.appendChild(img);
        li.appendChild(inverted_bar_img);

        row.appendChild(li);

    });

}