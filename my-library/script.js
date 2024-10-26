document.querySelector(".addBookBtn").addEventListener("click",function(){
    const form = document.getElementById("booksForm");
    form.classList.remove("hidden");
})
document.querySelector(".closeForm").addEventListener("click",function(){
    const form = document.getElementById("booksForm");
    form.classList.add("hidden");
})

const library = [{name : "Atomic Habits",author : "James Clear",pages : 306, isRead : true}];
function renderLibrary(){
    let booksHtml = '';
    for (let i=0;i<library.length;i++){
        let isRead
        if (library[i].isRead){
            isRead = "yes";
        }else{
            isRead = "no"
        }
        const html = `
            <div class="bookContainer">
                <div class="bookName">Book : ${library[i].name}</div>
                <div class="authorName">Author : ${library[i].author}</div>
                <div class="noOfPages">Pages : ${library[i].pages}</div>
                <div class="readStatus">Status : ${isRead} </div>
                <button class="remove" onclick="removeBook(${i})">Remove</button>
            </div>
        `
        booksHtml+=html;
        console.log(library[i]);
    }
    document.querySelector('.books').innerHTML = booksHtml;
}
function removeBook(index){
    library.splice(index,1);
    localStorage.setItem('library',JSON.stringify(library));
    renderLibrary();
}
function addBook(event){
    event.preventDefault()
    const name = document.querySelector('#bookTitle').value;
    const author = document.querySelector('#author').value;
    const pages = Number(document.querySelector('#pages').value);
    const rstatus = document.querySelector('input[name="read"]:checked');
    const isRead = rstatus && rstatus.value == "yes"
    const bookInfo = {
        name : name,
        author : author,
        pages : pages,
        isRead : isRead
    }
    library.push(bookInfo);
    document.querySelector('#bookTitle').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    const radioBut = document.querySelector('input[name="read"]:checked');
    radioBut.checked = false;
    localStorage.setItem('library',JSON.stringify(library))

    renderLibrary();

}
function loadLibrary(){
    const storedLibrary = localStorage.getItem('library');
    if (storedLibrary){
        const books = JSON.parse(storedLibrary);
    }
    renderLibrary()
}
window.onload = loadLibrary;
document.getElementById("booksForm").addEventListener("submit",addBook);
