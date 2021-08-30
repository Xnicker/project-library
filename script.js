let bookIndex = 1; /* Wird für den Index der BÜCHER genutzt! Nicht für den Index des Arrays myLibrary */

const buchanlageInputs = [ /* Wird genutzt für den Aufbau der Inputs für die Neuanlage eines Buches */
    {
        type:"text",
        label:"Titel",
        id:"txtTitle",
    },
    {
        type:"text",
        label:"Autor",
        id:"txtAuthor",
    },
    {
        type:"text",
        label:"Seiten",
        id:"txtPages",
    },
    {
        type:"checkbox",
        label:"Gelesen?",
        id:"chkRead",
    },
    {
        type:"button",
        label:"Neues Buch anlegen",
        id:"btnAnlage",
    }
]


/* Wird genutzt für den Aufbau der Inputs für die Neuanlage eines Buches */
const buchAnlageDiv = document.querySelector("#buchanlage");

buchanlageInputs.forEach(input => {
    
    if (input.type != "button") {
        const inputElementsDiv = document.createElement("div");
        const inputElements  = document.createElement("input")
        inputElementsDiv.id = `div${input.id}`
        inputElementsDiv.innerHTML=input.label;
        inputElements.classList.add("inputBuch")
        inputElements.type = input.type;
        inputElements.id = input.id;
        buchAnlageDiv.appendChild(inputElementsDiv);
        inputElementsDiv.appendChild(inputElements);
    }
    else {
        const inputElementsButton = document.createElement("button");
        inputElementsButton.id = input.id;
        inputElementsButton.innerHTML = input.label;
        buchAnlageDiv.appendChild(inputElementsButton);
    }
    
})
/* Wird genutzt für den Aufbau der Inputs für die Neuanlage eines Buches */

const btnAnlage = document.querySelector("#btnAnlage")
btnAnlage.addEventListener("click", createNewBook)

function createNewBook(e) {
    const inputTitle = document.querySelector("#txtTitle");
    const inputAuthor = document.querySelector("#txtAuthor");
    const inputPages = document.querySelector("#txtPages");
    const inputRead = document.querySelector("#chkRead");

    let check = checkforRequiredInput(inputTitle.value, inputAuthor.value, inputPages.value);

    if (check === true ) {
        storeBook(inputTitle.value, inputAuthor.value, inputPages.value,inputRead.checked);
        inputTitle.value ="";
        inputAuthor.value ="";
        inputPages.value="";
        inputRead.checked = false;
    }
    else {
        window.alert(`Es fehlen folgende Angaben:${check}`)
    }
}

class Books {
constructor(title, author, pages, read){
    this.index = bookIndex;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
    
}


Books.prototype.info = function () {
    return `Der Titel des Buches ist ${this.title}, Es wurde geschrieben von ${this.author} und hat ${this.pages} Seiten. Aktuell hast Du das Buch ${this.read}.`;
}



let myLibrary = [];

function storeBook (title, author, pages, read) { /* Zur Anlage eines neuen Buches, wenn auf "Neues Buch anlegen, geklickt wird." */
    myLibrary.push(new Books(title,author,pages,read));
    bookIndex++;
    const tableBooks = document.querySelector("#tableBooks");
    let buffer = [myLibrary[myLibrary.length-1]];  /* Erstellt einen Buffer Array, da generateTable nur mit iterierbaren Objekten funktioniert */
    console.log(buffer);
    generateTable(tableBooks,buffer) 

}



function checkforRequiredInput (title, author, pages) { /* Überprüft ob alle Felder gefüllt sind, bevor ein neues Buch angelegt wird */
    let error ="";
    
    if (title == "") {
        error += "Titel";
    }
    if (author =="") {
        error += "Author";
    }
    if (pages =="") {
        error += "Seiten";
    }

    if (error != "") {
        return error;
    }
    else {
        return true;
    }
}

function drawTable () { /* Zur Erstellung der Tabellenstruktur und des Inhaltes bei der ersten Initialisierung */
    const tableBooks = document.createElement("table");
    const outputBooks = document.querySelector("#buchanzeige");
    tableBooks.id = "tableBooks";
    outputBooks.appendChild(tableBooks);
    generateTable(tableBooks,myLibrary);
    generateTableHead(tableBooks,Object.keys(myLibrary[0]));
    

}

function generateTableHead (table, data) { /* Zur Erstellung des Table Headers. Iteriert die einzelnen Propperties der Klasse und fügt diese als Kopfzeile hinzu */
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.classList.add("tableHeader");
        th.appendChild(text);
        row.appendChild(th);
        
    }
}

function generateTable (table, data) { /* Zur Füllen der Tabelle mit den Büchern aus myLibrary */
    console.log(data);
    
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            if (typeof element[key] != "function" && typeof element[key] != "boolean") { /* Ignoriert Funktionen innerhalb des Objekts und Properties des Typs bool */
                let cell = row.insertCell();
                cell.classList.add("tableCell");
                let text = document.createTextNode(element[key])
                cell.appendChild(text);
            }
            else if (typeof element[key] == "boolean") { /* Properties vom Typ Bool werden als Checkbox ausgegeben*/
                let cell = row.insertCell();
                let box = document.createElement("input")
                cell.classList.add("tableCell");
                box.id=`box${element.index}`;
                box.classList.add ("boxread");
                box.type="checkbox";
                if (element[key] == true) {  /*Vorbelegung der Checkbox anhand des Values im Objekt */
                    box.checked = true;
                }
                cell.appendChild(box);
                
            }
            
        }
        let cell = row.insertCell(); /* Fügt in jeder Spalte einen Löschenbutton hinzu */ 
        cell.classList.add("tableCell");
        let button = document.createElement("button");
        button.classList.add("buttondelete");
        button.id = `btn${element.index}`;
        button.textContent = "Löschen";
        cell.appendChild(button);
        
    }
}
for (let index = 0; index < 15; index++) { /*Dummy-Bücher */
    myLibrary.push(new Books(`Test${index}`,"Test","123",false));
    bookIndex++;
    
}


drawTable();

const chkReads = document.querySelectorAll(".boxread");
chkReads.forEach(chkRead => chkRead.addEventListener("change", function (e) {
let index = e.currentTarget.id.substring(3); /**
 * Sucht anhand des Indexes des BUCHES den Index im Array myLibrary. Nötig da das Löschen eines Buches den Index im Array ändert, aber nicht den Index des Buches.
 */
let changeIndex = myLibrary.findIndex(buch => buch.index == index);

if (e.currentTarget.checked == true) {
    myLibrary[changeIndex].read = true;
}
else {
    myLibrary[changeIndex].read = false;
}
}
))

const deleteBooks = document.querySelectorAll(".buttondelete");
deleteBooks.forEach (deleteBook => deleteBook.addEventListener("click", function(e){
    console.log(e.currentTarget.id);
    console.log(myLibrary.length)
    myLibrary.splice(e.currentTarget.id.substring(3)-1,1); 
    console.log(deleteBook.parentElement.parentElement.hasChildNodes());
    deleteBook.parentNode.parentNode.remove();

} ))
