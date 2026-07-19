/**
 * One-off: optimise the handful of `assets/` originals the design actually uses into
 * `public/`. assets/ is 120MB and gitignored; only the output here gets committed.
 * Re-run after adding a row. Uses the sharp that ships inside next.
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = 'assets/images'
const OUT = 'public/img'

/** [source, output, width, height, options] — height null = keep aspect. */
const PHOTOS = [
  // Hero. Subject sits centre-left; bias the crop that way so the crop doesn't behead her.
  ['home-02-pelvis-adjustment.jpg', 'hero-adjustment', 1800, 1500, { position: 'centre' }],
  ['home-09-cheras-gonstead-chiropractic.jpg', 'clinic-reception', 1600, 1100, {}],
  ['home-19-visualisation.jpg', 'consultation-assessment', 1100, 1400, { position: 'top' }],
  ['home-hero.jpg', 'clinic-front-desk', 1400, 1000, {}],
  ['about-04-valerie.jpg', 'dr-valerie-na', 800, 1000, { position: 'top' }],
  ['about-05-kee-shan.jpg', 'dr-kee-shan-lim', 800, 1000, { position: 'top' }],
  ['about-06-rynn.jpg', 'dr-rynn-hoh', 800, 1000, { position: 'top' }],
  ['home-42-spike-higher-play-longer.jpg', 'post-spike-higher', 800, 600, {}],
  ['home-44-chiropractic-care-through-stages-woman-s.webp', 'post-womans-life', 800, 600, {}],
  ['home-46-house-chores-pain-back-here-s.png', 'post-house-chores', 800, 600, {}],
]

/** Logos keep transparency, so PNG out. Trimmed because the Wix originals are mostly padding. */
const LOGOS = [
  ['home-01-persistence-chiropractic-care-logo.png', 'logo-persistence', 480],
  ['home-04-association-chiropractic-malaysia-logo.png', 'accred-acm', 240],
  ['home-05-gonstead-chiropractic-society-australia-logo.png', 'accred-gonstead-australia', 240],
  ['home-06-accp-accred.webp', 'accred-accp', 240],
  ['home-07-best-services.png', 'accred-best-services-2023', 240],
]

await mkdir(OUT, { recursive: true })

const results = []

for (const [src, name, w, h, opts] of PHOTOS) {
  const file = `${OUT}/${name}.webp`
  const info = await sharp(`${SRC}/${src}`)
    .resize(w, h, { fit: 'cover', ...opts })
    .webp({ quality: 78 })
    .toFile(file)
  results.push(`${file}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`)
}

for (const [src, name, w] of LOGOS) {
  const file = `${OUT}/${name}.png`
  const info = await sharp(`${SRC}/${src}`)
    .trim() // Wix exports pad every logo with whitespace; without this they align badly.
    .resize(w, null, { fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(file)
  results.push(`${file}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`)
}

console.log(results.join('\n'))
