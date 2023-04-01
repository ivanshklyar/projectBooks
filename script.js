class Book {
    constructor(title, author, description, genre, pages, status, id) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.genre = genre;
        this.pages = pages;
        this.status = status;
        this.id = id;
    }

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        } return books;
    }

    static addBook(book) {
        const books = Book.getBooks();
        books[books.length] = book;
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(id) {
        const books = Book.getBooks();

        const newBooks = books.filter((book) => book.id !== id);
        newBooks.forEach((object, index) => {
            object.index = index + 1;
        });
        localStorage.setItem('books', JSON.stringify(newBooks));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="book">
        <div class="list-txt">
        <p>"${book.title}"</p>
        <p>by</p>
        <p>${book.author}</p>
        <p>${book.description}</p>
        <p>${book.genre}</p>
        <p>${book.pages}</p>
        <p>${book.status}</p>
        
        </div>
        <button id=${book.id} type="submit" class="remove">Remove</button>
        </div>
        `;

        list.appendChild(listItem);
    }

    static displayBooks() {
        const books = Book.getBooks();

        books.forEach((book) => Book.addBookToList(book));
    }

    static deleteBook(targetel) {
        if (targetel.classList.contains('remove')) {
            targetel.parentElement.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', Book.displayBooks);

const form = document.querySelector('#form');

form.addEventListener('submit', () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const description = document.querySelector('#description').value;
    const genre = document.querySelector('#genre').value;
    const pages = document.querySelector('#pages').value;
    const status = document.querySelector('#status').value;
    const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    const book = new Book(title, author, description, genre, pages, id);

    Book.addBookToList(book);

    Book.addBook(book);

    form.reset();
});

document.querySelector('#book-list').addEventListener('click', (e) => {
    Book.deleteBook(e.target);

    Book.removeBook(e.target.id);
});

const addNewList = document.getElementById('add-new-book');
const openForm = document.getElementById('open-form');
const addNew = document.getElementById('form-sec');
const bookList = document.getElementById('add-book');


function showForm() {
    addNew.classList.remove('none');
    bookList.classList.add('none');

}

function showBook() {
    bookList.classList.remove('none');
    addNew.classList.add('none');

}



openForm.addEventListener('click', showForm);

addNewList.addEventListener('click', showBook);


const dateTime = document.getElementById('date');

/* global luxon, luxon */

const date = () => {
    window.addEventListener('load', () => {
        const { DateTime } = luxon;
        this.today = DateTime.now();
        dateTime.textContent = this.today.toLocaleString(DateTime.DATETIME_MED);
    });
};

date();