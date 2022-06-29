const booksArray = [];
const inputForm = document.getElementById("inputForm");
const newBookBtn = document.getElementById("new")
const cancel = document.getElementById("cancel");
const board = document.querySelector(".library");
const del = document.querySelector(".del");

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.addBook = function() {
    const newBook = document.createElement("div");
    newBook.className = `book n${booksArray.length -1}`;
    const tit  = document.createElement("p");
    tit.innerText = `Title: ${this.title}`;
    const aut = document.createElement("p");
    aut.innerText =`Author: ${this.author}`;
    const pag = document.createElement("p");
    pag.innerText = `N° of pages: ${this.pages}`;
    const re = document.createElement("div");
    if (this.read == true) {
        re.className = "readed";
    } else {
        re.className = "notReaded";
    }
    const del = document.createElement("button");
    del.className = `del`;
    del.innerText = "Delete";
    del.onclick = function () {deleteBook();};
    newBook.appendChild(tit);
    newBook.appendChild(aut);
    newBook.appendChild(pag);
    newBook.appendChild(re);
    newBook.appendChild(del);
    board.appendChild(newBook);
}

function showForm () {
    inputForm.style.display = "grid";
    inputForm.title.value = "";
    inputForm.author.value = "";
    inputForm.pages.value = "";
    inputForm.readed.value = false;   
}

function hideForm () {
    inputForm.style.display = "none";    
}

function newBook (e){
    const form = e.target
    e.preventDefault();
    e.stopImmediatePropagation();
    const newBook = new Book(form.title.value,form.author.value,form.pages.value,form.readed.value);
    booksArray.push(newBook);
    booksArray[booksArray.length -1].addBook();
    inputForm.style.display = "none";

}

function deleteBook (e){
    const book = e;
    for (let i=0; i < booksArray.length; i++){
        if (book.title.value == booksArray[i].title){
            booksArray.splice(i,1);
        }
    }
    board.removeChild(e.parentNode);
}

newBookBtn.addEventListener("click",showForm)
cancel.addEventListener("click",hideForm)
inputForm.addEventListener("submit",newBook);






