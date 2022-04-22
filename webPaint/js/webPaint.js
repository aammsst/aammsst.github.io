"use strict";

const webPaint = document.getElementById('webPaint');
const dif = webPaint.getBoundingClientRect();
const ctxx = webPaint.getContext("2d");

let painting,color,linewidth,difX,difY;

// Mouse events {{{
webPaint.addEventListener("mousedown", e => {
    difX = e.clientX - dif.left;
    difY = e.clientY - dif.top;
    painting = true;
    color= document.getElementById("color").value;
    linewidth= document.getElementById("lw").value;
    ctxx.beginPath();
});

webPaint.addEventListener("mousemove", e=>{
    if (painting) {
	dibujar(difX, difY, e.clientX - dif.left, e.clientY - dif.top);
	difX = e.clientX - difX.left;
	difY = e.clientY - difY.top;
    }
});

webPaint.addEventListener("mouseup",()=>{
    ctxx.closePath();
    painting = false;
})
// }}}

// Touch events {{{

webPaint.addEventListener("touchstart", e => {
    e.preventDefault();
    difX = e.changedTouches[0].clientX - dif.left;
    difY = e.changedTouches[0].clientY - dif.top;
    painting = true;
    color = document.getElementById("color").value;
    linewidth = document.getElementById("lw").value;
    ctxx.beginPath();
})

webPaint.addEventListener("touchmove", e => {
    e.preventDefault();
    if (painting) {
	dibujar(difX, difY, e.changedTouches[0].clientX - dif.left, e.changedTouches[0].clientY - dif.top);
	difX = e.changedTouches[0].clientX - difX.left;
	difY = e.changedTouches[0].clientY - difY.top;
    }
})

webPaint.addEventListener("touchend", e => {
    e.preventDefault();
    ctxx.closePath();
    painting = false;
})

// }}}

// Draw {{{
const dibujar = (x1,y1,x2,y2) => {
    ctxx.strokeStyle = color;
    ctxx.lineWidth = linewidth;
    ctxx.moveTo(x1,y1);
    ctxx.lineTo(x2,y2);
    ctxx.stroke();
}
// }}}
