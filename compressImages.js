// compress-images.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = path.join(__dirname, "/var/www/example.com/public/media/goh_vAE/media/images");
const outputDir = path.join(__dirname, "public/optimized");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  sharp(inputPath)
    .resize({ width: 1200 }) // Resize if needed
    .toFormat("webp", { quality: 70 }) // Compress to WebP
    .toFile(outputPath)
    .then(() => console.log(`Optimized: ${file}`))
    .catch(err => console.error(`Error optimizing ${file}:`, err));
});
