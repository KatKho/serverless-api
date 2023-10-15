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
  let response = {
    statusCode: 500,
    body: JSON.stringify('SERVER ERROR'),
  };

  try {
    // Parse the request body to get the new dog's details
    const { id, Name, Breed } = JSON.parse(event.body);

    // Create a new dog instance
    const newDog = new dogModel({
      id,
      Name,
      Breed,
    });

    // Save the new dog to the database
    await newDog.save();

    response.body = JSON.stringify(newDog);
    response.statusCode = 201;  // 201 Created
  } catch (e) {
    response.body = JSON.stringify(`Error: ${e.message}`);
  }

  return response;
};
