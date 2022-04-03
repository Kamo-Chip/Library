class Book {
    constructor(title, author, numPages, hasRead = false) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.hasRead = hasRead;
    }

    getTitle() {
        return this.title;
    }

    getAuthor() {
        return this.author;
    }

    getNumPages() {
        return this.numPages;
    }

    read() {
        this.hasRead = true;
    }

    unread() {
        this.hasRead = false;
    }
}

class Library {

    library;

    constructor() {
        this.library = [new Book("Psychology of Money", "Morgan Houssel", 30), new Book("1984", "George Orwell", 200), new Book("Animal Farm", "George Orwell", 50)];
        this.displayBooks(this.library);
    }

    readBook(title) {
        this.library.forEach(element => {
            if (element.getTitle() === title) {
                element.read();
                console.log(element)
            }
        });
    }

    unreadBook(title) {
        this.library.forEach(element => {
            if (element.getTitle() === title) {
                element.unread();
                console.log(element)
            }
        });
    }

    contains(title, author) {
        let isPresent = false;
        this.library.forEach(element => {
            if (element.getTitle() === title && element.getAuthor() === author) {
                isPresent = true;
            }
        });
        return isPresent;
    }

    addBook(title, author, numPages) {
        if(title === "" || author === "" || numPages === ""){
            alert("Values cannot be empty");
        }
        if (this.contains(title, author)) {
            alert("Book is already present in library");
            return;
        }
        this.library.push(new Book(title, author, numPages));
    }

    removeBook(book) {
        let newLibrary = this.library.filter(element => (!book.innerText.includes(element.getTitle())));
        this.library = newLibrary;
    }

    numBooks() {
        return this.library.length;
    }

    sortByAscPage() {
        console.log(this.library.length)
        for (let i = 0; i < this.library.length; i++) {
            for (let j = i; j < this.library.length; j++) {
                if (this.library[j].getNumPages() < this.library[i].getNumPages()) {
                    let temp = this.library[j];
                    this.library[j] = this.library[i];
                    this.library[i] = temp;
                }
            }
        }
    }

    sortByDescPage() {
        for (let i = 0; i < this.library.length; i++) {
            for (let j = i; j < this.library.length; j++) {
                if (this.library[j].getNumPages() > this.library[i].getNumPages()) {
                    let temp = this.library[j];
                    this.library[j] = this.library[i];
                    this.library[i] = temp;
                }
            }
        }
    }

    sortByUnread() {
        let unreadBooks = this.library.filter(element => (element.hasRead == false));
        this.displayBooks(unreadBooks);
    }

    displayBooks(arr) {
        const grid = document.getElementById("grid-container");
        arr.forEach(element => {
            let keepTrackOfRead = 1;
            const book = document.createElement("div");
            book.setAttribute("class", "grid-item");

            const lblTitle = document.createElement("div");
            lblTitle.innerText = `${element.getTitle()}`;

            const lblAuthor = document.createElement("div");
            lblAuthor.innerText = `By:\t ${element.getAuthor()}`;

            const lblPages = document.createElement("div");
            lblPages.innerText = `${element.getNumPages()} pages`;

            const btnRead = document.createElement("button");
            btnRead.innerText = "Read";
            btnRead.setAttribute("class", "read")
            btnRead.addEventListener("click", () => {
                console.log(keepTrackOfRead)
                keepTrackOfRead++;
                if (keepTrackOfRead % 2 === 0) {
                    btnRead.style.backgroundColor = "#082d9c";
                    library.readBook(btnRead.parentNode.childNodes[0].innerText.split(": ")[1]);
                } else {
                    btnRead.style.backgroundColor = "royalblue";
                    library.unreadBook(btnRead.parentNode.childNodes[0].innerText.split(": ")[1]);

                }
            });
            const btnRemove = document.createElement("button");
            btnRemove.innerText = "Remove";
            btnRemove.setAttribute("class", "remove");
            btnRemove.addEventListener("click", () => {
                library.removeBook(btnRemove.parentNode);
                grid.removeChild(btnRemove.parentNode);
            });
            book.append(lblTitle, lblAuthor, lblPages, btnRead, btnRemove);
            grid.appendChild(book);
        });
    }
}

const library = new Library();

const form = document.getElementById("form");
const sortBtn = document.getElementById("sort");
const btnNewBook = document.getElementById("btn");
const grid = document.getElementById("grid-container");
const doneBtn = document.getElementById("add");

btnNewBook.addEventListener("click", () => {
    grid.style.visibility = "hidden";
    sortBtn.style.visibility = "hidden";
    btnNewBook.style.visibility = "hidden";
    form.style.visibility = "visible";
});

doneBtn.addEventListener("click", () => {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const numPages = document.getElementById("noPages");

    library.addBook(title.value, author.value, numPages.value);
    grid.innerHTML = null;
    library.displayBooks(library.library);
    grid.style.visibility = "visible";
    sortBtn.style.visibility = "visible";
    btnNewBook.style.visibility = "visible";
    form.style.visibility = "hidden";
});

let keepTrackOfSort = 1;

const dropDownContent = document.getElementById("dropdown-content");
const btnAsc = document.getElementById("asc");
btnAsc.addEventListener("click", () => {
    library.sortByAscPage();
    grid.innerHTML = null;
    library.displayBooks(library.library);
});

const btnDesc = document.getElementById("desc");
btnDesc.addEventListener("click", () =>{
    library.sortByDescPage();
    grid.innerHTML = null;
    library.displayBooks(library.library);
});

const btnOnlyRead = document.getElementById("display");
btnOnlyRead.addEventListener("click", () =>{
    grid.innerHTML = null;
    library.sortByUnread();
})
const btnReset = document.getElementById("reset");
btnReset.addEventListener("click", () =>{
    grid.innerHTML = null;
    library.displayBooks(library.library);
})

sortBtn.addEventListener("click", () => {
    keepTrackOfSort++;
    if (keepTrackOfSort % 2 == 0) {
        dropDownContent.style.visibility = "visible";
    } else {
        dropDownContent.style.visibility = "hidden";
    }
});
