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
        // Ensure pathParameters exist and id is provided
        if (event.pathParameters && event.pathParameters.id) {
            // Convert the id to a number
            const dogId = Number(event.pathParameters.id);
            console.log(`Fetching dog with ID: ${dogId}`);

            let existingDog = await dogModel.get(dogId);

            if (existingDog) {
                const body = JSON.parse(event.body);

                // Update the dog's attributes with the values from the request body
                existingDog.Name = body.Name || existingDog.Name;
                existingDog.Breed = body.Breed || existingDog.Breed;

                await existingDog.save(); 

                response.body = JSON.stringify(existingDog);
                response.statusCode = 200;
            } else {
                response.body = JSON.stringify('Dog not found');
                response.statusCode = 404;
            }
        } else {
            response.body = JSON.stringify('Invalid request');
            response.statusCode = 400;
        }
    } catch(e) {
        console.error(`Error processing request: ${e.message}`);
        response.body = JSON.stringify(e.message);
    }

    return response;
};
