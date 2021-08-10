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
        label:"Seitenanzahl",
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
btnAnlage.addEventListener("click", function(e) {
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
})

function Books (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}

Books.prototype.info = function () {
    return `Der Titel des Buches ist ${this.title}, Es wurde geschrieben von ${this.author} und hat ${this.pages} Seiten. Aktuell hast Du das Buch ${this.read}.`;
}

let myLibrary = [];

function storeBook (title, author, pages, read) {
    myLibrary.push(new Books(title,author,pages,read));
    const tableBooks = document.querySelector("#tableBooks");
    let buffer = [myLibrary[myLibrary.length-1]];
    console.log(buffer);
    generateTable(tableBooks,buffer) 

}

function returnBooks () {
    myLibrary.forEach(book => console.log(book.info()));
}

function checkforRequiredInput (title, author, pages) {
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

function drawTable () {
    const tableBooks = document.createElement("table");
    const outputBooks = document.querySelector("#buchanzeige");
    tableBooks.id = "tableBooks";
    outputBooks.appendChild(tableBooks);
    generateTable(tableBooks,myLibrary);
    generateTableHead(tableBooks,Object.keys(myLibrary[0]));
    

}

function generateTableHead (table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.id="tableHeader";
        th.appendChild(text);
        row.appendChild(th);
        
    }
}

function generateTable (table, data) {
    console.log(data);
    
    for (let element of data) {
        let row = table.insertRow();
        for (let key in element) {
            if (typeof element[key] != "function" && typeof element[key] != "boolean") {
                let cell = row.insertCell();
                cell.id="tableCell"
                let text = document.createTextNode(element[key])
                cell.appendChild(text);
            }
            else if (typeof element[key] == "boolean") {
                let cell = row.insertCell();
                let box = document.createElement("input")
                cell.id="tableCell"
                box.type="checkbox";
                if (element[key] == true) {
                    box.checked = true;
                }
                cell.appendChild(box);
            }
            
        }
        
    }
}


myLibrary.push(new Books("Test","Test","123",false));
drawTable();

