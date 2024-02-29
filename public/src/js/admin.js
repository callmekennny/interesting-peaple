const logoutBtn = document.getElementById("logout-btn");
const peopleGridContainer = document.getElementById("people-grid-container");

async function checkLoginCookie() {
  const response = await fetch("/.netlify/functions/handleAdmin");
  const data = await response.json();

  if (data.success) {
    peopleGridContainer.innerHTML = data.people;
  } else {
    window.location = "/login";
  }
}

checkLoginCookie();

logoutBtn.addEventListener("click", async (e) => {
  const deleteCookie = await fetch("/.netlify/functions/handleLogout");

  window.location = "/";
});

async function handleDelete(id, el) {
  el.closest(".person").remove();

  const delReq = await fetch("/.netlify/functions/deletePerson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  const response = delReq.json();
}
