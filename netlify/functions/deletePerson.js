const { MongoClient, ObjectId } = require("mongodb");
const isAdmin = require("../../helpers/isAdmin");
const uri = process.env.CONN_STRING;

const handler = async (req) => {
  const body = JSON.parse(req.body);

  if (isAdmin(req)) {
    const client = new MongoClient(uri);
    await client.connect();
    await client
      .db()
      .collection("details")
      .deleteOne({ _id: new ObjectId(body.id) });
    client.close();

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
