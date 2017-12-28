import * as AWS from "aws-sdk";

const dynamodb: AWS.DynamoDB = new AWS.DynamoDB({region: "eu-west-1", endpoint: "http://localhost:8000"});

const params = {
  TableName : "test-table",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH"}
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});
