"use strict";
const menu = document.querySelector(".menu");
const menuBox = document.createElement("DIV");
const menuProjects = document.createElement("H2");
const menuTetris = document.createElement("A");
const menuNotes = document.createElement("A");
const menuPaint = document.createElement("A");
const menuContact = document.createElement("H2");
const menuGitHub = document.createElement("A");
const menuLinkedIn = document.createElement("A");
const thx = document.createElement("H5");
let isOpen = false;
document.addEventListener('DOMContentLoaded', () => {
    menuBox.classList.add("menu-box");
    menuProjects.textContent = "Projects";
    menuTetris.textContent = "Tetris";
    menuNotes.textContent = "Notes";
    menuPaint.textContent = "Paint";
    menuContact.textContent = "Contact";
    menuGitHub.textContent = "GitHub";
    menuLinkedIn.textContent = "LinkedIn";
    thx.textContent = "Thanks for visiting!";
    menuTetris.setAttribute('href', 'tetris/tetris.html');
    menuNotes.setAttribute('href', 'notes/notes.html');
    menuPaint.setAttribute('href', 'webPaint/webPaint.html');
    menuGitHub.setAttribute('href', 'https://github.com/aammsst');
    menuGitHub.setAttribute('target', '_blank');
    menuLinkedIn.setAttribute('href', 'https://www.linkedin.com/in/fabricio-navarro-ab073a165/');
    menuLinkedIn.setAttribute('target', '_blank');
    menuBox.appendChild(menuProjects);
    menuBox.appendChild(menuTetris);
    menuBox.appendChild(menuNotes);
    menuBox.appendChild(menuPaint);
    menuBox.appendChild(menuContact);
    menuBox.appendChild(menuGitHub);
    menuBox.appendChild(menuLinkedIn);
    menuBox.appendChild(thx);
});
const closeMenu = () => {
    document.body.removeChild(menuBox);
    isOpen = false;
};
const openMenu = () => {
    document.body.appendChild(menuBox);
    isOpen = true;
};
if (menu) {
    menu.addEventListener('click', () => {
        (isOpen) ? closeMenu() : openMenu();
    });
}
