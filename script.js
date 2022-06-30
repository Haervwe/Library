
//variables initialization
var booksArray = [];
//checks for stored data
if (localStorage.getItem("data") == null) {
    localStorage.setItem("data",JSON.stringify([]));
} 
booksArray = JSON.parse(localStorage.getItem("data"));
const inputForm = document.getElementById("inputForm");
const newBookBtn = document.getElementById("new")
const cancel = document.getElementById("cancel");
const board = document.querySelector(".library");
const del = document.querySelector(".del");

//book object constructor

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//method to add a book to the DOM, it also adds delete and read controls with the pertinent event listeners.

Book.prototype.addBook = function() {
    const newBook = document.createElement("div");
    newBook.className = `book n${booksArray.length -1}`;
    const tit  = document.createElement("p");
    tit.className = "title";
    tit.innerText = `Title: ${this.title}`;
    const aut = document.createElement("p");
    aut.innerText =`Author: ${this.author}`;
    const pag = document.createElement("p");
    pag.innerText = `N° of pages: ${this.pages}`;
    const re = document.createElement("input");
    const label = document.createElement("label");
    label.for = "check"
    label.innerText = "Has been read?"
    re.type = "checkbox";
    re.id = "check";
    re.name = "check";
    re.checked = this.read;
    re.addEventListener("click",markReaded);
    const red = document.createElement("div");
    red.appendChild(label);
    red.appendChild(re);
    red.style.display = "flex"
    const del = document.createElement("button");
    del.className = `del`;
    del.innerText = "Delete";
    del.addEventListener("click", deleteBook);
    newBook.appendChild(tit);
    newBook.appendChild(aut);
    newBook.appendChild(pag);
    newBook.appendChild(red);
    newBook.appendChild(del);
    board.appendChild(newBook);
}

//function tu opdate de local data file

function updateLocal () {
    localStorage.clear;
    localStorage.setItem("data",JSON.stringify(booksArray));
}

//functions to control the visivility of the new book form

function showForm () {
    inputForm.style.display = "grid";
    inputForm.title.value = "";
    inputForm.author.value = "";
    inputForm.pages.value = "";
    inputForm.readed.checked = false;  
}

function hideForm () {
    inputForm.style.display = "none";    
}

//function to change the readed status on the array when is changed on the DOM.

function markReaded(e){
    const book = e.currentTarget.parentNode.parentNode;
    for (let i = 0; i < booksArray.length; i++){
        if (book.firstChild.innerText == `Title: ${booksArray[i].title}`){
            booksArray[i].read = !booksArray[i].read;
            updateLocal();
        }
    }
}

// functions to add and delete books from the array.

function newBook (e){
    const form = e.target
    e.preventDefault();
    e.stopImmediatePropagation();
    for (let i = 0; i < booksArray.length; i++){
        if (form.title.value == booksArray[i].title){
            alert("The Book already Exist");
            showForm();
            return;
        }
    }
    const newBook = new Book(form.title.value,form.author.value,form.pages.value,form.readed.checked);
    booksArray.push(newBook);
    booksArray[booksArray.length -1].addBook();
    inputForm.style.display = "none";
    updateLocal();

}

function deleteBook (e){
    const book = e.target.parentNode;
    for (let i = 0; i < booksArray.length; i++){
        if (book.firstChild.innerText == `Title: ${booksArray[i].title}`){
            booksArray.splice(i,1);
        }
    }
    board.removeChild(e.target.parentNode);
    updateLocal();
}

// loop to display saved books from local storage

for (let i = 0; i < booksArray.length;i++){
    booksArray[i].__proto__ = Book.prototype; 
    booksArray[i].addBook();
}


//fixed DOM eventlisteners

newBookBtn.addEventListener("click",showForm);
cancel.addEventListener("click",hideForm);
inputForm.addEventListener("submit",newBook);