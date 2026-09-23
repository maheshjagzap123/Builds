import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const width = 1200;
const height = 630;
const pixels = Buffer.alloc(width * height * 4);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const i = (y * width + x) * 4;
    const dx = x - 930;
    const dy = y - 100;
    const glow = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 620);
    pixels[i] = Math.round(5 + glow * 27);
    pixels[i + 1] = Math.round(6 + glow * 20);
    pixels[i + 2] = Math.round(13 + glow * 78);
    pixels[i + 3] = 255;
  }
}

function rect(x, y, w, h, color) {
  for (let py = Math.max(0, y); py < Math.min(height, y + h); py += 1) {
    for (let px = Math.max(0, x); px < Math.min(width, x + w); px += 1) {
      const i = (py * width + px) * 4;
      pixels[i] = color[0]; pixels[i + 1] = color[1]; pixels[i + 2] = color[2]; pixels[i + 3] = 255;
    }
  }
}

const font = {
  A:['01110','10001','10001','11111','10001','10001','10001'], B:['11110','10001','10001','11110','10001','10001','11110'],
  D:['11110','10001','10001','10001','10001','10001','11110'], E:['11111','10000','10000','11110','10000','10000','11111'],
  H:['10001','10001','10001','11111','10001','10001','10001'], I:['11111','00100','00100','00100','00100','00100','11111'],
  L:['10000','10000','10000','10000','10000','10000','11111'], M:['10001','11011','10101','10101','10001','10001','10001'],
  S:['01111','10000','10000','01110','00001','00001','11110'], U:['10001','10001','10001','10001','10001','10001','01110'],
  W:['10001','10001','10001','10101','10101','11011','10001'], T:['11111','00100','00100','00100','00100','00100','00100'],
  O:['01110','10001','10001','10001','10001','10001','01110'], F:['11111','10000','10000','11110','10000','10000','10000'],
  R:['11110','10001','10001','11110','10100','10010','10001'], P:['11110','10001','10001','11110','10000','10000','10000'],
  N:['10001','11001','10101','10011','10001','10001','10001'], V:['10001','10001','10001','10001','10001','01010','00100'],
  C:['01111','10000','10000','10000','10000','10000','01111'], G:['01110','10001','10000','10111','10001','10001','01110'],
  '&':['01100','10010','10100','01000','10101','10010','01101'], '.':['00000','00000','00000','00000','00000','00110','00110'],
};

function text(value, x, y, scale, color, spacing = 2) {
  let cursor = x;
  for (const char of value) {
    if (char === ' ') { cursor += scale * 4; continue; }
    const glyph = font[char];
    if (!glyph) { cursor += scale * 4; continue; }
    glyph.forEach((row, gy) => [...row].forEach((bit, gx) => { if (bit === '1') rect(cursor + gx * scale, y + gy * scale, scale, scale, color); }));
    cursor += scale * (5 + spacing);
  }
}

text('MAHESH BUILDS', 82, 225, 14, [236,235,245], 1);
text('WEBSITE & SOFTWARE DEVELOPMENT', 86, 120, 4, [138,125,255], 2);
text('INDIA. AVAILABLE WORLDWIDE.', 86, 430, 4, [255,213,131], 2);
rect(86, 510, 220, 4, [138,125,255]);

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let k = 0; k < 8; k += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4); length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

const raw = Buffer.alloc((width * 4 + 1) * height);
for (let y = 0; y < height; y += 1) {
  const row = y * (width * 4 + 1);
  raw[row] = 0;
  pixels.copy(raw, row + 1, y * width * 4, (y + 1) * width * 4);
}
const header = Buffer.alloc(13);
header.writeUInt32BE(width, 0); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
const png = Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', header), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
writeFileSync(resolve(root, 'public/assets/img/og-default.png'), png);
console.log(`[gen-og] wrote 1200x630 social card (${Math.round(png.length / 1024)} KB).`);
