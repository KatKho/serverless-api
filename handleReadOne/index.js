'use strict';

const dynamoose = require('dynamoose');

const dogSchema = new dynamoose.Schema({
  id: Number,
  Name: String,
  Breed: String,
});

const dogModel = dynamoose.model('dog-breeds', dogSchema);

exports.handler = async (event) => {
  let results = null;
  let response = {
    statusCode: 500,
    body: JSON.stringify('SERVER ERROR'),
  };

  try {
    if (event.pathParameters && event.pathParameters.id) {
      const dogId = Number(event.pathParameters.id);
      results = await dogModel.get(dogId);

      if (!results) {
        response.statusCode = 404;
        response.body = JSON.stringify('Dog not found');
        return response;
      }
      response.body = JSON.stringify(results);
      response.statusCode = 200;
      return response;
    }
    
    results = await dogModel.scan().exec();
    response.body = JSON.stringify(results);
    response.statusCode = 200;
  } catch(e) {
    response.body = JSON.stringify(e);
  }

  return response;
};
