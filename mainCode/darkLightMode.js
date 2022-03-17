"use strict";

const button = document.getElementById("btn-dlm");
const body = document.body;
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const titles = document.querySelectorAll(".dark-titles");
const text = document.querySelectorAll(".dark-text");
const backG = document.querySelector(".darkBackG");

function textAndTitlesDark() {
    for(let i = 0; i < text.length; i++) {
	text[i].classList.replace("light-text","dark-text")
    };

    for(let i = 0; i < titles.length; i++) {
	titles[i].classList.replace("light-titles","dark-titles")
    };
};

function textAndTitlesLight() {
    for(let i = 0; i < text.length; i++) {
	text[i].classList.replace("dark-text","light-text")
    };

    for(let i = 0; i < titles.length; i++) {
	titles[i].classList.replace("dark-titles","light-titles")
    };
};

button.addEventListener('click',()=>{
    (body.classList.contains("lightMode")) ? (
	body.classList.replace("lightMode","darkMode"),
	(backG != null) ? (backG.classList.replace("lightBackG","darkBackG")) : null,
	textAndTitlesDark(),
	button.title = "Light Mode",
	sun.classList.remove("hide"),
	moon.classList.add("hide")
    )
    : (body.classList.replace("darkMode","lightMode"),
	(backG != null) ? (backG.classList.replace("darkBackG","lightBackG")) : null,
	textAndTitlesLight(),
	button.title = "Dark Mode",
	moon.classList.remove("hide"),
	sun.classList.add("hide")
	);
})
