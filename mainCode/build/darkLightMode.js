"use strict";
const button = document.getElementById("btn-dlm");
const body = document.body;
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const titles = document.querySelectorAll(".dark-titles");
const text = document.querySelectorAll(".dark-text");
const backG = document.querySelector(".darkBackG");
const menuBtn = document.querySelector(".darkMenu");
const htmlImg = document.querySelector(".htmlImgDark");
const cssImg = document.querySelector(".cssImgDark");
const jsImg = document.querySelector(".jsImgDark");
function setDarkImg() {
    if (htmlImg && cssImg && jsImg) {
        htmlImg.classList.replace("htmlImgLight", "htmlImgDark");
        cssImg.classList.replace("cssImgLight", "cssImgDark");
        jsImg.classList.replace("jsImgLight", "jsImgDark");
    }
}
function setLightImg() {
    if (htmlImg && cssImg && jsImg) {
        htmlImg.classList.replace("htmlImgDark", "htmlImgLight");
        cssImg.classList.replace("cssImgDark", "cssImgLight");
        jsImg.classList.replace("jsImgDark", "jsImgLight");
    }
}
function textAndTitlesDark() {
    for (let i = 0; i < text.length; i++) {
        text[i].classList.replace("light-text", "dark-text");
    }
    for (let i = 0; i < titles.length; i++) {
        titles[i].classList.replace("light-titles", "dark-titles");
    }
}
function textAndTitlesLight() {
    for (let i = 0; i < text.length; i++) {
        text[i].classList.replace("dark-text", "light-text");
    }
    for (let i = 0; i < titles.length; i++) {
        titles[i].classList.replace("dark-titles", "light-titles");
    }
}
if (button) {
    button.addEventListener('click', () => {
        if (body.classList.contains("lightMode")) {
            body.classList.replace("lightMode", "darkMode");
            setDarkImg();
            textAndTitlesDark();
            button.title = "Light Mode";
            if (menuBtn) {
                menuBtn.classList.replace("lightMenu", "darkMenu");
            }
            if (backG) {
                backG.classList.replace("lightBackG", "darkBackG");
            }
            if (sun) {
                sun.classList.remove("hide");
            }
            if (moon) {
                moon.classList.add("hide");
            }
        }
        else {
            body.classList.replace("darkMode", "lightMode");
            setLightImg();
            textAndTitlesLight();
            button.title = "Dark Mode";
            if (menuBtn) {
                menuBtn.classList.replace("darkMenu", "lightMenu");
            }
            if (backG) {
                backG.classList.replace("darkBackG", "lightBackG");
            }
            if (moon) {
                moon.classList.remove("hide");
            }
            if (sun) {
                sun.classList.add("hide");
            }
        }
    });
}
