let pictures = [];
let pictPerPage = 3;
let totalPageCount = 0;
let currentPage = 1;
const section = document.querySelector("#pictures");
const pagination = document.querySelector(".pagination");
const orderSelect = document.querySelector("#orderBy");
orderSelect.addEventListener("change", () => {
  switch (orderSelect.value) {
    case "0":
      pictures.sort((a, b) => a.id - b.id);
      showPictures();
      break;
    case "1":
      pictures.sort((a, b) => a.likes - b.likes);
      showPictures();
      break;
    case "2":
      pictures.sort((a, b) => a.downloads - b.downloads);
      showPictures();
      break;
  }
});
const makePagination = () => {
  pagination.textContent = "";
  let start = currentPage - 3 > 0 ? currentPage - 3 : 1;
  let end = currentPage + 3;
  for (let i = start; i <= totalPageCount && i <= end; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    pagination.append(li);
    li.addEventListener("click", () => {
      currentPage = i;
      showPictures();
    });
    if (i === currentPage) {
      li.classList.add("active");
    }
  }
};

const showPictures = () => {
  section.textContent = "";
  makePagination();
  pictures
    .slice((currentPage - 1) * pictPerPage, pictPerPage * currentPage)
    .map((item) => {
      const img = document.createElement("img");
      img.setAttribute("src", item.largeImageURL);
      img.classList.add("images");
      section.append(img);
    });
};

const getPictures = async () => {
  pictures = await fetch(
    "https://pixabay.com/api/?key=54464592-05b80f2178467efaa34c2472e&image_type=photo&pretty=true",
  )
    .then((res) => res.json())
    .then((data) => {
      totalPageCount = Math.ceil(data.hits.length / pictPerPage);
      console.log(data.hits);
      return data.hits;
    });
};
getPictures().then(showPictures);
