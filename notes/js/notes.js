"use strict";

// getting the buttons and input {{{
const btnAdd = document.getElementById("btn__add");
const input = document.getElementById("data__input");
// }}}

// request {{{
const idbReq = indexedDB.open("notes",1); //idbReq -> indexedDataBaseRequest

idbReq.addEventListener("upgradeneeded",()=>{
    const dataBase = idbReq.result;
    dataBase.createObjectStore("data",{
	autoIncrement: true
    });
})

idbReq.addEventListener("success",()=>{
    readObj();
})

idbReq.addEventListener("error", e =>{
    console.log("Error while opening the data base ", e);
})
// }}}

// CRUD {{{
const requestInfo = (mode) =>{
    const dataBase = idbReq.result;
    const IDBtransaction = dataBase.transaction("data",mode);
    const objStore = IDBtransaction.objectStore("data");

    return objStore;
}

// ----------------- addign objects
const addObj = object => {
    const IDBinfo = requestInfo("readwrite")
    IDBinfo.add(object);
}
 
// ----------------- reading objects
const readObj = () => {
    const IDBinfo = requestInfo("readonly")
    const cursor = IDBinfo.openCursor();
    const fragment = document.createDocumentFragment();
    document.querySelector(".list").innerHTML = "";

    cursor.addEventListener("success",()=>{
	if (cursor.result) {
	    let element = thingsHTML(cursor.result.key,cursor.result.value);
	    fragment.appendChild(element);
	    cursor.result.continue();
	} else document.querySelector(".list").appendChild(fragment);
    })
}
    
// ----------------- modify objects
const modifyObj = (key,obj) => {
    const IDBinfo = requestInfo("readwrite");
    IDBinfo.put(obj, key);
}

// ----------------- delete objects
const deleteObj = key => {
    const IDBinfo = requestInfo("readwrite");
    IDBinfo.delete(key);
}
// }}}

// adding html stuff {{{
const thingsHTML = (id,note) => {
    const article = document.createElement("ARTICLE");
    const h3 = document.createElement("H3");
    const btnSave = document.createElement("BUTTON");
    const btnDelete = document.createElement("BUTTON");

    article.classList.add("elements");
    h3.classList.add("thing");
    btnSave.classList.add("impossible");
    btnDelete.classList.add("btn__delete");

    btnSave.textContent = "Save";
    btnDelete.textContent = "Delete";

    h3.textContent = note.data; // text to add
    h3.setAttribute("contenteditable","true");
    h3.setAttribute("spellcheck","false");

    article.appendChild(h3);
    article.appendChild(btnSave);
    article.appendChild(btnDelete);

    // impossible or possible to save
    h3.addEventListener("keyup",()=>{
	    btnSave.classList.replace("impossible","possible")
    })

    btnSave.addEventListener("click",()=>{
        if (btnSave.className == "possible") {
            modifyObj(id, {data:h3.textContent});
	        btnSave.classList.replace("possible","impossible");
        }
    })

    btnDelete.addEventListener("click",()=>{
	    deleteObj(id);
	    document.querySelector(".list").removeChild(article);
    })

    return article;
}
// }}}

// Input {{{
btnAdd.addEventListener("click",()=>{
    let data = input.value;
    if (data.length > 0 && document.querySelector(".possible") == undefined) {
        addObj({data});
        readObj();
        input.value = "";
        input.setAttribute("placeholder", "Write notes here!");
    } else if (data.length > 0 && confirm("There are unsaved changes! Continue anyway?")) {
        addObj({data});
        readObj();
        input.value = "";
        input.setAttribute("placeholder", "Write notes here!");
    } else {
        input.setAttribute("placeholder", "xd!");
    }
})
// }}}
