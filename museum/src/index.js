// import image from './images/lazy.png';

// const createImage = (src) => new Promise((res, rej) => {
//   const img = new Image();
//   img.onload = () => res(img);
//   img.onerror = rej;
//   img.src = src;
// });

// async function render() {
//   const subHeader = document.createElement('h2');
//   subHeader.innerHTML = 'This elements was created by js';
//   const myImage = await createImage(image);
//   document.body.appendChild(subHeader);
//   document.body.appendChild(myImage);
// }

// render();
import './sass/style.scss'

// [['header',1,1], ['main',1,1], ['footer',1,1], ['section',7,Infinity], ['h1',1,1], ['h2',7,Infinity], ['h3',6,Infinity], ['nav',2,Infinity], ['ul', 3,Infinity], ['ul > li > a', 16,Infinity], ['button', 13,Infinity], ['input[type="radio"]', 3,Infinity], ['input[type="number"]', 2,Infinity], ['input[type="range"]', 2,Infinity]].map(x => [...x, [...document.querySelectorAll(x[0])].length]).map(x => x[3] >= x[1] && x[3] <= x[2] ? `✔ ${x[0]} (${x[3]})` : `✘ ${x[0]} (expected - ${x[1]}, actual - ${x[3]})`).forEach(x => console.log(x)), alts = [...document.querySelectorAll('img')].map(el => el.getAttribute('alt')).reduce((a, v) => [a[0] + 1, v !== undefined ? a[1] : a[1] + 1], [0, 0]), console.log(alts[1] > 0 ? `✘ ${alts[1]} of ${alts[0]} images haven't "alt" attribute` : `✔ All images have "alt" attribute`);

import createGallery from './js/gallery'
import changeValue from './js/video'
