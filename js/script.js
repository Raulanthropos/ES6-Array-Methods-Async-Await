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

const addToCart = (event) => {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-danger");
    deleteButton.innerText = "❌";
    deleteButton.classList.add("absolute")
    deleteButton.addEventListener('click', removeCard);
    const currentButton = event.currentTarget;
    const clonedNode = currentButton.parentElement.cloneNode(true);
    const childrenOfClone = clonedNode.childNodes;
    childrenOfClone[2].classList.add("noclick");
    childrenOfClone[3].classList.add("noclick");
    clonedNode.append(deleteButton);
    theCart.append(clonedNode);
    const currentListItem = currentButton.parentElement;
    currentListItem.classList.add("selected");
}

const bookList = async function() {
    loadButton.classList.add("display-none");
    const fetchBooks = await fetch("https://striveschool-api.herokuapp.com/books");
    const result = await fetchBooks.json();
    const books = await result.map(element => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `<h3>${element.title}</h3>` + `<img src="${element.img}" style="width: 80%"/>` + `<button type="button" class="btn btn-secondary d-flex justify-self-end add-to-cart" onclick="addToCart(event)">Add to cart 🛒</button>` + `<button type="button" class="btn btn-danger d-flex justify-self-end add-to-cart" onclick='removeCard(event)'>Skip</button>`;
        list.appendChild(listItem);
})
    theCart.innerHTML += `<h2 style="text-align: center;">The cart</h2>`;
    theCart.classList.add("border");
}

loadButton.addEventListener('click', bookList);