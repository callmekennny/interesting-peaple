const cookie = require("cookie");

const handler = async function (incoming) {
  const loginCookie = cookie.serialize("people", "none", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": loginCookie,
      Location: "/",
    },
    body: JSON.stringify({ success: true }),
  };
};

module.exports = { handler };
