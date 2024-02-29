const cookie = require("cookie");

const handler = async function (incoming) {
  const body = JSON.parse(incoming.body);
  const loginCookie = cookie.serialize("people", "DtnzVjZZpfHgZyzsETK9A1", {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  if (body.username == "rabbit" && body.password == "neo") {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": loginCookie,
        Location: "/",
      },
      body: JSON.stringify({ success: true }),
    };
  } else {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: false }),
    };
  }
};

module.exports = { handler };
