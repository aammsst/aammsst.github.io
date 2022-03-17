"use strict";

// menu related things
const screen = document.body;
const menu = document.querySelector(".menu");
const menuBox =  document.createElement("DIV");
const menuHome = document.createElement("A");
const menuProjects = document.createElement("H2");
const menuTetris = document.createElement("A");
const menuNotes = document.createElement("A");
const menuPaint = document.createElement("A");
const menuContact = document.createElement("H2");
const menuGitHub = document.createElement("A");
const menuLinkedIn = document.createElement("A");
const thx = document.createElement("H5");
let open = false;

// mobile app verification resources
const verifyWidht = matchMedia("(max-width: 720px)");
const messageBox = document.querySelector(".no-mobile"); // only for apps without mobile version

document.addEventListener('DOMContentLoaded',()=>{
    // mobile app verification
    (navigator.maxTouchPoints == 1 && messageBox != null) ? (
	messageBox.removeAttribute("hidden"),
	screen.style.overflow = "hidden"
    )
	: ((messageBox != null) ? (
	    messageBox.setAttribute("hidden","true"),
	    screen.style.overflow = "scroll"
	) 
	    : null)

    // menu box for apps
    menuBox.classList.add("menu-box");

    menuHome.textContent = "Back to Home";
    menuProjects.textContent = "Projects";
    menuTetris.textContent = "Tetris";
    menuNotes.textContent = "Notes";
    menuPaint.textContent = "Paint";
    menuContact.textContent = "Contact";
    menuGitHub.textContent = "GitHub";
    menuLinkedIn.textContent = "LinkedIn";
    thx.textContent = "Thanks for visiting!";

    menuHome.setAttribute('href','../index.html');
    menuTetris.setAttribute('href','../tetris/tetris.html');
    menuNotes.setAttribute('href','../notes/notes.html');
    menuPaint.setAttribute('href','../webPaint/webPaint.html');
    menuGitHub.setAttribute('href','https://github.com/aammsst');
    menuGitHub.setAttribute('target','_blank');
    menuLinkedIn.setAttribute('href','https://www.linkedin.com/in/fabricio-navarro-ab073a165/');
    menuLinkedIn.setAttribute('target','_blank');

    menuBox.appendChild(menuHome);
    menuBox.appendChild(menuProjects);
    menuBox.appendChild(menuTetris);
    menuBox.appendChild(menuNotes);
    menuBox.appendChild(menuPaint);
    menuBox.appendChild(menuContact);
    menuBox.appendChild(menuGitHub);
    menuBox.appendChild(menuLinkedIn);
    menuBox.appendChild(thx);
})

// menu button
menu.addEventListener('click',()=>{
    (open) ? (
	screen.removeChild(menuBox),
	open = false
    )
    :	(screen.appendChild(menuBox),
	open = true
	)
})

// for testing while changing the resolution manually
verifyWidht.addEventListener("change",()=>{
    (navigator.maxTouchPoints == 1 && messageBox != null) ? (
	messageBox.removeAttribute("hidden"),
	screen.style.overflow = "hidden"
    )
	: ((messageBox != null) ? (
	    messageBox.setAttribute("hidden","true"),
	    screen.style.overflow = "scroll"
	) 
	    : null)
})
