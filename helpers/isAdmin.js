const cookie = require("cookie");

function isAdmin(req) {
  const incomingCookies = cookie.parse(req.headers.cookie || "");

  if (incomingCookies?.people === "DtnzVjZZpfHgZyzsETK9A1") {
    return true;
  }

  return false;
}

module.exports = isAdmin;
