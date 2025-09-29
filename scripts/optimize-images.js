const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Configuration for different image types
const configs = {
  product: { width: 800, height: 800, quality: 80 },
  hero: { width: 1200, height: 1600, quality: 85 },
  thumbnail: { width: 400, height: 400, quality: 75 },
};

async function optimizeImage(inputPath, config) {
  try {
    const originalSize = fs.statSync(inputPath).size;

    // Create temporary file
    const tempPath = inputPath + '.temp';

    const info = await sharp(inputPath)
      .resize(config.width, config.height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: config.quality, progressive: true })
      .toFile(tempPath);

    // Replace original with optimized
    fs.renameSync(tempPath, inputPath);

    const newSize = info.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`);

    return { original: originalSize, optimized: newSize };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir, config = configs.product) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const result = await processDirectory(fullPath, config);
      totalOriginal += result.totalOriginal;
      totalOptimized += result.totalOptimized;
    } else if (entry.name.match(/\.(png|jpg|jpeg)$/i)) {
      // Create backup and optimize
      const backupPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.backup$&');

      // Only backup if backup doesn't exist
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(fullPath, backupPath);
      }

      const result = await optimizeImage(fullPath, config);
      if (result) {
        totalOriginal += result.original;
        totalOptimized += result.optimized;
      }
    }
  }

  return { totalOriginal, totalOptimized };
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  // Process different directories with different configs
  const directories = [
    { path: path.join(publicDir, 'ferrari'), config: configs.product },
    { path: path.join(publicDir, 'redbull'), config: configs.product },
    { path: publicDir, config: configs.product } // Root level images
  ];

  let grandTotalOriginal = 0;
  let grandTotalOptimized = 0;

  for (const { path: dirPath, config } of directories) {
    if (fs.existsSync(dirPath)) {
      console.log(`📁 Processing ${path.relative(publicDir, dirPath) || 'root'}...`);
      const result = await processDirectory(dirPath, config);
      grandTotalOriginal += result.totalOriginal;
      grandTotalOptimized += result.totalOptimized;
      console.log('');
    }
  }

  const totalReduction = ((grandTotalOriginal - grandTotalOptimized) / grandTotalOriginal * 100).toFixed(1);
  console.log('🎉 Optimization complete!');
  console.log(`📊 Total: ${(grandTotalOriginal / 1024 / 1024).toFixed(2)}MB → ${(grandTotalOptimized / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💾 Saved: ${((grandTotalOriginal - grandTotalOptimized) / 1024 / 1024).toFixed(2)}MB (${totalReduction}% reduction)`);
  console.log('\n✨ Estimated bandwidth savings: ~80-90% reduction in data transfer!');
}

main().catch(console.error);