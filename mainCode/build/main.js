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
const root = 'https://aammsst.github.io/';
const messageBox = document.querySelector(".no-mobile"); // only for apps without mobile version

let isOpen = false;

document.addEventListener('DOMContentLoaded',()=>{
    // mobile app verification
    if (navigator.maxTouchPoints > 0 && messageBox != null) { 
	    messageBox.removeAttribute("hidden");
	    document.body.style.overflow = "hidden";
    } else if (messageBox) {
	    messageBox.setAttribute("hidden","true");
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

    if (document.location.href == root) {
        // main page menu box
        menuTetris.setAttribute('href', root + 'Classic-Tetris-Js');
        menuNotes.setAttribute('href', root + 'Notes');
        menuPaint.setAttribute('href', root + 'Web-Paint');
        menuGitHub.setAttribute('href','https://github.com/elfabri');
        menuGitHub.setAttribute('target','_blank');
        menuLinkedIn.setAttribute('href','https://www.linkedin.com/in/fabricio-navarro-ab073a165/');
        menuLinkedIn.setAttribute('target','_blank');

        menuBox.appendChild(menuProjects);
        menuBox.appendChild(menuTetris);
        menuBox.appendChild(menuNotes);
        menuBox.appendChild(menuPaint);
        menuBox.appendChild(menuContact);
        menuBox.appendChild(menuGitHub);
        menuBox.appendChild(menuLinkedIn);
        menuBox.appendChild(thx);
    } else {
        // projects menu box
        menuHome.setAttribute('href','https://aammsst.github.io/');
        menuGitHub.setAttribute('href','https://github.com/elfabri');
        menuGitHub.setAttribute('target','_blank');
        menuLinkedIn.setAttribute('href','https://www.linkedin.com/in/fabricio-navarro-ab073a165/');
        menuLinkedIn.setAttribute('target','_blank');

        menuBox.appendChild(menuHome);
        menuBox.appendChild(menuContact);
        menuBox.appendChild(menuGitHub);
        menuBox.appendChild(menuLinkedIn);
        menuBox.appendChild(thx);
    }
})

const closeMenu = ()=> {
    document.body.removeChild(menuBox);
    isOpen = false;
}

const openMenu = () => {
    document.body.appendChild(menuBox);
    isOpen = true;
}

if (menu) {menu.addEventListener('click',()=>{
    (isOpen) ? closeMenu() : openMenu()
})
}

// for testing while changing the resolution manually

// mobile app verification resources
// const verifyWidht = matchMedia("(max-width: 720px)");

/*
verifyWidht.addEventListener("change",()=>{
    if (navigator.maxTouchPoints > 0 && messageBox != null) { 
        messageBox.removeAttribute("hidden"),
        document.body.style.overflow = "hidden"
    } else if (messageBox != null) {
        messageBox.setAttribute("hidden","true"),
        document.body.style.overflow = "scroll"
    }
})
*/

