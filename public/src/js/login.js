const loginForm = document.getElementById("login-form");
const usernameElement = document.querySelector(".login-username");
const passwordElement = document.querySelector(".login-password");

async function handleLoginForm(e) {
  e.preventDefault();

  const postFormData = await fetch("/.netlify/functions/handleLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameElement.value,
      password: passwordElement.value,
    }),
  });

  usernameElement.value = "";
  passwordElement.value = "";

  const data = await postFormData.json();

  if (data.success) {
    window.location = "/admin";
  } else {
    console.log("wron credentials, retry");
  }
}

loginForm.addEventListener("submit", handleLoginForm);
