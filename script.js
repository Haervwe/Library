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

function markReaded(e){
    const book = e.currentTarget.parentNode.parentNode;
    for (let i = 0; i < booksArray.length; i++){
        if (book.firstChild.innerText == `Title: ${booksArray[i].title}`){
            booksArray[i].read = !booksArray[i].read;
        }
    }
}

function newBook (e){
    const form = e.target
    e.preventDefault();
    e.stopImmediatePropagation();
    const newBook = new Book(form.title.value,form.author.value,form.pages.value,form.readed.checked);
    booksArray.push(newBook);
    booksArray[booksArray.length -1].addBook();
    inputForm.style.display = "none";

}

function deleteBook (e){
    const book = e.target.parentNode;
    console.log(book.firstChild.innerText);
    for (let i = 0; i < booksArray.length; i++){
        if (book.firstChild.innerText == `Title: ${booksArray[i].title}`){
            booksArray.splice(i,1);
        }
    }
    board.removeChild(e.target.parentNode);
}


newBookBtn.addEventListener("click",showForm)
cancel.addEventListener("click",hideForm)
inputForm.addEventListener("submit",newBook);