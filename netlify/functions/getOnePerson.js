const { MongoClient, ObjectId } = require("mongodb");
const isAdmin = require("../../helpers/isAdmin");
const uri = process.env.CONN_STRING;

const handler = async function (req) {
  const body = JSON.parse(req.body);

  if (isAdmin(req)) {
    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      };
    }

    // establishing database conn
    const client = new MongoClient(uri);
    await client.connect();
    const person = await client
      .db()
      .collection("details")
      .findOne({ _id: new ObjectId(body.id) });
    client.close();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
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
