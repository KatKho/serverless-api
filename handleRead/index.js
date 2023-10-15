'use strict';

const dynamoose = require('dynamoose');

// Define the schema for dogs
const dogSchema = new dynamoose.Schema({
  id: Number,
  Name: String,
  Breed: String,
});

// Create the Model
const dogModel = dynamoose.model('dog-breeds', dogSchema);

exports.handler = async (event) => {
  let results = null;
  let response = {
    statusCode: 500,
    body: JSON.stringify('SERVER ERROR'),
  };

  try {
    if (event.pathParameters && event.pathParameters.id) {
      let list = await dogModel.query('id').eq(event.pathParameters.id).exec();
      results = list[0];
    } else {
      results = await dogModel.scan().exec();
    }
    response.body = JSON.stringify(results);
    response.statusCode = 200;
  } catch(e) {
    response.body = JSON.stringify(e);
  }

  return response;
};
