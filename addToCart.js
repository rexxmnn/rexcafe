// blank array which will be pushed to the browser session
let session_data = [];
// setting the empty array to session so that it can be updated later
sessionStorage.setItem("food-data", JSON.stringify({ session_data: [] }));
// getting the addToCart buttons as an HTMLObject / HTMLCollection
const buttons = document.getElementsByClassName("btn-primary");
// slicing the HTMLCollection to fit in an array because the array will be looped over
const button_array = [].slice.call(buttons);

// main method
const addToCart = (button) => {
  // grabbing all fields required to create a session object
  let parent = button.parentElement;
  let header = parent.querySelector("h4").textContent;
  let price = parent.querySelector(".food-price").textContent;
  // defining a custom session object for food-details
  let foodObject = {
    "food-header": header,
    "food-price": price,
  };
  // retrieval of browser session, it will by default come in a string which is why JSON.parse() is used to implement an object
  let session_data = JSON.parse(sessionStorage.getItem("food-data"))
    .session_data;
  // pushing the created food-details object into the session_data at line 2
  session_data.push(foodObject);
  // pushin ght entire array as a string into the session // JSON.stringify()
  sessionStorage.setItem("food-data", JSON.stringify({ session_data }));
  // alert message for user confirmations
  alert(`${header} added ! Cart length : ${session_data.length}`);
};

// event listener to add items to cart
button_array.forEach((button) => {
  button.addEventListener("click", () => addToCart(button));
});
