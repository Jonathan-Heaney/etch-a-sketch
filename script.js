'use strict';
const container = document.querySelector('#container');

let numSquares = 16;

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

const boxes = document.querySelectorAll('.box');

container.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('box')) {
    e.target.style.backgroundColor = 'red';
  }
});

function randomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let RGBColor = `rgb(${r},${g},${b})`;
}
