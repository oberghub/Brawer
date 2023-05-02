// addUser.js
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

exports.handler = async (event) => {
  console.log("event.body:", event.body); // Add this line
  const user = JSON.parse(event.body);
  const _id = uuid.v4();
  const params = {
    TableName: "users",
    Item: {
      _id: user._id || _id,
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      role: user.role || "user",
      favouriteBooks: user.favouriteBooks || [],
    },
  };

  try {
    await dynamo.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
