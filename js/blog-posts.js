// API url
const apiUrl = "https://landson.site/thefunction/wp-json/wp/v2/posts?acf_format=standard";

// html elements
const postContainer = document.querySelector(".post-container");

// Fetch
async function fetchApi() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    CreateHtmlBlogPage(data);
    console.log(data);
  } catch (error) {
    console.warn(error);
  }
}

fetchApi();

async function CreateHtmlBlogPage(blogPosts) {
  for (let i = 0; i < blogPosts.length; i++) {
    postContainer.innerHTML += `<div class="post-content_box">
                                <a href="blog-specific.html?id=${blogPosts[i].id}">
                                <h2>${blogPosts[i].title.rendered}</h2>
                                <div class="post-img_box">
                                <img class="post-img" src="${blogPosts[i].acf.featured_img}" />
                                </div>
                                <p>${blogPosts[i].acf.description}</p>
                                </a>
                                </div>`;
  }
}
