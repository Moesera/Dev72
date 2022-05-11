// Url addons to fetches
const popularPostsId = 3;
const newPostsId = 4;
const getCategory = "&categories=";
const urlEmbed = "&_embed";

// Url fetches
const apiUrl = "https://landson.site/thefunction/wp-json/wp/v2/posts?acf_format=standard";
const categoryUrl = apiUrl + urlEmbed + getCategory;

// HTML element targets
const carouselContainer = document.querySelector(".cards-container");
const popularPostContainer = document.querySelector(".popular-content_wrapper");
const newPostContainer = document.querySelector(".new-content_wrapper");

async function fetchApi() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    createCarousel(data);
    console.log(data);
  } catch (error) {
    console.warn(error);
  }
}

fetchApi();

async function createCarousel(data) {
  for (let i = 0; i < data.length; i++) {
    carouselContainer.innerHTML += `<a href="blog-specific.html?id=${data.id}" class="blog-itm-box">
                          <h3 class="h3-section_heading" >${data[i].title.rendered}</h3>
                          <p>${data[i].acf.description}</p>
                          <div class="slider-img_box">
                          <img class="slider-img" src="${data[i].acf.featured_img}" />
                          </div>
                          </a>`;
  }
}

// index.html category fetches
async function fetchPopularPosts() {
  try {
    const response = await fetch(categoryUrl + popularPostsId);
    const category = await response.json();

    console.log(category);

    for (let i = 0; i < category.length; i++) {
      popularPostContainer.innerHTML += `<a href="blog-specific.html?id=${category.id}" class="content-box">
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

    console.log(category);
    for (let i = 0; i < category.length; i++) {
      newPostContainer.innerHTML += `<a href="blog-specific.html?id=${category.id}" class="content-box">
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
