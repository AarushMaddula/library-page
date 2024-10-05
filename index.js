const myLibrary = [];

function Book(title, author, totalPages, haveRead) {
    this.title = title,
    this.author = author,
    this.totalPages = totalPages,
    this.haveRead = haveRead
}

Book.prototype.toggleReadState = function () {
    this.haveRead = this.haveRead === true ? false : true;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(bookId) {
    myLibrary.pop(bookId);
    loadBooksOnPage();
}

function loadBooksOnPage() {
    const bookContainer = document.querySelector('.book-container');

    bookContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const text = `
        <div class="book-card" data-id="${index}">
            <div class="book-info">
                <div class="book-card-title">
                    ${book.title}
                </div>
    
                <div class="book-card-author">
                    By: ${book.author}
                </div>
    
                <div class="book-card-page-count">
                    ${book.totalPages} pages
                </div>
            </div>

            <div class="book-actions">
                <button class="book-card-completed-button ${book.haveRead ? "green-button" : ""}">
                    ${book.haveRead ? "Completed!" : "Still reading..."}
                </button>
    
                <button class="red-button">
                    Remove
                </button>
            </div>
        </div>
        `
        bookContainer.innerHTML += text;
    })

    const removeButtons = document.querySelectorAll('.book-card-remove-button');

    removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const bookCard = button.parentElement.parentElement;
        
            removeBookFromLibrary(bookCard.getAttribute('data-id'));
        })
    })

    const readButtons = document.querySelectorAll('.book-card-completed-button');

    readButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const bookCard = button.parentElement.parentElement;
            const bookId = bookCard.getAttribute('data-id');

            const book = myLibrary[bookId];
            book.toggleReadState();
            loadBooksOnPage();
        })
    })


}

const addBookDialog = document.querySelector('.add-book-dialog');
const submitButton = document.querySelector('.submit-button');
const addBookButton = document.querySelector('.add-book-button');
const cancelButton = document.querySelector('.cancel-button');
const form = document.querySelector('form');

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
})

cancelButton.addEventListener("click", (event) => {
    addBookDialog.close();
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const title = formData.get('title');
    const author = formData.get('author_name');
    const pages = formData.get('page_count');
    const have_read = formData.get('have_read') === "on";

    [title, author, pages].forEach((value) => {
        if (!value) return;
    })

    const book = new Book(title, author, pages, have_read);
    addBookToLibrary(book);

    loadBooksOnPage();

    form.reset();

    addBookDialog.close();
})

