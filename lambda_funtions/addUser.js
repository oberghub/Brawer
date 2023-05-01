const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const user = JSON.parse(event.body);

  const params = {
    TableName: "users",
    Item: {
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
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};