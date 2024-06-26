'use strict';
const container = document.querySelector('#container');
const boxes = document.querySelectorAll('.box');
const colorMode = document.querySelector('#color-mode');
const rainbowMode = document.querySelector('#rainbow-mode');
const colorPicker = document.querySelector('#color');
const eraser = document.querySelector('#eraser');
const clear = document.querySelector('#clear');
const buttons = document.querySelectorAll('.btn');
const gridSize = document.querySelector('#gridSize');
const gridLines = document.querySelector('#grid-lines');
const lineToggle = document.querySelector('.line-toggle');

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

function deleteGrid(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function clearGrid() {
  deleteGrid(container);
  makeGrid(numSquares);
}

function updateGrid(num) {
  numSquares = num;
  deleteGrid(container);
  makeGrid(num);
}

container.addEventListener('mouseover', changeColor);
container.addEventListener('mousedown', changeColor);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// New touch event listeners
container.addEventListener('touchstart', changeColor, { passive: false });
container.addEventListener('touchmove', changeColor, { passive: false });
document.body.addEventListener('touchstart', () => (mouseDown = true), {
  passive: false,
});
document.body.addEventListener('touchend', () => (mouseDown = false), {
  passive: false,
});

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
  rainbowMode.style.backgroundImage = 'none';
  rainbowMode.style.color = 'black';
});

rainbowMode.addEventListener('click', function (e) {
  colorType = 'rainbow';
  e.target.style.backgroundImage =
    'linear-gradient(315deg, red,orange,green,blue,violet)';
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
  rainbowMode.style.backgroundImage = 'none';
  rainbowMode.style.color = 'black';
});

clear.addEventListener('click', clearGrid);

function updateLabel(size) {
  gridSize.innerText = `${size} x ${size}`;
}

function changeColor(e) {
  // Prevent default scrolling behavior on touch
  if (e.type.startsWith('touch')) e.preventDefault();

  // Adapt the event object for touch events
  let target = e.target;
  if (e.type.startsWith('touch')) {
    target = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    if (!target || !target.classList.contains('box')) return;
  } else {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (!e.target.classList.contains('box')) return;
  }

  // Existing color changing logic
  if (colorType === 'rainbow') {
    target.style.backgroundColor = `${randomRGB()}`;
  } else if (colorType === 'color') {
    target.style.backgroundColor = color;
  } else if (colorType === 'eraser') {
    target.style.backgroundColor = 'white';
  }
}

function randomRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let RGBColor = `rgb(${r},${g},${b})`;
  return RGBColor;
}

let lines = true;

const borderVariable = '--border';
const rainbowVariable = '--rainbow';

function toggleLines() {
  if (!lines) {
    document.documentElement.style.setProperty(
      borderVariable,
      '.5px solid black'
    );
    lineToggle.innerText = 'On';
  } else {
    document.documentElement.style.setProperty(borderVariable, 'none');
    lineToggle.innerText = 'Off';
  }
  lines = !lines;
}

gridLines.addEventListener('click', toggleLines);
