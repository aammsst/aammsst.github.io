"use strict";
const menuHome = document.createElement("A");
const verifyWidht = matchMedia("(max-width: 720px)");
const messageBox = document.querySelector(".no-mobile");
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.maxTouchPoints > 0 && messageBox != null) {
        messageBox.removeAttribute("hidden");
        document.body.style.overflow = "hidden";
    }
    else if (messageBox) {
        messageBox.setAttribute("hidden", "true");
        document.body.style.overflow = "scroll";
    }
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
    menuHome.setAttribute('href', '../index.html');
    menuTetris.setAttribute('href', '../tetris/tetris.html');
    menuNotes.setAttribute('href', '../notes/notes.html');
    menuPaint.setAttribute('href', '../webPaint/webPaint.html');
    menuGitHub.setAttribute('href', 'https://github.com/aammsst');
    menuGitHub.setAttribute('target', '_blank');
    menuLinkedIn.setAttribute('href', 'https://www.linkedin.com/in/fabricio-navarro-ab073a165/');
    menuLinkedIn.setAttribute('target', '_blank');
    menuBox.appendChild(menuHome);
    menuBox.appendChild(menuProjects);
    menuBox.appendChild(menuTetris);
    menuBox.appendChild(menuNotes);
    menuBox.appendChild(menuPaint);
    menuBox.appendChild(menuContact);
    menuBox.appendChild(menuGitHub);
    menuBox.appendChild(menuLinkedIn);
    menuBox.appendChild(thx);
});
if (menu) {
    menu.addEventListener('click', () => {
        (isOpen) ? closeMenu() : openMenu();
    });
}
verifyWidht.addEventListener("change", () => {
    (navigator.maxTouchPoints > 0 && messageBox != null) ? (messageBox.removeAttribute("hidden"),
        document.body.style.overflow = "hidden")
        : ((messageBox != null) ? (messageBox.setAttribute("hidden", "true"),
            document.body.style.overflow = "scroll")
            : null);
});
