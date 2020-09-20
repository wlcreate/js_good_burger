  //Implement Your Code Here
let burgerMenuDiv = document.querySelector("#burger-menu")
let burgerOrderUl = document.querySelector("ul#order-list")
let customForm = document.querySelector("form#custom-burger")

fetch("http://localhost:3000/burgers")
.then(response => response.json())
.then(burgerArray => {
  burgerArray.forEach(burgerObj => {
    turnBurgerToDiv(burgerObj)
  })
})

let turnBurgerToDiv = (burger) => {
  let burgerDiv = document.createElement("div")
  burgerDiv.classList.add("burger")

  let burgerName = document.createElement("h3")
  burgerName.classList.add("burger-title")
  burgerName.innerText = burger.name

  let burgerImg = document.createElement("img")
  burgerImg.src = burger.image
  burgerImg.alt = `Image of ${burger.name}`

  let burgerDescP = document.createElement("p")
  burgerDescP.classList.add("burger-description")
  burgerDescP.innerText = burger.description

  let burgerOrderButton = document.createElement("button")
  burgerOrderButton.classList.add("button")
  burgerOrderButton.innerText = "🍔 Add to Order 🍔"

  let burgerRemoveButton = document.createElement("button")
  burgerRemoveButton.innerText = "Remove from Menu"

  burgerDiv.append(burgerName, burgerImg, burgerDescP, burgerOrderButton, burgerRemoveButton)
  burgerMenuDiv.append(burgerDiv)

  // Add to Your Order List
  burgerOrderButton.addEventListener("click", (evt) => {
    let orderLi = document.createElement("li")
      orderLi.innerText = burger.name

    let removeButton = document.createElement("button")
      removeButton.innerText = "remove"

    orderLi.append(removeButton)
    burgerOrderUl.append(orderLi)

    // remove button to delete from "You Order List"
    removeButton.addEventListener("click", (evt) => {
      orderLi.remove()
    })
  })

  // Remove from Menu (database)
  burgerRemoveButton.addEventListener("click", (evt) => {
    // delete from backend
    fetch(`http://localhost:3000/burgers/${burger.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(emptyObj => {
      burgerDiv.remove() // delete from DOM
    })
  })
}

customForm.addEventListener("submit", (evt) => {
  evt.preventDefault()
  let newName = evt.target.name.value
  let newDesc = evt.target.description.value
  let newImg = evt.target.url.value

  fetch("http://localhost:3000/burgers", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      description: newDesc,
      image: newImg
    })
  })
  .then(response => response.json())
  .then(newBurgerObj => {
    let customOrderLi = document.createElement("li")
      customOrderLi.innerText = newBurgerObj.name

    let removeButton = document.createElement("button")
      removeButton.innerText = "remove"

    customOrderLi.append(removeButton)
    burgerOrderUl.append(customOrderLi)

    turnBurgerToDiv(newBurgerObj)
    evt.target.reset()

    removeButton.addEventListener("click", (evt) => {
      customOrderLi.remove()
    })
  })
})