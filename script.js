const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const brushBtn = document.getElementById("brush");
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");
const filenameInput = document.getElementById("filename");
const downloadBtn = document.getElementById("download");
const canvasWidthInput = document.getElementById("canvasWidth");
const canvasHeightInput = document.getElementById("canvasHeight");
const resizeCanvasBtn = document.getElementById("resizeCanvas");

let painting = false;
let currentColor = "#000000";
let currentSize = 5;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = currentSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

colorPicker.addEventListener("input", () => {
    currentColor = colorPicker.value;
});

brushSize.addEventListener("input", () => {
    currentSize = brushSize.value;
});

eraserBtn.addEventListener("click", () => {
    ctx.globalCompositeOperation = "destination-out"; // Makes brush erase instead of draw
    ctx.lineWidth = currentSize;
});

brushBtn.addEventListener("click", () => {
    ctx.globalCompositeOperation = "source-over"; // Resets to normal drawing
    currentColor = colorPicker.value;
});

// Handle canvas resize
resizeCanvasBtn.addEventListener("click", () => {
    const newWidth = parseInt(canvasWidthInput.value);
    const newHeight = parseInt(canvasHeightInput.value);
    
    if (!isNaN(newWidth) && !isNaN(newHeight) && newWidth > 0 && newHeight > 0) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        // Redraw everything if needed (canvas will be cleared after resize)
    } else {
        alert("Please enter valid canvas dimensions.");
    }
});

clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Function to download the canvas as an image
downloadBtn.addEventListener("click", () => {
    const filename = filenameInput.value.trim() || "TaytoShop_Artwork"; // Default filename if empty
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
});
