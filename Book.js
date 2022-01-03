let library = []

const grid = document.getElementById("grid-container")
const tfTitle = document.getElementById("title")
const tfAuthor = document.getElementById("author")
const tfNumPages = document.getElementById("noPages")
const newBtn = document.getElementById("btn")
const form = document.getElementById("form")
const doneBtn = document.getElementById("add")
const body = document.getElementById("body")
const ascBtn = document.getElementById("asc")
const descBtn = document.getElementById("desc")
const displayBtn = document.getElementById("display")
const sortBtn = document.getElementById("sort")
const dropdown = document.getElementById("dropdown-content")
const resetBtn = document.getElementById("reset")

function Book(title, author, numPages, hasRead){

    this.title = title
    this.author = author
    this.numPages = numPages
    this.hasRead = hasRead
    this.info = function(){
        return title + " by " + author + ", " + numPages + " pages"
    }
}

function addBookToLibrary(title, author, numPages){

    library.push(new Book(title, author, numPages))
}


function loopBooks(array){
    for(let i = 0; i < array.length; i++){

        let book = document.createElement("div")
        book.id = i + "book"
        book.className = "grid-item"

        const title = document.createElement("div")
        title.innerText = array[i].title
        const author = document.createElement("div")
        author.innerText = "By:\t" + array[i].author
        const numOfPages = document.createElement("div")
        numOfPages.innerText = "Pages:\t" + array[i].numPages
        
        book.append(title, author, numOfPages)

        const readBtn = document.createElement("button")
        readBtn.innerText = "Read"
        readBtn.className = "read"
        readBtn.id = i + "read"
        readBtn.addEventListener("click", changeReadState)

        const removeBtn = document.createElement("button")
        removeBtn.innerText = "Remove"
        removeBtn.addEventListener("click", removeBook)
        removeBtn.id = i 
        removeBtn.className = "remove"

        book.append(readBtn , removeBtn)
        grid.append(book)
    }

    body.appendChild(grid)
}

function changeReadState(e){
    if(library[e.target.id.charAt(0)].hasRead == false){
        library[e.target.id.charAt(0)].hasRead = true
        e.target.innerText = "Done"
        e.target.style.backgroundColor = "darkblue"
    }else{
        library[e.target.id.charAt(0)].hasRead = false
        e.target.innerText = "Read"
        e.target.style.backgroundColor = "royalblue"
    }
}

function removeBook(e){
    let val = library[e.target.id]
    
    for (let i = 0; i < library.length; i++) {
        if (library[i] == val) {
            
            library.splice(i, 1)
            i--
        }
    }

    grid.removeChild(document.getElementById(e.target.id + "book"))
}

newBtn.addEventListener("click", revealForm)
doneBtn.addEventListener("click", hideForm)
sortBtn.addEventListener("click", revealOptions)
ascBtn.addEventListener("click", sortByAscending)
descBtn.addEventListener("click", sortByDescending)
displayBtn.addEventListener("click", displayUnread)
resetBtn.addEventListener("click", displayAllBooks)

function revealForm(){
 
    grid.innerHTML = null
    body.style.visibility = "hidden"
    form.style.visibility = "visible"
}

function hideForm(){
    if(tfTitle.value == "" || tfAuthor.value== "" || tfNumPages.value == ""){
        alert("All fields must contain a value")
    }else if(isPresent()){
        alert("Book is already present in library")
    }else{
        addBookToLibrary(tfTitle.value, tfAuthor.value, tfNumPages.value)
        form.style.visibility = "hidden"
        body.style.visibility = "visible"
        loopBooks(library)
    }
}

function isPresent(){
    let isFound = false
    for(let i = 0; i < library.length; i++){   
       if(library[i].title == tfTitle.value){
           isFound = true
       }
    }
    return isFound
}

let isRevealed = false

function revealOptions(){
    if(isRevealed == false){
        dropdown.style.visibility = "visible"
        isRevealed = true
    }else{
        isRevealed = false
        dropdown.style.visibility = "hidden"
    }
    
}
function sortByAscending(){
    for(let i = 0; i < library.length; i++){
        for(let j = i; j < library.length; j++){
            if(library[j].numPages < library[i].numPages){
                let temp = library[i].numPages
                library[i].numPages = library[j].numPages
                library[j].numPages = temp
            }
        }
    }
    grid.innerHTML = null
    loopBooks(library)
}

function sortByDescending(){
    for(let i = 0; i < library.length; i++){
        for(let j = i; j < library.length; j++){
            if(library[j].numPages > library[i].numPages){
                let temp = library[i]
                library[i] = library[j]
                library[j] = temp
            }
        }
    }
    grid.innerHTML = null
    loopBooks(library)
}

function displayUnread(){
    let filteredLibrary = library.filter(element => element.hasRead == false)
    grid.innerHTML = null
    loopBooks(filteredLibrary)
}

function displayAllBooks(){
    loopBooks(library)
}




