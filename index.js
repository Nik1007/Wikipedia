let searchInputEl = document.getElementById("searchInput");
let spinnerElement = document.getElementById("spinner");

let searchResultsEl = document.getElementById("searchResults");
searchResults.classList.add("search-results");

function create(Obj) {
  let resultItem = document.createElement("div");
  resultItem.classList.add("result-item");
  searchResultsEl.appendChild(resultItem);

  let titleElement = document.createElement("a");
  titleElement.classList.add("result-title");
  titleElement.href = Obj.link;
  titleElement.textContent = Obj.title;
  resultItem.appendChild(titleElement);

  let breakElement = document.createElement("br");
  resultItem.appendChild(breakElement);

  let linkElement = document.createElement("a");
  linkElement.classList.add("result-url");
  linkElement.href = Obj.link;
  linkElement.textContent = Obj.link;
  resultItem.appendChild(linkElement);

  let breakEl = document.createElement("br");
  resultItem.appendChild(breakEl);

  let descriptionElement = document.createElement("p");
  descriptionElement.classList.add("link-description");
  descriptionElement.textContent = Obj.description;
  resultItem.appendChild(descriptionElement);
}

function createAndAppend(jsonObj) {
  spinnerElement.classList.toggle("d-none");
  for (let obj of jsonObj.search_results) create(obj);
}

function wikiSearch(key) {
  options = {
    method: "GET",
  };
  fetch("https://apis.ccbp.in/wiki-search?search=" + key, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObj) {
      console.log(jsonObj);
      createAndAppend(jsonObj);
    });
}

searchInputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    spinnerElement.classList.toggle("d-none");
    searchResultsEl.textContent = "";
    wikiSearch(searchInputEl.value);
  }
});
