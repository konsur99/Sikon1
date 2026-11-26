const fs = require('fs');
const path = require('path');

// 1. Generate beaded ring
const beads = [];
for (let i = 0; i < 36; i++) {
  const angle = (i * 10) * Math.PI / 180;
  const cx = (256 + 138 * Math.cos(angle)).toFixed(1);
  const cy = (320 + 138 * Math.sin(angle)).toFixed(1);
  beads.push(`<circle cx="${cx}" cy="${cy}" r="3.2"/>`);
}

// 2. Generate radial rays
const rays = [];
for (let i = 0; i < 24; i++) {
  const angle = (i * 15) * Math.PI / 180;
  const x1 = (256 + 25 * Math.cos(angle)).toFixed(1);
  const y1 = (320 + 25 * Math.sin(angle)).toFixed(1);
  const x2 = (256 + 120 * Math.cos(angle)).toFixed(1);
  const y2 = (320 + 120 * Math.sin(angle)).toFixed(1);
  rays.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Ribbon Gradients -->
    <linearGradient id="ribbonRedLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b91c1c"/>
      <stop offset="45%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <linearGradient id="ribbonRedRight" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#b91c1c"/>
      <stop offset="45%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </linearGradient>
    <linearGradient id="ribbonWhite" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f1f5f9"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>

    <!-- Gold Gradients -->
    <linearGradient id="goldClasp" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="30%" stop-color="#fbbf24"/>
      <stop offset="70%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
    <radialGradient id="goldOuterRim" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="25%" stop-color="#fef08a"/>
      <stop offset="55%" stop-color="#f59e0b"/>
      <stop offset="85%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#78350f"/>
    </radialGradient>
    <linearGradient id="goldBevel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef9c3"/>
      <stop offset="40%" stop-color="#d97706"/>
      <stop offset="70%" stop-color="#fffbeb"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
    <radialGradient id="goldInnerPlate" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="40%" stop-color="#f59e0b"/>
      <stop offset="80%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#92400e"/>
    </radialGradient>
    <linearGradient id="embossGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
    <linearGradient id="laurelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="40%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>

    <!-- Glow & Shadow Filters -->
    <filter id="dropShadowMedal" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
    <filter id="sparkleGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- 1. RIBBONS (Merah Putih Solo Athletic Ribbons) -->
  <g filter="url(#dropShadowMedal)">
    <!-- Left Ribbon Leg (Red) -->
    <polygon points="190,16 110,210 160,210 230,60" fill="url(#ribbonRedLeft)" />
    <!-- Left Ribbon White Center Stripe -->
    <polygon points="195,16 150,210 175,210 215,60" fill="url(#ribbonWhite)" />

    <!-- Right Ribbon Leg (Red) -->
    <polygon points="322,16 402,210 352,210 282,60" fill="url(#ribbonRedRight)" />
    <!-- Right Ribbon White Center Stripe -->
    <polygon points="317,16 362,210 337,210 297,60" fill="url(#ribbonWhite)" />
  </g>

  <!-- 2. MEDAL HANGER / CLASP -->
  <g filter="url(#dropShadowMedal)">
    <rect x="226" y="160" width="60" height="30" rx="8" fill="url(#goldClasp)" stroke="#78350f" stroke-width="3"/>
    <rect x="234" y="166" width="44" height="10" rx="4" fill="#78350f" opacity="0.4"/>
    <circle cx="256" cy="186" r="14" fill="url(#goldClasp)" stroke="#78350f" stroke-width="3"/>
  </g>

  <!-- 3. MAIN MEDAL BODY (Circular Gold Medallion) -->
  <g filter="url(#dropShadowMedal)">
    <!-- Outer Rim Base -->
    <circle cx="256" cy="320" r="160" fill="url(#goldOuterRim)" stroke="#78350f" stroke-width="4"/>
    <!-- Beveled Edge -->
    <circle cx="256" cy="320" r="150" fill="url(#goldBevel)" stroke="#fde047" stroke-width="2"/>
    <circle cx="256" cy="320" r="144" fill="url(#goldOuterRim)" />

    <!-- Beaded Ring (decorative gold spheres) -->
    <g fill="url(#goldBevel)" stroke="#78350f" stroke-width="0.75">
      ${beads.join('\n      ')}
    </g>

    <!-- Inner Core Plate -->
    <circle cx="256" cy="320" r="128" fill="url(#goldInnerPlate)" stroke="#92400e" stroke-width="3" />

    <!-- Subtle Radial Rays Texture inside plate -->
    <g stroke="#fbbf24" stroke-width="1" opacity="0.35">
      ${rays.join('\n      ')}
    </g>

    <!-- Center Ring -->
    <circle cx="256" cy="320" r="96" fill="none" stroke="#fde047" stroke-width="2" stroke-dasharray="4,3" opacity="0.7" />

    <!-- Laurel Wreath (Embossed Victory Branches) -->
    <g fill="url(#laurelGrad)" stroke="#92400e" stroke-width="1">
      <!-- Left Branch -->
      <path d="M205,385 C190,360 180,315 190,265 C192,255 196,245 202,235" fill="none" stroke="#92400e" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Left Leaves -->
      <path d="M192,260 C175,255 170,240 182,235 C190,245 195,255 192,260 Z"/>
      <path d="M185,285 C168,285 162,270 176,262 C182,272 188,280 185,285 Z"/>
      <path d="M183,315 C165,318 160,303 173,294 C180,303 186,310 183,315 Z"/>
      <path d="M188,345 C172,352 165,338 178,328 C185,335 190,342 188,345 Z"/>
      <path d="M202,370 C188,380 180,367 192,356 C198,362 202,367 202,370 Z"/>

      <!-- Right Branch -->
      <path d="M307,385 C322,360 332,315 322,265 C320,255 316,245 310,235" fill="none" stroke="#92400e" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Right Leaves -->
      <path d="M320,260 C337,255 342,240 330,235 C322,245 317,255 320,260 Z"/>
      <path d="M327,285 C344,285 350,270 336,262 C330,272 324,280 327,285 Z"/>
      <path d="M329,315 C347,318 352,303 339,294 C332,303 326,310 329,315 Z"/>
      <path d="M324,345 C340,352 347,338 334,328 C327,335 322,342 324,345 Z"/>
      <path d="M310,370 C324,380 332,367 320,356 C314,362 310,367 310,370 Z"/>

      <!-- Bottom Laurel Ribbon Tie -->
      <path d="M256,396 C245,396 238,390 236,382 C246,384 256,388 256,388 C256,388 266,384 276,382 C274,390 267,396 256,396 Z" fill="url(#goldClasp)" stroke="#78350f" stroke-width="2"/>
      <circle cx="256" cy="386" r="6" fill="#fef08a" stroke="#78350f" stroke-width="1.5"/>
    </g>

    <!-- Centerpiece Top Text: 'PORPROV 2026' -->
    <text x="256" y="258" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="12" fill="#78350f" text-anchor="middle" letter-spacing="3">
      PORPROV 2026
    </text>

    <!-- 4. CENTERPIECE: BOLD '1' CHAMPION EMBLEM -->
    <!-- Number 1 Drop Shadow -->
    <text x="258" y="342" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="92" fill="#78350f" text-anchor="middle">
      1
    </text>
    <!-- Number 1 Main Gold Body -->
    <text x="256" y="339" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="92" fill="url(#embossGold)" text-anchor="middle" stroke="#78350f" stroke-width="2.5">
      1
    </text>

    <!-- Centerpiece Bottom Text: 'SURAKARTA JUARA' -->
    <text x="256" y="372" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="900" font-size="11.5" fill="#78350f" text-anchor="middle" letter-spacing="2">
      SURAKARTA JUARA
    </text>

    <!-- 5. DIAGONAL GLASS HIGHLIGHT SPECULAR SWEEP -->
    <path d="M170,230 C220,200 290,210 340,250 C310,240 240,235 180,270 Z" fill="#ffffff" opacity="0.55" />
    <ellipse cx="220" cy="245" rx="35" ry="12" transform="rotate(-30 220 245)" fill="#ffffff" opacity="0.4" />
  </g>

  <!-- 6. CELEBRATORY SPARKLES -->
  <g filter="url(#sparkleGlow)" fill="#ffffff">
    <!-- Top-left sparkle -->
    <path d="M118,220 Q128,220 128,210 Q128,220 138,220 Q128,220 128,230 Q128,220 118,220 Z" opacity="0.9"/>
    <circle cx="128" cy="220" r="2" fill="#fef08a"/>
    <!-- Top-right sparkle -->
    <path d="M375,210 Q387,210 387,198 Q387,210 399,210 Q387,210 387,222 Q387,210 375,210 Z" opacity="0.95"/>
    <circle cx="387" cy="210" r="2.5" fill="#fef08a"/>
    <!-- Bottom-right sparkle -->
    <path d="M380,410 Q390,410 390,400 Q390,410 400,410 Q390,410 390,420 Q390,410 380,410 Z" opacity="0.85"/>
    <!-- Bottom-left sparkle -->
    <path d="M120,400 Q130,400 130,390 Q130,400 140,400 Q130,400 130,410 Q130,400 120,400 Z" opacity="0.8"/>
  </g>
</svg>`;

const outputPath = path.resolve('apps/web/public/images/gold_medal.svg');
fs.writeFileSync(outputPath, svg.trim());
console.log('Successfully generated gold_medal.svg at:', outputPath);
