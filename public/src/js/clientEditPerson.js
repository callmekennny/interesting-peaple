const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const editForm = document.getElementById("edit-form");

async function sendPersonID() {
  const idPromise = await fetch("/.netlify/functions/getOnePerson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const person = await idPromise.json();

  console.log(person);

  if (!person.name) {
    window.location = "/";
  }

  document.getElementById("name").value = person.name;
  document.getElementById("birthday").value = person.birthDay;
  document.getElementById("occupation").value = person.label;
  document.getElementById("description").value = person.description;

  editForm.classList.remove("loading-form");

  document.getElementById("name").focus();
}

sendPersonID();

async function handleSubmit(e) {
  e.preventDefault();

  const person = {
    id,
    name: document.getElementById("name").value,
    birthDay: document.getElementById("birthday").value,
    occupation: document.getElementById("occupation").value,
    description: document.getElementById("description").value,
  };

  editForm.classList.add("loading-form");

  const request = await fetch("/.netlify/functions/savingEdits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });

  const response = await request.json();

  if (response.success) {
    window.location = "/";
    return;
  }

  console.log("error");
}

editForm.addEventListener("submit", handleSubmit);
