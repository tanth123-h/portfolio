// Original integer-grid artwork, not emoji or borrowed sprites.
const colors = {
  ink: "#202c40",
  paper: "#f8f5ed",
  blue: "#3359d9",
  mint: "#b5dbbd",
  coral: "#f27965",
};
const shapes = {
  projects: [
    ["ink", 3, 8, 26, 21],
    ["coral", 5, 5, 10, 5],
    ["paper", 5, 10, 22, 16],
    ["blue", 8, 14, 16, 2],
    ["blue", 8, 19, 10, 2],
  ],
  achievements: [
    ["ink", 9, 3, 14, 15],
    ["coral", 11, 5, 10, 11],
    ["ink", 4, 5, 5, 9],
    ["ink", 23, 5, 5, 9],
    ["ink", 14, 18, 4, 7],
    ["ink", 9, 25, 14, 4],
    ["paper", 14, 7, 4, 4],
  ],
  memories: [
    ["ink", 2, 7, 28, 21],
    ["paper", 4, 9, 24, 17],
    ["coral", 5, 10, 7, 5],
    ["mint", 7, 19, 18, 5],
    ["blue", 13, 14, 9, 8],
    ["ink", 5, 4, 9, 3],
  ],
  about: [
    ["ink", 6, 2, 20, 28],
    ["paper", 8, 4, 16, 24],
    ["coral", 12, 7, 8, 7],
    ["blue", 10, 17, 12, 2],
    ["blue", 10, 22, 9, 2],
  ],
  research: [
    ["ink", 11, 2, 10, 3],
    ["ink", 12, 5, 8, 11],
    ["ink", 7, 16, 18, 3],
    ["ink", 4, 19, 24, 10],
    ["paper", 14, 5, 4, 11],
    ["mint", 7, 21, 18, 5],
    ["coral", 17, 22, 3, 3],
  ],
  contact: [
    ["ink", 2, 7, 28, 21],
    ["paper", 4, 9, 24, 17],
    ["blue", 5, 10, 4, 3],
    ["blue", 9, 13, 4, 3],
    ["blue", 13, 16, 6, 3],
    ["blue", 19, 13, 4, 3],
    ["blue", 23, 10, 4, 3],
  ],
  settings: [
    ["ink", 12, 2, 8, 28],
    ["ink", 2, 12, 28, 8],
    ["ink", 6, 6, 20, 20],
    ["paper", 10, 10, 12, 12],
    ["blue", 13, 13, 6, 6],
  ],
};
export function sprite(name) {
  return (
    '<svg class="pixel-icon" viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">' +
    (shapes[name] || shapes.projects)
      .map(
        ([c, x, y, w, h]) =>
          `<rect fill="${colors[c]}" x="${x}" y="${y}" width="${w}" height="${h}"/>`,
      )
      .join("") +
    "</svg>"
  );
}
export function scene(theme = "sky") {
  if (theme === "mint")
    return `<svg class="pixel-scene" xmlns="http://www.w3.org/2000/svg" width="720" height="520" viewBox="0 0 180 130" shape-rendering="crispEdges" aria-hidden="true">
  <g class="pixel-clouds" fill="#f8f5ed"><path d="M12 22h8v-6h19v6h10v7H12zM132 17h7v-6h15v6h12v7h-34z"/></g>
  <path fill="#202c40" d="M18 91h145v11h-10v10h-14v9H42v-9H29v-10H18z"/><path fill="#b5dbbd" d="M22 85h137v14H22z"/><path fill="#679875" d="M32 102h118v8h-14v7H47v-7H32z"/>
  <path fill="#202c40" d="M45 44h12v-8h12v-8h38v8h12v8h12v45H45z"/><path fill="#f8f5ed" d="M49 49h12v-9h12v-8h30v8h12v9h12v36H49z"/><path fill="#7bb4a1" d="M53 54h70v27H53zM73 36h28v11H73z"/><path fill="#202c40" d="M85 32h5v53h-5zM49 50h78v4H49zM68 54h4v31h-4zM105 54h4v31h-4z"/>
  <path fill="#3359d9" d="M56 72h9v12h-9zM95 72h9v12h-9zM115 70h8v14h-8z"/><g class="garden-leaves"><path fill="#b5dbbd" d="M58 59h5v13h-5zM96 58h5v14h-5zM116 59h5v11h-5zM53 57h8v5h-8zM62 53h8v5h-8zM91 56h8v5h-8zM101 51h8v5h-8zM111 56h8v5h-8z"/></g>
  <path fill="#202c40" d="M24 67h15v22H24zM137 58h18v30h-18z"/><path fill="#f27965" d="M27 70h9v15h-9zM140 61h12v16h-12z"/><path fill="#f8f5ed" d="M141 63h10v4h-10z"/><g class="signal" fill="#3359d9"><path d="M143 48h5v7h-5zM137 41h4v5h-4zM150 41h4v5h-4z"/></g>
  <path fill="#f8f5ed" d="M27 118h5v5h-5zM151 119h5v5h-5z"/></svg>`;
  if (theme === "dusk")
    return `<svg class="pixel-scene" xmlns="http://www.w3.org/2000/svg" width="720" height="520" viewBox="0 0 180 130" shape-rendering="crispEdges" aria-hidden="true">
  <g class="pixel-clouds pixel-stars" fill="#f8f5ed"><path class="star-spark" d="M24 20h4v4h-4z"/><path class="star-spark" d="M47 9h4v4h-4z"/><path class="star-spark" d="M145 36h4v4h-4z"/><path class="star-spark" d="M161 14h4v4h-4z"/><path class="star-spark" d="M18 59h4v4h-4z"/><path class="star-spark" d="M108 9h4v4h-4z"/></g><path fill="#f8f5ed" d="M131 10h14v4h-7v13h7v5h-14v-5h-5V15h5z"/>
  <path fill="#202c40" d="M21 89h139v11h-13v10h-13v10H46v-10H33v-10H21z"/><path fill="#9c96cb" d="M25 84h131v14H25z"/><path fill="#3359d9" d="M37 102h108v7h-15v8H51v-8H37z"/>
  <path fill="#202c40" d="M58 60h64v29H58zM65 48h51v12H65zM75 40h31v8H75z"/><path fill="#f8f5ed" d="M62 64h56v21H62zM69 52h43v8H69zM79 44h23v8H79z"/><path fill="#3359d9" d="M77 69h23v16H77z"/>
  <g class="telescope"><path fill="#202c40" d="M92 37h5v16h-5zM85 53h20v4H85z"/><g class="telescope-head"><path fill="#202c40" d="M80 24h40v13H80zM110 19h16v22h-16z"/><path fill="#f27965" d="M83 27h30v7H83z"/><path fill="#bcd9f4" d="M115 23h7v14h-7z"/></g></g>
  <path fill="#202c40" d="M32 63h17v21H32zM135 67h15v18h-15z"/><path fill="#3359d9" d="M35 66h11v13H35z"/><path fill="#b5dbbd" d="M138 70h9v11h-9z"/><g class="signal" fill="#f8f5ed"><path d="M39 50h4v7h-4zM32 45h4v4h-4zM46 45h4v4h-4z"/></g></svg>`;
  return `<svg class="pixel-scene" viewBox="0 0 180 130" shape-rendering="crispEdges" aria-hidden="true">
 <g class="pixel-clouds" fill="#f8f5ed"><path d="M8 30h5v-5h20v5h10v8H8zM119 13h8V7h20v6h13v9h-41z"/></g>
 <path fill="#202c40" d="M22 89h136v9h-9v11h-12v9H48v-9H31v-11h-9z"/><path fill="#b5dbbd" d="M25 84h130v12H25z"/><path fill="#3359d9" d="M33 98h114v8h-12v8H50v-8H33z"/>
 <path fill="#202c40" d="M38 74h100v6H38zM42 80h6v15h-6zM126 80h6v15h-6zM54 34h62v40H54z"/><path fill="#f8f5ed" d="M57 37h56v31H57z"/><path fill="#3359d9" d="M60 40h50v25H60z"/>
 <g class="screen-code"><path fill="#b5dbbd" d="M70 46h7v4h-7zM65 50h7v8h-7zM70 58h7v4h-7zM92 46h7v4h-7zM99 50h7v8h-7zM92 58h7v4h-7zM84 44h4v20h-4z"/></g>
 <path fill="#202c40" d="M81 74v-6h10v6zM62 79h50v5H62zM123 55h19v19h-19z"/><path fill="#f27965" d="M126 58h13v13h-13z"/>
 <path fill="#202c40" d="M30 63h17v18H30z"/><path fill="#f27965" d="M33 66h11v12H33z"/><path fill="#b5dbbd" d="M36 58h5v8h-5zM29 53h9v6h-9zM39 48h10v7H39z"/>
 <g class="signal" fill="#3359d9"><path d="M131 32h4v18h-4zM124 26h4v8h-4zM138 26h4v8h-4zM120 20h4v5h-4zM142 20h4v5h-4z"/></g>
 <path fill="#f8f5ed" d="M60 122h6v4h-6zM114 118h5v5h-5zM161 68h5v5h-5z"/></svg>`;
}
export function water(theme = "sky") {
  const color =
    { sky: "#73b8da", mint: "#6fbfba", dusk: "#8d8bc9" }[theme] || "#73b8da";
  return `<svg class="pixel-water" xmlns="http://www.w3.org/2000/svg" width="720" height="180" viewBox="0 0 180 45" shape-rendering="crispEdges" aria-hidden="true">
  <path fill="${color}" opacity=".55" d="M22 9h130v5h15v17h-15v6H30v-6H13V17h9z"/>
  <g class="water-current" fill="#f8f5ed" opacity=".75">${[0, 180].map((x) => `<g transform="translate(${x} 0)"><path d="M28 18h22v2H28zM82 12h30v2H82zM121 27h26v2h-26zM54 32h35v2H54z"/></g>`).join("")}</g>
  <g class="water-ripple" fill="${color}">${[0, 180].map((x) => `<g transform="translate(${x} 0)"><path d="M10 39h28v2H10zM65 41h39v2H65zM140 36h26v2h-26z"/></g>`).join("")}</g>
  <path fill="#f8f5ed" opacity=".6" d="M36 24h10v2H36zM101 32h8v2h-8z"/></svg>`;
}
export function mascot() {
  return `<svg class="buddy-svg" xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 48 48" shape-rendering="crispEdges" aria-hidden="true">
  <path fill="#202c40" d="M22 3h4v7h-4zM10 10h28v24H10zM8 15h4v12H8zM36 15h4v12h-4zM14 34h20v7H14z"/><path class="buddy-foot-left" fill="#202c40" d="M12 41h10v4H12z"/><path class="buddy-foot-right" fill="#202c40" d="M26 41h10v4H26z"/><path fill="#f27965" d="M20 2h8v4h-8z"/><path fill="#f8f5ed" d="M13 13h22v17H13z"/><path fill="#3359d9" d="M16 16h16v11H16z"/><g class="buddy-gaze"><g class="buddy-eyes" fill="#b5dbbd"><path d="M18 19h4v4h-4zM26 19h4v4h-4z"/></g></g><path fill="#b5dbbd" d="M17 35h14v4H17z"/><path fill="#202c40" d="M6 28h5v10H6z"/><g class="buddy-arm"><path fill="#202c40" d="M37 28h5v10h-5zM40 23h5v6h-5z"/><path fill="#f27965" d="M41 24h3v3h-3z"/></g></svg>`;
}
export function buddyMessage(index, language = "en") {
  const messages = [
    ["Hi, I’m Bit. Click me!", "สวัสดี ผม Bit ลองคลิกผมสิ!"],
    [
      "Projects has the builds. Open a file!",
      "เปิด Projects เพื่อสำรวจโครงงานได้เลย",
    ],
    [
      "Try Mint or Dusk. New scene, same desk.",
      "ลอง Mint หรือ Dusk เปลี่ยนฉากได้ด้วยนะ",
    ],
    [
      "Memories has the people behind the projects.",
      "Memories มีภาพทีมงานเบื้องหลังโครงงาน",
    ],
  ];
  return messages[
    ((index % messages.length) + messages.length) % messages.length
  ][language === "th" ? 1 : 0];
}
export function buddyProp(theme = "sky") {
  const art = {
    sky: '<path fill="#202c40" d="M3 6h22v17H3zM12 23h4v5H8v3h13v-3h-5v-5z"/><path fill="#bcd9f4" d="M6 9h16v11H6z"/><path fill="#3359d9" d="M9 12h10v2H9zM9 16h6v2H9z"/>',
    mint: '<path fill="#202c40" d="M8 9h13v17H8zM18 15h9v4h-9zM2 12h7v3H5v6h4v3H2z"/><path fill="#b5dbbd" d="M11 12h7v11h-7z"/><g class="watering-drops" fill="#3359d9"><path d="M25 23h3v4h-3zM29 28h3v4h-3z"/></g><path fill="#679875" d="M28 29h2v5h-2zM25 28h4v2h-4zM30 26h4v3h-4z"/><path fill="#f27965" d="M26 33h7v3h-7z"/>',
    dusk: '<path fill="#202c40" d="M2 14h22v7H2zM12 21h3v9h-3zM8 30h11v3H8zM21 11h7v13h-7z"/><path fill="#9c96cb" d="M5 16h16v3H5z"/><path fill="#bcd9f4" d="M24 14h2v7h-2z"/><path fill="#f8f5ed" d="M14 2h3v3h3v3h-3v3h-3V8h-3V5h3z"/>',
  };
  return `<svg class="buddy-prop" data-theme="${theme}" viewBox="0 0 36 36" aria-hidden="true" shape-rendering="crispEdges">${art[theme] || art.sky}</svg>`;
}
export function rareDetail(theme = "sky") {
  const art = {
    sky: '<path fill="#f8f5ed" d="M5 15h6v-4h10v4h7v5H5z"/>',
    mint: '<path fill="#679875" d="M70 15h6v3h4v5h-7v-3h-3z"/>',
    dusk: '<path fill="#f8f5ed" d="M36 10h4v4h-4z"/><path fill="#f8f5ed" opacity=".45" d="M23 7h13v2H23zM18 4h9v2h-9z"/>',
  };
  return `<g class="rare-detail rare-${theme}" aria-hidden="true">${art[theme] || art.sky}</g>`;
}
