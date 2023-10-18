"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const header = document.querySelector(".header");

//Creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML =
  'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it </button>';

header.prepend(message);
//header.append(message);

//header.before(message)
//header.after(message)

//Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

//styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

/** we can only get a style that we have created inline like
 *
 * console.log(message.style.backgroundColor) and not console.log(message.style.height)
 */

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

// REading Attributed ( attributes of <img> are src, alt, class)
/**  Reading standard attributes */
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className); //nav__logo
console.log(logo.src); //https://3zw7hf.csb.app/img/logo.png
console.log(logo.getAttribute("src")); //img/logo.png

//Non-standard attributes

console.log(logo.designer); // undefined
console.log(logo.getAttribute("designer")); // PAnkaj singh

// Setting the attributes
logo.alt = "Pankaj singh logo";
console.log(logo.alt); //Pankaj singh logo

logo.setAttribute("company", "bankist");

console.log("just adding a line")
