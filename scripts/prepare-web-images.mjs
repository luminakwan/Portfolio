import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'public', 'thumbnails');
await mkdir(output, { recursive: true });
const carousel = {};
let originalBytes = 0;
let thumbnailBytes = 0;
for (const folder of await readdir(path.join(root, '首页轮播图片'))) {
  const directory = path.join(root, '首页轮播图片', folder);
  for (const name of await readdir(directory)) {
    if (!/\.(png|jpe?g|webp|avif|gif)$/i.test(name)) continue;
    const source = await readFile(path.join(directory, name));
    const thumbnail = await sharp(source).rotate().resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toBuffer({ resolveWithObject: true });
    const placeholder = await sharp(source).rotate().resize(24, 16, { fit: 'cover' }).webp({ quality: 25 }).toBuffer();
    const hash = createHash('sha256').update(thumbnail.data).digest('hex').slice(0, 16);
    const filename = `${hash}.webp`;
    await writeFile(path.join(output, filename), thumbnail.data);
    carousel[`../首页轮播图片/${folder}/${name}`] = { src: `thumbnails/${filename}`, placeholder: `data:image/webp;base64,${placeholder.toString('base64')}`, width: thumbnail.info.width, height: thumbnail.info.height };
    originalBytes += source.length;
    thumbnailBytes += thumbnail.data.length;
  }
}
const dimensions = {};
for (const name of await readdir(path.join(root, 'public', 'assets'))) {
  if (!name.endsWith('.webp')) continue;
  const { width, height } = await sharp(path.join(root, 'public', 'assets', name)).metadata();
  dimensions[`assets/${name}`] = { width, height };
}
await sharp(path.join(root, 'public', 'portrait-hero-cutout.png')).resize({ width: 1000, withoutEnlargement: true }).webp({ quality: 85 }).toFile(path.join(output, 'portrait.webp'));
await writeFile(path.join(root, 'src', 'web-images.json'), JSON.stringify({ carousel, dimensions }, null, 2) + '\n');
console.log(`Carousel: ${Object.keys(carousel).length} images, ${(originalBytes / 1e6).toFixed(2)} MB -> ${(thumbnailBytes / 1e6).toFixed(2)} MB`);
