const loadButton = document.getElementById("load-btn-primary");
const list = document.getElementsByClassName("list-group")[0];
const theCart = document.getElementsByClassName("list-group")[1];
const addToCartButton = document.querySelectorAll("add-to-cart");

const removeCard = (event) => {
    const currentSkipButton = event.currentTarget;
    currentSkipButton.parentElement.classList.add("display-none");
};

const modifyCard = (event) => {
    const currentButton = event.currentTarget;
    currentButton.parentElement.classList.add("red-color");
}

const bookList = async function() {
    const fetchBooks = await fetch("https://striveschool-api.herokuapp.com/books");
    const result = await fetchBooks.json();
    const books = await result.map(function(book) {
        const bookTitles = book.title;
        return bookTitles;
    })
    books.forEach(element => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `<div data-header>${element}</div>` + `<button type="button" class="btn btn-secondary d-flex justify-self-end add-to-cart" onclick='modifyCard(event)'>Add to cart</button>` + `<button type="button" class="btn btn-danger d-flex justify-self-end add-to-cart" onclick='removeCard(event)'>Skip</button>`;
        list.appendChild(listItem);
});
}

loadButton.addEventListener('click', bookList);