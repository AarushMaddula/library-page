const myLibrary = [];

function Book(title, author, totalPages, haveRead) {
    this.title = title,
    this.author = author,
    this.totalPages = totalPages,
    this.haveRead = haveRead
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

