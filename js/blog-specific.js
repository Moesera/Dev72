// ID fetch
const queryString = document.location.search;
const id = new URLSearchParams(queryString).get("id");
console.log(id);
//HTML elements
const specificContainer = document.querySelector(".post-specific-content");
const pageHeaderTxt = document.querySelector(".page-header_txt");
const aboutContainer = document.querySelector(".post-sidebar");

// API url
const acfFormat = "?acf_format=standard";
const apiUrl = "https://landson.site/thefunction/wp-json/wp/v2/posts/" + id + acfFormat;

async function fetchDetails() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);
    createHtml(data);
  } catch (error) {
    console.warn(error);
  }
}

fetchDetails();

async function createHtml(blogDetails) {
  pageHeaderTxt.innerText = `${blogDetails.title.rendered}`;

  specificContainer.innerHTML += `<div class="post-header_img">
                                    <img src="${blogDetails.acf.banner_img}" />
                                    </div>
                                    <div class="content_text-box">${blogDetails.acf.content}</div>`;

  aboutContainer.innerHTML = `<h2>${blogDetails.acf.author_name}</h2>
                              <div class="author-img">
                              <img src="${blogDetails.acf.author_img}" />
                              </div>
                              <h3>About</h3>
                              <p>${blogDetails.acf.about_author}</p>`;
}
