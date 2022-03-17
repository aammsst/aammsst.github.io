"use strict";

const mobile = matchMedia("(max-width: 560px)");
const codeSvg = document.getElementById("codeSvg");
const langSvgs = document.querySelectorAll(".langSvg");
const projectSvgs = document.querySelectorAll(".projectSvg");
const contactBox = document.querySelector(".contact-box");
const webText = document.querySelectorAll(".web-text");
const webTitles = document.querySelectorAll(".web-titles");
const contactSvg = document.querySelectorAll(".contact-web-svg");

function svgSmaller() {
    for(let i = 0; i < langSvgs.length; i++) {
	langSvgs[i].classList.replace("webSvg","mobileSvg")
    };

    for(let i = 0; i < projectSvgs.length; i++) {
	projectSvgs[i].classList.replace("webSvg","mobileSvg")
    };
};

function svgBigger() {
    for(let i = 0; i < langSvgs.length; i++) {
	langSvgs[i].classList.replace("mobileSvg","webSvg")
    };

    for(let i = 0; i < projectSvgs.length; i++) {
	projectSvgs[i].classList.replace("mobileSvg","webSvg")
    };

};

function textTitlesSmaller() {
    for(let i = 0; i < webText.length; i++) {
	webText[i].classList.replace("web-text","mobile-text")
    };

    for(let i = 0; i < webTitles.length; i++) {
	webTitles[i].classList.replace("web-titles","mobile-titles")
    };
};

function textTitlesBigger() {
    for(let i = 0; i < webText.length; i++) {
	webText[i].classList.replace("mobile-text","web-text")
    };

    for(let i = 0; i < webTitles.length; i++) {
	webTitles[i].classList.replace("mobile-titles","web-titles")
    };
};

function contactSmaller() {
    for(let i = 0; i < contactSvg.length; i++) {
	contactSvg[i].classList.replace("contact-web-svg","contact-mobile-svg")
    };
};

function contactBigger() {
    for(let i = 0; i < contactSvg.length; i++) {
	contactSvg[i].classList.replace("contact-mobile-svg","contact-web-svg")
    };
};

// detecting touch screen with max touch point
document.addEventListener('DOMContentLoaded',()=>{
    (mobile.matches || navigator.maxTouchPoints == 1) ? (
	svgSmaller(),
	textTitlesSmaller(),
	contactSmaller()
    ) 
	: null

})

mobile.addEventListener("change",()=>{
    (mobile.matches || navigator.maxTouchPoints == 1) ? (
	svgSmaller(),
	textTitlesSmaller(),
	contactSmaller()
    ) 
	: (
	    svgBigger(),
	    textTitlesBigger(),
	    contactBigger()
	)

})
