// HTML element targets
const carouselContainer = document.querySelector("#main-slider");
const popularPostContainer = document.querySelector(".popular-content_wrapper");
const newPostContainer = document.querySelector(".new-content_wrapper");
const carouselRight = document.querySelector("#carousel-next");
const carouselLeft = document.querySelector("#carousel-prev");

// Carousel items
let currentPage = 0;

// Url addons to fetches
const popularPostsId = 3;
const newPostsId = 4;
const getCategory = "&categories=";
const urlEmbed = "&_embed";

// Url fetches
const apiUrl = "https://landson.site/thefunction/wp-json/wp/v2/posts?acf_format=standard&per_page=20";
const categoryUrl = apiUrl + urlEmbed + getCategory;

let sliderPerPage = 4;
async function fetchApi() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    createCarousel(data);
  } catch (error) {
    console.warn(error);
  }
}

fetchApi();

// Creating sliders
async function createCarousel(blogs) {
  for (let i = 0; i < blogs.length; i++) {
    carouselContainer.innerHTML += `<a href="blog-specific.html?id=${blogs[i].id}" class="blog-itm-box">
                          <h3>${blogs[i].title.rendered}</h3>
                          <div class="slider-img_box">
                          <img class="slider-img" src="${blogs[i].acf.featured_img.url}" alt="${blogs[i].acf.featured_img.name}"/>
                          </div>
                          </a>`;
  }

  const sliderItem = carouselContainer.getElementsByClassName("blog-itm-box");

  carouselRight.addEventListener("click", () => {
    carouselContainer.append(sliderItem[0]);
  });

  carouselLeft.addEventListener("click", () => {
    carouselContainer.prepend(sliderItem[sliderItem.length - 1]);
  });
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
                                    <img class="filtered-img" src="${category[i].acf.banner_img.url}" alt="${category[i].acf.banner_img.name}" />
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
                                <img class="filtered-img" src="${category[i].acf.banner_img.url}" alt="${category[i].acf.banner_img.name}" />
                                </div>
                                <p>${category[i].acf.description}</p>
                                </a>`;
    }
  } catch (error) {
    console.warn(error);
  }
}

fetchNewPosts();
