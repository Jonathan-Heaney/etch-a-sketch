function makeGrid(num) {
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      container.append(square);
    }
  }
}

makeGrid(20);
