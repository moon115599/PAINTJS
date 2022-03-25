const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const colors = document.querySelectorAll(".controls__color");
const range = document.querySelector(".controls__range input");
const mode = document.querySelector(".controls__mode");
const save = document.querySelector(".controls__save");

const INITIAL_COLOR = "black";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 540, 540);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  range.style.background = color;
}

function handleRangeChange(event) {
  const value = event.target.value;
  ctx.lineWidth = value;
}

function handleModeClick() {
  if (!filling) {
    mode.innerText = "PAINT";
    filling = true;
  } else {
    mode.innerText = "FILL";
    filling = false;
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 540, 540);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
