const { MongoClient } = require("mongodb");
const uri = process.env.CONN_STRING;

const handler = async () => {
  const client = new MongoClient(uri);

  await client.connect();
  const people = await client.db().collection("details").find().toArray();
  client.close();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(people),
  };
};

module.exports = { handler };
