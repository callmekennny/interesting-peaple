const addForm = document.getElementById("add-person-form");

async function handleSubmit(e) {
  e.preventDefault();

  const person = {
    name: document.getElementById("name").value,
    birthDay: document.getElementById("birthday").value,
    label: document.getElementById("occupation").value,
    description: document.getElementById("description").value,
  };

  const request = await fetch("/.netlify/functions/createPerson", {
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

addForm.addEventListener("submit", handleSubmit);
