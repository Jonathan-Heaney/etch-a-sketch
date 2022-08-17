'use strict';
const container = document.querySelector('#container');
const boxes = document.querySelectorAll('.box');

let numSquares = 64;

function makeGrid(num) {
  container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const square = document.createElement('div');
      square.classList.add('box');
      container.append(square);
    }
  }
}

makeGrid(numSquares);

container.addEventListener('mouseover', changeColor);
container.addEventListener('mousedown', changeColor);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (e.target.classList.contains('box')) {
    e.target.style.backgroundColor = `${randomRGB()}`;
  }
}

function randomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let RGBColor = `rgb(${r},${g},${b})`;
  return RGBColor;
}
