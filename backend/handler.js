const awsServerlessExpress = require("aws-serverless-express");
const app = require("./src/index");

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log("Inside handler");

  return awsServerlessExpress.proxy(server, event, context);
};
