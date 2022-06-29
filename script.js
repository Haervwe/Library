const booksArray = [];
const inputForm = document.getElementById("inputForm");
const newBookBtn = document.getElementById("new")
const cancel = document.getElementById("cancel");
const board = document.querySelector(".library");

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.addBook = function() {
    const newBook = document.createElement("div");
    newBook.className = "book";
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
    newBook.appendChild(tit);
    newBook.appendChild(aut);
    newBook.appendChild(pag);
    newBook.appendChild(re);
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


newBookBtn.addEventListener("click",showForm)
cancel.addEventListener("click",hideForm)
inputForm.addEventListener("submit",newBook);





