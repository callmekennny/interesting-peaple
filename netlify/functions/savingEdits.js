const { MongoClient, ObjectId } = require("mongodb");
const sanitize = require("sanitize-html");
const isAdmin = require("../../helpers/isAdmin");
const uri = process.env.CONN_STRING;

function sanitizeInput(input) {
  return sanitize(input, { allowedTags: [], allowedAttributes: {} });
}

const handler = async (req) => {
  const body = JSON.parse(req.body);

  let person = {
    name: sanitizeInput(body.name),
    birthDay: sanitizeInput(body.birthDay),
    label: sanitizeInput(body.occupation),
    description: sanitizeInput(body.description),
  };

  if (
    person.occupation !== "actor" &&
    person.occupation !== "philosopher" &&
    person.occupation !== "businessman"
  ) {
    person.occupation = "philosopher";
  }

  const client = new MongoClient(uri);
  await client.connect();
  await client
    .db()
    .collection("details")
    .findOneAndUpdate({ _id: new ObjectId(body.id) }, { $set: person });
  client.close();

  if (isAdmin(req)) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true }),
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
