import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';

// The exact SSI red
const SSI_RED = '#e31b23';
const SSI_PATH = `m 206.3036,172.29436 c 0.4205,-1.11532 10.3534,-27.61035 22.073,-58.87785 11.7196,-31.267504 21.4018,-56.952564 21.5159,-57.077924 0.1142,-0.12535 6.7006,-0.19285 14.6364,-0.15 l 14.4288,0.0779 -22.106,58.950004 -22.1059,58.95 -14.6034,0.0779 -14.6034,0.0778 0.7646,-2.02784 z m -33.38996,-25.67359 c 2.45584,-1.21374 3.93128,-2.66225 5.07421,-4.98159 0.55843,-1.13321 0.67643,-1.87095 0.67643,-4.22898 0,-4.65163 -0.3111,-5.1207 -10.59185,-15.96993 -12.93269,-13.64782 -13.28928,-14.04994 -14.99254,-16.90714 -0.86936,-1.45833 -2.00928,-3.93741 -2.53317,-5.509064 -0.88902,-2.66704 -0.95244,-3.13758 -0.95121,-7.05756 0.001,-4.16955 0.3004,-5.73468 1.76297,-9.225 0.20794,-0.49624 -0.66509,-0.52488 -15.9371,-0.52273 -9.87486,10e-4 -16.9146,0.12516 -18.10529,0.31833 -5.01275,0.81327 -7.61756,3.36455 -7.58958,7.43362 0.025,3.63609 -0.18909,3.37693 22.88777,27.705884 25.71524,27.11049 25.7476,27.14312 28.18414,28.42252 2.9606,1.55459 4.0552,1.82057 7.10643,1.72685 2.47198,-0.0759 2.96286,-0.19405 5.00879,-1.20521 z M 94.2754,173.98593 c -7.58831,-1.02608 -14.49566,-4.1148 -21.40022,-9.56942 -2.32303,-1.8352 -15.2609,-15.09389 -15.2609,-15.63933 0,-0.40308 9.92086,-26.786 10.1687,-27.04199 0.12317,-0.12723 3.45435,3.17818 7.40262,7.34535 12.06942,12.73857 14.60907,15.28221 16.46622,16.49213 5.1984,3.3867 11.58689,3.07057 15.70015,-0.77691 3.83481,-3.58701 4.33149,-8.9496 1.26084,-13.61291 -0.6216,-0.94399 -5.58773,-6.39838 -11.03586,-12.12088 -5.44813,-5.72249 -10.30571,-10.98749 -10.79464,-11.7 -2.01746,-2.94003 -3.76256,-7.17912 -4.60882,-11.195464 -0.4891,-2.32129 -0.48915,-9.37839 -7e-5,-11.7 0.56056,-2.66096 1.80339,-6.35673 2.82478,-8.4 3.1544,-6.31033 8.70423,-11.75472 15.38585,-15.09353 4.26304,-2.13025 10.69642,-3.91051 16.39341,-4.53641 1.96571,-0.21597 22.42183,-0.32006 62.89634,-0.32006 l 59.9832,0 -5.1916,12.975 -5.1916,12.975 -21.1047,0.15917 c -23.19363,0.17493 -22.57806,0.12535 -25.44305,2.04949 -1.50895,1.01343 -2.91618,2.97675 -3.19362,4.45565 -0.31203,1.66322 0.0653,4.45469 0.81184,6.0064 0.44454,0.92395 2.38426,3.17933 5.48626,6.379074 4.9369,5.09244 12.9915,13.83832 14.98467,16.27072 1.7819,2.17455 3.7392,5.847 4.6792,8.7795 3.793,11.83305 -0.2826,25.40754 -10.76472,35.85341 -7.21598,7.19102 -15.28078,11.10718 -24.72736,12.00726 -11.84789,1.12888 -23.66869,-3.9095 -34.26125,-14.60316 l -3.62321,-3.65779 -1.91534,2.71372 c -5.50577,7.80075 -13.06076,12.83019 -22.48824,14.97066 -3.03461,0.68899 -10.19348,0.97416 -13.43888,0.53532 z`;

