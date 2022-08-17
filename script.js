'use strict';
const container = document.querySelector('#container');
const boxes = document.querySelectorAll('.box');
const colorMode = document.querySelector('#color-mode');
const rainbowMode = document.querySelector('#rainbow-mode');
const colorPicker = document.querySelector('#color');
const eraser = document.querySelector('#eraser');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll('.btn');

let numSquares = 20;

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

let colorType = 'color';
let color = colorPicker.value;

function updateColor() {
  color = colorPicker.value;
}

colorPicker.addEventListener('input', updateColor, false);

colorMode.addEventListener('click', function (e) {
  colorType = 'color';
  e.target.style.backgroundColor = 'black';
  e.target.style.color = 'white';
  eraser.style.backgroundColor = 'white';
  eraser.style.color = 'black';
  rainbowMode.style.backgroundColor = 'white';
  rainbowMode.style.color = 'black';
});

rainbowMode.addEventListener('click', function (e) {
  colorType = 'rainbow';
  e.target.style.backgroundColor = 'black';
  e.target.style.color = 'white';
  eraser.style.backgroundColor = 'white';
  eraser.style.color = 'black';
  colorMode.style.backgroundColor = 'white';
  colorMode.style.color = 'black';
});

eraser.addEventListener('click', function (e) {
  colorType = 'eraser';
  e.target.style.backgroundColor = 'black';
  e.target.style.color = 'white';
  colorMode.style.backgroundColor = 'white';
  colorMode.style.color = 'black';
  rainbowMode.style.backgroundColor = 'white';
  rainbowMode.style.color = 'black';
});

clear.addEventListener('click', function () {
  container.style.backgroundColor = 'black';
});

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  if (e.target.classList.contains('box')) {
    if (colorType === 'rainbow') {
      e.target.style.backgroundColor = `${randomRGB()}`;
    } else if (colorType === 'color') {
      e.target.style.backgroundColor = color;
    } else if (colorType === 'eraser') {
      e.target.style.backgroundColor = 'white';
    }
  }
}

function randomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let RGBColor = `rgb(${r},${g},${b})`;
  return RGBColor;
}
