// retreiving the session object as it is which is coming in from addToCart.js
// parsing the string to array
let r = JSON.parse(sessionStorage.getItem("food-data")).session_data;

// main method
// const fname = () => {} <- es6
// function fname () {} <- es5
const init = () => {
  // grabbing necessary fields
  let order_details = document
    .querySelector(".order-details")
    .querySelector("tbody");
  let food_name_input = document.querySelector(".food_name");
  let food_price_input = document.querySelector(".food_price");
  let food_header_string = "";
  let food_price_string = "";
  // r is retrieved as an array
  r.forEach((item) => {
    // appendin the items to one single string to fit in excell sheet
    food_header_string += item["food-header"] + ", ";
    food_price_string += item["food-price"] + ", ";
    // defining an html template to show the cart items on screen
    // line 25, 26 data coming from previous session object
    let html = `
      <tr>
        <td>${item["food-header"]}</td>
        <td>${item["food-price"]}</td>
      </tr>
    `;
    // appending the output to the screen
    order_details.innerHTML += html;
  });
  // order.html line 75, setting the value for hidden inputs
  food_name_input.value = food_header_string;
  food_price_input.value = food_price_string;
  // google sheets
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyzJpt6HAHMfuvUMzWWftGqwmD0dv_dtrdVipFFl_QnU8Pdg7R4iWxWwHXi1mVWBtz3/exec";
  const form = document.querySelector("form");
  // handling form submit event
  form.addEventListener("submit", (e) => {
    // preventing the form from refreshing after a successful submit, overriding the default behaviour
    e.preventDefault();
    // defining the cors header to send data
    // CORS = Cross Origin Resource Sharing allows secure HTTP communication
    let headers = {
      "Access-Control-Allow-Origin": "*",
    };
    // using a third party library called 'axios'
    // refer - https://www.npmjs.com/package/axios
    // scriptURL = excell app deployment
    // new FormData(form) = getting the form submit FormData
    // headers = CORS header
    // .then() = promise resolution, successfull code block
    // .catch() = promise pending, unsuccessfull code block
    // webdevsimplified <- promises in 10 minutes, playlist 'learn x in y minutes'
    axios
      .post(scriptURL, new FormData(form), headers)
      .then(function (response) {
        // sending a redirect on successful request
        window.location.pathname = "Continue.html";
      })
      .catch(function (error) {
        // loggin an error
        console.log(error);
      });
  });
};
// calling the main method
init();
