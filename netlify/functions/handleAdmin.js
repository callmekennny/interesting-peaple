const cookie = require("cookie");
const { MongoClient } = require("mongodb");
const uri = process.env.CONN_STRING;

function generatePeopleHTML(people) {
  let peapleHTML = '<div class="peaple-grid" id="people">';

  peapleHTML += people
    .map((person) => {
      return `<div class="person">
    <div class="card-image">
      <img src="/src/assets/peaple/bruce-lee.jpg" alt="" />
    </div>

    <article class="card-text">
      <h3 class="name">${person.name ?? "Cillian Murphy"}</h3>

      <div class="admin-btns">
        <a href="/admin/edit-person?id=${person._id}">edit</a>
        <button onClick="handleDelete('${person._id}', this)">delete</button>
      </div
    </article>
  </div>`;
    })
    .join("");

  peapleHTML += "</div>";

  return peapleHTML;
}

const handler = async function (req) {
  const incomingCookies = cookie.parse(req.headers.cookie || "");

  if (incomingCookies?.people === "DtnzVjZZpfHgZyzsETK9A1") {
    // establishing database conn
    const client = new MongoClient(uri);
    await client.connect();
    const people = await client.db().collection("details").find().toArray();
    client.close();

    const peopleHTML = generatePeopleHTML(people);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true, people: peopleHTML }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
