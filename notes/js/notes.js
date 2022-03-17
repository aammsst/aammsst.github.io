"use strict";

// getting the buttons and input {{{

const btnAdd = document.getElementById("btn__add");
//const btnGuardar = document.querySelector(".btn__guardar");
//const btnEliminar = document.querySelector(".btn__eliminar");

const input = document.getElementById("data__input");

// }}}

// request {{{

const idbReq = indexedDB.open("notes",1); //idbReq -> indexedDataBaseRequest

idbReq.addEventListener("upgradeneeded",()=>{
    const dataBass = idbReq.result; // dataBass -> dataBase -> db
    dataBass.createObjectStore("data",{
	autoIncrement: true
    });
})

idbReq.addEventListener("success",()=>{
    readObj();
})

idbReq.addEventListener("error",()=>{
    console.log("Error while opening the data base");
})

// }}}

// CRUD - optimizado {{{

const requestInfo = (mode, msg) =>{
    const dataBass = idbReq.result;
    const IDBtransaction = dataBass.transaction("data",mode);
    const objStore = IDBtransaction.objectStore("data");
    IDBtransaction.addEventListener("complete",()=>{
	console.log(msg)
    })

    return objStore;
}

// ----------------- addign objects

const addObj = object => {
    const IDBinfo = requestInfo("readwrite","success at adding the object")
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
    const IDBinfo = requestInfo("readwrite","object modified!");
    IDBinfo.put(obj, key);
}

// ----------------- delete objects

const deleteObj = key => {
    const IDBinfo = requestInfo("readwrite","object deleted!");

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
    btnSave.classList.add("imposible");
    btnDelete.classList.add("btn__delete");

    btnSave.textContent = "Save";
    btnDelete.textContent = "Delete";

    h3.textContent = note.data; // lo que le pasamos como segundo parámetro
    h3.setAttribute("contenteditable","true"); // el contenido es editable
    h3.setAttribute("spellcheck","false"); // no se revisan errores ortográficos

    article.appendChild(h3);
    article.appendChild(btnSave);
    article.appendChild(btnDelete);

    h3.addEventListener("keyup",()=>{
	btnSave.classList.replace("imposible","posible")
    })

    btnSave.addEventListener("click",()=>{
	(btnSave.className == "posible") ? 
	    (modifyObj(id,{data:h3.textContent}),
	    btnSave.classList.replace("posible","imposible"))
					    : null;
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
    (data.length > 0 && document.querySelector(".posible") == undefined)  ? 
	(addObj({data}),readObj(),
	input.value = "", 
	input.setAttribute("placeholder","Write notes here!"))

    : ((data.length > 0 && confirm("There are unsaved changes! Continue anyway?")) ? 
	(addObj({data}),readObj())

	: input.setAttribute("placeholder","Ha, so funny"));
})
// }}}
