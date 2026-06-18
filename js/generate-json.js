const fs = require("fs");
const path = require("path");

const folderPath = "../Assets/Beeldbank";

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

    const images = files
        .filter(file =>
            imageExtensions.includes(path.extname(file).toLowerCase())
        )
        .map(file => ({
            filename: file,
            path: `./Assets/Beeldbank/${file}`,
        }));

    fs.writeFileSync(
        "beeldbank.json",
        JSON.stringify(images, null, 4)
    );

    console.log("beeldbank.json created!");
});