// ID fetch
const queryString = document.location.search;
const id = new URLSearchParams(queryString).get("id");

//HTML elements
const specificContainer = document.querySelector(".post-specific-content");
const pageHeaderTxt = document.querySelector("h1");
const aboutContainer = document.querySelector(".post-sidebar");
const pageTitle = document.querySelector("title");

// API url
const acfFormat = "?acf_format=standard";
const apiUrl = "https://landson.site/thefunction/wp-json/wp/v2/posts/" + id + acfFormat;

async function fetchDetails() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!data) {
      throw new error(error);
    }
    createHtml(data);
    // makeModalContent(data);
  } catch (error) {
    console.log("error" + error);
  }
}

fetchDetails();

async function createHtml(blogDetails) {
  pageHeaderTxt.innerText = blogDetails.title.rendered;
  pageTitle.innerText = "TheFunction | " + blogDetails.title.rendered;

  specificContainer.innerHTML += `<div class="post-header_img">
                                    <img class="open_modal" data-open="imgModal" src="${blogDetails.acf.banner_img}" />
                                    </div>
                                    <div class="content_text-box">${blogDetails.acf.content}</div>`;

  aboutContainer.innerHTML = `<div class="author-name_img">
                              <h2>${blogDetails.acf.author_name}</h2>
                              <div class="author-img">
                              <img class="open_modal" data-open="imgModal" src="${blogDetails.acf.author_img}" />
                              </div>
                              </div>
                              <div class="author-content">
                              <h3>About</h3>
                              <p>${blogDetails.acf.about_author}</p>
                              </div>`;
}

// popup modal feature inspired from https://webdesign.tutsplus.com/tutorials/how-to-build-flexible-modal-dialogs-with-html-css-and-javascript--cms-33500

// Modal HTML elements
const modalContentContainer = document.querySelector(".modal_content");
const openModal = document.querySelectorAll("[data-open]");

// make modal elements in module container
// function makeModalContent(modalImage) {
//   modalContentContainer.innerHTML += `<img data-open="imgModal" src="${modalImage.acf.banner_img}">`;
// }

// event listener for when target is clicked and module should open.
for (const element of openModal) {
  element.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add("modal-visible");
  });
}

// Popup close
document.addEventListener("click", (evnt) => {
  if (evnt.target === document.querySelector(".popup_modal.modal-visible")) {
    document.querySelector("modal.visible").classList.remove(".modal-visible");
  }
});

document.addEventListener("keyup", (evnt) => {
  if (evnt.key === "Escape" && document.querySelector(".popup_modal.modal-visible")) {
    document.querySelector("popup_modal.modal-visible").classList.remove(".modal-visible");
  }
});
