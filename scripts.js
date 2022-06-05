const bookInput = document.getElementById("bookInput");
const submitBtn = document.getElementById("submit");
const bookTable = document.getElementById("book-list");
const bookTableBody = document.querySelector("#book-list tbody");
const popover = document.querySelector(".popover");
const updateBtn = document.querySelector(".update");
const popoverInput = document.querySelector("#read2");
const closeBtnMain = document.querySelector(".close-btn-main");
const closeBtnPop = document.querySelector(".close-btn-pop");
const addBook = document.querySelector("#addBook");
const overlay = document.querySelector(".overlay");
const displayForm = document.querySelector("#form-display");

let myLibrary = [];

const book = {
  init: function (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  },
  info: function () {
    return `
        Book: ${this.title}
        Author: ${this.author}
        Pages: ${this.pages}
        Read: ${this.read}
    `;
  },
};

bookInput.addEventListener("submit", (e) => {
  e.preventDefault();

  displayForm.classList.remove("show-block");

  addBookToLibrary();
  drawList();

  bookInput.elements["title"].value = "";
  bookInput.elements["author"].value = "";
  bookInput.elements["pages"].value = "";
  bookInput.elements["read"].checked = false;
});

function addBookToLibrary() {
  // do stuff here

  const newBook = Object.create(book);

  const title = bookInput.elements["title"].value;
  const author = bookInput.elements["author"].value;
  const pages = bookInput.elements["pages"].value;
  const read = bookInput.elements["read"].checked === true ? "Yes" : "No";

  newBook.init(title, author, pages, read);

  myLibrary.push(newBook);
}

function drawList() {
  bookTableBody.innerHTML = ``;

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.read} <a href="#" class="edit-link">(edit)</a></td>
            <td><button class="remove-btn destructive-cta">Remove</button></td>
        `;

    row.setAttribute("data-index", index);
    bookTableBody.appendChild(row);
  });
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.innerHTML === "Remove") {
    let bookEntry = e.target.closest("tr");
    let bookEntryIndex = bookEntry.getAttribute("data-index");

    myLibrary.splice(bookEntryIndex, 1);
    bookEntry.remove();

    console.log(bookEntry);

    //console.log(e.target.closest("tr"));
  }
});

document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("edit-link")) {
    e.target.parentElement.appendChild(popover);
    popover.classList.add("show");
    const bookEl = e.target.closest("tr").getAttribute("data-index");

    popoverInput.checked = myLibrary[bookEl].read === "Yes" ? true : false;
  }
});

updateBtn.addEventListener("click", (e) => {
  const bookEl = e.target.closest("tr").getAttribute("data-index");

  myLibrary[bookEl].read = popoverInput.checked ? "Yes" : "No";
  drawList();
});

closeBtnPop.addEventListener("click", () => {
  popover.classList.remove("show");
});

addBook.addEventListener("click", () => {
  displayForm.classList.add("show-block");
  popover.classList.remove("show");
});

closeBtnMain.addEventListener("click", () => {
  displayForm.classList.remove("show-block");
});