// 1. Badge 1: OFFICIAL PARTNER SSI DIVE CENTER
function createBadge1Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <path id="partner-arc-1" d="M 120,300 A 185,185 0 0,1 480,300" fill="none" />
    <filter id="shadow-1" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Outer White Contour + Main Black Disc -->
  <circle cx="300" cy="300" r="280" fill="#0c0e12" stroke="#ffffff" stroke-width="8" />

  <!-- Arched "OFFICIAL PARTNER" -->
  <text fill="#ffffff" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="36" letter-spacing="4">
    <textPath href="#partner-arc-1" startOffset="50%" text-anchor="middle">OFFICIAL PARTNER</textPath>
  </text>

  <!-- Red Ring & White Inner Disc for SSI Logo -->
  <circle cx="300" cy="275" r="160" fill="none" stroke="${SSI_RED}" stroke-width="12" />
  <circle cx="300" cy="275" r="150" fill="#ffffff" />

  <!-- Red SSI Logo Vector -->
  <g transform="translate(170, 202) scale(1.18)">
    <svg viewBox="57 56 222 119" width="222" height="119">
      <path d="${SSI_PATH}" fill="${SSI_RED}" />
    </svg>
  </g>

  <!-- Trademark (R) -->
  <circle cx="418" cy="326" r="8" fill="none" stroke="${SSI_RED}" stroke-width="1.8" />
  <text x="418" y="329.5" text-anchor="middle" fill="${SSI_RED}" font-family="sans-serif" font-size="9" font-weight="bold">R</text>

  <!-- Text: DIVE CENTER -->
  <!-- Black background contour for text legibility overlapping circle -->
  <g filter="url(#shadow-1)">
    <text x="300" y="475" text-anchor="middle" fill="#ffffff" stroke="#0c0e12" stroke-width="14" stroke-linejoin="round" paint-order="stroke fill" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="70" letter-spacing="2">DIVE</text>
    <text x="300" y="542" text-anchor="middle" fill="#ffffff" stroke="#0c0e12" stroke-width="14" stroke-linejoin="round" paint-order="stroke fill" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="70" letter-spacing="2">CENTER</text>
  </g>
</svg>`;
}

// 2. Badge 2: OFFICIAL PARTNER SSI CLASSIFIED DIVING CENTER
function createBadge2Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <path id="partner-arc-2" d="M 120,300 A 185,185 0 0,1 480,300" fill="none" />
    <filter id="shadow-2" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Outer White Contour + Main Black Disc -->
  <circle cx="300" cy="300" r="280" fill="#0c0e12" stroke="#ffffff" stroke-width="8" />

  <!-- Arched "OFFICIAL PARTNER" -->
  <text fill="#ffffff" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="36" letter-spacing="4">
    <textPath href="#partner-arc-2" startOffset="50%" text-anchor="middle">OFFICIAL PARTNER</textPath>
  </text>

  <!-- Red Ring & White Inner Disc for SSI Logo -->
  <circle cx="300" cy="275" r="160" fill="none" stroke="${SSI_RED}" stroke-width="12" />
  <circle cx="300" cy="275" r="150" fill="#ffffff" />

  <!-- Red SSI Logo Vector -->
  <g transform="translate(170, 202) scale(1.18)">
    <svg viewBox="57 56 222 119" width="222" height="119">
      <path d="${SSI_PATH}" fill="${SSI_RED}" />
    </svg>
  </g>

  <!-- Trademark (R) -->
  <circle cx="418" cy="326" r="8" fill="none" stroke="${SSI_RED}" stroke-width="1.8" />
  <text x="418" y="329.5" text-anchor="middle" fill="${SSI_RED}" font-family="sans-serif" font-size="9" font-weight="bold">R</text>

  <!-- Text: CLASSIFIED DIVING CENTER (3 lines) -->
  <g filter="url(#shadow-2)">
    <text x="300" y="442" text-anchor="middle" fill="#ffffff" stroke="#0c0e12" stroke-width="14" stroke-linejoin="round" paint-order="stroke fill" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="52" letter-spacing="1">CLASSIFIED</text>
    <text x="300" y="498" text-anchor="middle" fill="#ffffff" stroke="#0c0e12" stroke-width="14" stroke-linejoin="round" paint-order="stroke fill" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="56" letter-spacing="1.5">DIVING</text>
    <text x="300" y="556" text-anchor="middle" fill="#ffffff" stroke="#0c0e12" stroke-width="14" stroke-linejoin="round" paint-order="stroke fill" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="60" letter-spacing="2">CENTER</text>
  </g>
</svg>`;
}

// 3. Badge 3: OFFICIAL PARTNER SSI PRO INSTRUCTOR TRAINING CENTER
function createBadge3Svg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <path id="partner-arc-3" d="M 120,300 A 185,185 0 0,1 480,300" fill="none" />
    <filter id="shadow-3" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Outer White Contour + Main Black Disc -->
  <circle cx="300" cy="300" r="280" fill="#0c0e12" stroke="#ffffff" stroke-width="8" />

  <!-- Arched "OFFICIAL PARTNER" -->
  <text fill="#ffffff" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="36" letter-spacing="4">
    <textPath href="#partner-arc-3" startOffset="50%" text-anchor="middle">OFFICIAL PARTNER</textPath>
  </text>

  <!-- Red Ring with black inner fill -->
  <circle cx="300" cy="275" r="160" fill="none" stroke="${SSI_RED}" stroke-width="12" />

  <!-- Smaller Top Red SSI Logo inside badge -->
  <g transform="translate(232, 180) scale(0.62)">
    <svg viewBox="57 56 222 119" width="222" height="119">
      <path d="${SSI_PATH}" fill="${SSI_RED}" />
    </svg>
  </g>
  <!-- Trademark (R) -->
  <circle cx="363" cy="245" r="4.5" fill="none" stroke="${SSI_RED}" stroke-width="1" />
  <text x="363" y="247" text-anchor="middle" fill="${SSI_RED}" font-family="sans-serif" font-size="5.5" font-weight="bold">R</text>

  <!-- Massive PRO in center -->
  <g filter="url(#shadow-3)">
    <text x="300" y="340" text-anchor="middle" fill="#ffffff" font-family="'Impact', 'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="105" letter-spacing="4">PRO</text>
  </g>

  <!-- Text: INSTRUCTOR TRAINING CENTER (3 lines) -->
  <g filter="url(#shadow-3)">
    <text x="300" y="440" text-anchor="middle" fill="#ffffff" stroke="#0c0e12" stroke-width="14" stroke-linejoin="round" paint-order="stroke fill" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="47" letter-spacing="1">INSTRUCTOR</text>
    <text x="300" y="495" text-anchor="middle" fill="#ffffff" stroke="#0c0e12" stroke-width="14" stroke-linejoin="round" paint-order="stroke fill" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="52" letter-spacing="1.5">TRAINING</text>
    <text x="300" y="555" text-anchor="middle" fill="#ffffff" stroke="#0c0e12" stroke-width="14" stroke-linejoin="round" paint-order="stroke fill" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="62" letter-spacing="2">CENTER</text>
  </g>
