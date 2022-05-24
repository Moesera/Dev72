// HTML element targets
const carouselContainer = document.querySelector(".cards-container");
const popularPostContainer = document.querySelector(".popular-content_wrapper");
const newPostContainer = document.querySelector(".new-content_wrapper");
const carouselRight = document.querySelector(".fa-caret-right");
const carouselLeft = document.querySelector(".fa-caret-left");

// Carousel items
let sliderPerPage = 4;
let currentPage = 0;

// Url addons to fetches
const popularPostsId = 3;
const newPostsId = 4;
const getCategory = "&categories=";
const urlEmbed = "&_embed";

// Url fetches
const apiUrl = "https://landson.site/thefunction/wp-json/wp/v2/posts?acf_format=standard&per_page=20";
const categoryUrl = apiUrl + urlEmbed + getCategory;

async function fetchApi() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    let page = Math.ceil(data.length / sliderPerPage - 1);
    console.log(page);

    carouselRight.addEventListener("click", () => {
      if (currentPage === page) {
        carouselRight.disabled;
      } else {
        currentPage += 1;
        createCarousel(data);
      }
    });
    carouselLeft.addEventListener("click", () => {
      if (currentPage === -0) {
        carouselLeft.classList.add("hidden");
      } else {
        currentPage -= 1;
        createCarousel(data);
      }
    });

    createCarousel(data);
  } catch (error) {
    console.warn(error);
  }
}

fetchApi();

async function createCarousel(data) {
  carouselContainer.innerHTML = "";

  let beginning = sliderPerPage * currentPage;
  let end = beginning + sliderPerPage;
  let paginatedItems = data.slice(beginning, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let carouselItems = paginatedItems[i];
    console.log(carouselItems);
    carouselContainer.innerHTML += `<a href="blog-specific.html?id=${carouselItems.id}" class="blog-itm-box">
                          <h3>${carouselItems.title.rendered}</h3>
                          <div class="slider-img_box">
                          <img class="slider-img" src="${carouselItems.acf.featured_img}" />
                          </div>
                          </a>`;
  }
}

// index.html category fetches
async function fetchPopularPosts() {
  try {
    const response = await fetch(categoryUrl + popularPostsId);
    const category = await response.json();

    for (let i = 0; i < category.length; i++) {
      popularPostContainer.innerHTML += `<a href="blog-specific.html?id=${category[i].id}" class="content-box">
                                    <h4>${category[i].title.rendered}</h4>
                                    <div class="filtered-img_box">
                                    <img class="filtered-img" src="${category[i].acf.banner_img}" />
                                    </div>
                                    <p>${category[i].acf.description}</p>
                                    </a>`;
    }
  } catch (error) {
    console.warn(error);
  }
}

fetchPopularPosts();

async function fetchNewPosts() {
  try {
    const response = await fetch(categoryUrl + newPostsId);
    const category = await response.json();

    for (let i = 0; i < category.length; i++) {
      newPostContainer.innerHTML += `<a href="blog-specific.html?id=${category[i].id}" class="content-box">
                                <h4>${category[i].title.rendered}</h4>
                                <div class="filtered-img_box">
                                <img class="filtered-img" src="${category[i].acf.banner_img}" />
                                </div>
                                <p>${category[i].acf.description}</p>
                                </a>`;
    }
  } catch (error) {
    console.warn(error);
  }
}

fetchNewPosts();
