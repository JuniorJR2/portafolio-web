const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const viewsPath = path.join(__dirname, "views");
const distPath = path.join(__dirname, "dist");

if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

function copyFolderSync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

copyFolderSync(path.join(__dirname, 'public'), path.join(distPath, 'public'));

const files = fs.readdirSync(viewsPath);

files.forEach(file => {
    if (path.extname(file) === '.ejs') {
        const filePath = path.join(viewsPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const htmlContent = ejs.render(fileContent, { filename: filePath });



        const outputFileName = path.basename(file, '.ejs') + '.html';
        const outputPath = path.join(distPath, outputFileName);
        fs.writeFileSync(outputPath, htmlContent);

        console.log(`${file} -> ${outputFileName}`);
    }
})