</svg>`;
}

// 4. Logo Stack: Symmetrical Crossed Freedivers, "FREE DIVE", "DAHAB"
function createLogoStackSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <filter id="glow-logo" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <g id="freedivers-crossing">
    <!-- DIVER LEFT (Head/Arms pointing up-left, body curving down-right to cross at waist, fin spreading down-left) -->
    <!-- Head & Upstretched Arms -->
    <path d="M 336 172 C 330 162, 320 180, 328 220 C 332 238, 335 250, 342 270 C 347 285, 355 310, 370 345 C 385 380, 400 405, 405 420 C 395 445, 375 490, 330 550 C 290 600, 245 640, 210 680 C 205 686, 200 680, 205 670 C 235 620, 280 560, 335 490 C 370 445, 388 418, 388 402 C 388 390, 376 360, 360 325 C 345 290, 338 270, 332 245 C 325 210, 322 178, 336 172 Z"
      fill="#ffffff" />
    
    <!-- Diver Left Head & Face Profile -->
    <circle cx="340" cy="245" r="14" fill="#ffffff" />
    <path d="M 334 235 L 322 170 C 320 162, 326 160, 330 168 L 342 225 Z" fill="#ffffff" />

    <!-- DIVER RIGHT (Head/Arms pointing up-right, body curving down-left to cross at waist, fin spreading down-right) -->
    <!-- Head & Upstretched Arms -->
    <path d="M 464 172 C 470 162, 480 180, 472 220 C 468 238, 465 250, 458 270 C 453 285, 445 310, 430 345 C 415 380, 400 405, 395 420 C 405 445, 425 490, 470 550 C 510 600, 555 640, 590 680 C 595 686, 600 680, 595 670 C 565 620, 520 560, 465 490 C 430 445, 412 418, 412 402 C 412 390, 424 360, 440 325 C 455 290, 462 270, 468 245 C 475 210, 478 178, 464 172 Z"
      fill="#ffffff" />

    <!-- Diver Right Head & Face Profile -->
    <circle cx="460" cy="245" r="14" fill="#ffffff" />
    <path d="M 466 235 L 478 170 C 480 162, 474 160, 470 168 L 458 225 Z" fill="#ffffff" />

    <!-- Center X Crossing Highlight -->
    <circle cx="400" cy="400" r="6" fill="#ffffff" />
  </g>

  <!-- Typography: FREE DIVE -->
  <g id="typography">
    <!-- FREE on Left -->
    <text x="250" y="422" text-anchor="middle" fill="#ffffff" font-family="'Impact', 'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="96" letter-spacing="6">FREE</text>
    
    <!-- DIVE on Right -->
    <text x="550" y="422" text-anchor="middle" fill="#ffffff" font-family="'Impact', 'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="96" letter-spacing="6">DIVE</text>

    <!-- DAHAB Below -->
    <text x="400" y="628" text-anchor="middle" fill="#ffffff" font-family="'Impact', 'Arial Black', 'Montserrat', sans-serif" font-weight="900" font-size="76" letter-spacing="9">DAHAB</text>
  </g>
</svg>`;
}

// Generate files
const b1Svg = createBadge1Svg();
const b2Svg = createBadge2Svg();
const b3Svg = createBadge3Svg();
const logoSvg = createLogoStackSvg();

// Badge SVGs & PNGs are intentionally preserved as authentic original artwork from the user
// Do NOT overwrite public/badge-1t.png, badge-2t.png, or badge-3t.png
fs.writeFileSync('public/logo-stack.svg', logoSvg);

// Render to PNG
const renderPng = (svgStr, outPath) => {
  const resvg = new Resvg(svgStr, {
    fitTo: { mode: 'width', value: 800 }
  });
  const pngData = resvg.render();
  fs.writeFileSync(outPath, pngData.asPng());
  console.log(`Created ${outPath} (${pngData.asPng().length} bytes)`);
};

renderPng(logoSvg, 'public/logo-stack.png');

console.log('Logo created successfully. Authentic user badges preserved.');
