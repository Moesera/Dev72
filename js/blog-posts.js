// API url
const apiUrl = "https://landson.site/thefunction/wp-json/wp/v2/posts?acf_format=standard&per_page=20";

// html elements
const showMoreButton = document.getElementById("showMore");

// Fetch
async function fetchApi() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    let chunks = [];

    for (i = 0; i < result.length; i += 0) {
      chunks.push(result.splice(0, 10));
    }

    add(chunks);
  } catch (error) {
    console.warn(error);
  }
}

fetchApi();

// Creating chunks out of the fetch result.
function add(chunks) {
  const parentContainer = document.querySelector(".container-wrapper");

  const firstArray = chunks[0];
  const secondArray = chunks[1];

  for (let i = 0; i < chunks.length; i++) {
    parentContainer.innerHTML += `<div class="post-container container${i}"></div>`;

    const childContainer = document.querySelector(`.container${i}`);

    if (i > 0) {
      childContainer.classList.add("hide-element");
    }
  }
  createContainerPosts(firstArray, secondArray);
}

function createContainerPosts(firstArray, secondArray) {
  const postContainer = document.querySelector(".container0");
  const hiddenPostContainer = document.querySelector(".container1");
  const buttonTxt = document.getElementById("btn-txt");
  showMoreButton.addEventListener("click", () => {
    hiddenPostContainer.classList.toggle("hide-element");

    if (buttonTxt.innerHTML === "see more") {
      buttonTxt.innerHTML = "see less";
    } else {
      buttonTxt.innerHTML = "see more";
    }
  });

  for (let i = 0; i < firstArray.length; i++) {
    postContainer.innerHTML += `<div class="post-content_box">
                                    <a href="blog-specific.html?id=${firstArray[i].id}">
                                    <h2>${firstArray[i].title.rendered}</h2>
                                    <div class="post-img_box">
                                    <img class="post-img" src="${firstArray[i].acf.banner_img.url}" alt="${firstArray[i].acf.banner_img.name}" />
                                    </div>
                                    <p>${firstArray[i].acf.description}</p>
                                    </a>
                                    </div>`;
  }

  for (let j = 0; j < secondArray.length; j++) {
    hiddenPostContainer.innerHTML += `<div class="post-content_box">
    <a href="blog-specific.html?id=${secondArray[j].id}">
    <h2>${secondArray[j].title.rendered}</h2>
    <div class="post-img_box">
    <img class="post-img" src="${secondArray[j].acf.banner_img.url}" alt="${secondArray[j].acf.banner_img.name}"/>
    </div>
    <p>${secondArray[j].acf.description}</p>
    </a>
    </div>`;
  }
}
