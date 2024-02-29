// this whole program is a mess. will fix itself in time.

const wrapper = document.createDocumentFragment();
const personTemplate = document.querySelector(".peaple-grid-card");
const peopleContainer = document.querySelector(".peaple-grid");

// function that fetch people from database and update UI
const fetchPeople = async function () {
  // fetching people
  const response = await fetch("/.netlify/functions/fetchPeople");
  data = await response.json();

  data.forEach((person) => {
    const clone = personTemplate.content.cloneNode(true);

    // changing template values
    clone.querySelector(".person").dataset.label = person.label;
    clone.querySelector("h3").textContent = person.name;
    clone.querySelector(".birthday").textContent = person.birthDay;
    clone.querySelector(".occupation").textContent = person.occupation;
    clone.querySelector(".description").textContent = person.description;

    // handle fallback
    if (!person.img) person.img = "./src/assets/peaple/bruce-lee.jpg";
    clone.querySelector("img").src = person.img;

    wrapper.appendChild(clone);
  });

  peopleContainer.appendChild(wrapper);
};

fetchPeople();

// handling filtering people when btn click
const filterbtnList = document.querySelector(".filter-btns-list");

filterbtnList.addEventListener("click", async (e) => {
  const filter = e.target.dataset.filter;

  // check if we're on filter-btn
  if (e.target.classList.contains("filter-btn")) {
    // remove existing classes
    document.querySelectorAll(".filter-btn").forEach((button) => {
      return button.classList.remove("filter-btn--active");
    });

    // adding class to target
    e.target.classList.add("filter-btn--active");

    // show and hide depending the filter
    document.querySelectorAll(".person").forEach((person) => {
      if (person.dataset.label == filter || filter == "all") {
        person.style.display = "flex";
      } else {
        person.style.display = "none";
      }
    });
  }
});
