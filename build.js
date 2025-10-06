const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

const viewsPath = path.join(__dirname, "views");
const distPath = path.join(__dirname, "dist");

function findEjsFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(findEjsFiles(file));
        } else {
            if (path.extname(file) === '.ejs') {
                results.push(file);
            }
        }
    });
    return results;
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
//clean and create folder dist
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true });
}
fs.mkdirSync(distPath);

copyFolderSync(path.join(__dirname, 'public'), path.join(distPath, 'public'));

const allEjsFiles = findEjsFiles(viewsPath);

allEjsFiles.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const htmlContent = ejs.render(fileContent, { filename: filePath });

    const relativePath = path.relative(viewsPath, filePath);
    const outputFileName = relativePath.replace('.ejs', '.html');
    const outputPath = path.join(distPath, outputFileName);

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, htmlContent);
    console.log(`✅ ${path.relative(viewsPath, filePath)} -> ${outputFileName}`);
});
