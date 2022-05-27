/* targeting individual classes
if (event.target.id === "email") {
  if (checkEmailValidation(email.value)) {
    emailError.style.backgroundColor = "darkgreen";
  } else {
    emailError.style.backgroundColor = "darkred";
  }
}
*/

// // checking screen width before splitting them up into chunks.

// let sliderPerPage = checkScreenWidth(sliders);
// console.log(sliderPerPage);
// // checking how many pages to create.

// //set up and slice.
// let beginning = sliderPerPage * currentPage;
// let end = beginning + sliderPerPage;
// let paginatedItems = data.slice(beginning, end);

// // Component that check screen size and change slider amount with screen width.
// function checkScreenWidth() {
//   if (window.matchMedia("(min-width: 1100px)").matches) {
//     return 4;
//   } else {
//     return 2;
//   }
// }

// // Checking when screen size changes.
// window.addEventListener("resize", () => {
//   if (window.matchMedia("(min-width: 1100px)").matches) {
//     createCarousel(data, 4);
//   } else {
//     createCarousel(data, 2);
//   }
// });

// //Getting size of the screen at the moment on load.
// let sliderPerPage = checkScreenWidth();

// // Carousel arrows hide or show.
// let page = Math.ceil(data.length / sliderPerPage - 1);
// console.log(page);
