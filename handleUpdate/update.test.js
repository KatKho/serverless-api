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
        if (event.pathParameters && Number(event.pathParameters.id)) {
            const dogId = Number(event.pathParameters.id);

            // Check if dog with given ID exists in the table
            const dogExists = await dogModel.get(dogId);
            console.log("Returned result from get:", dogExists);

            if (dogExists) {
                await dogModel.delete(dogId);
                response.body = JSON.stringify('Dog deleted successfully');
                response.statusCode = 200;
            } else {
                response.body = JSON.stringify('Dog with specified ID not found');
                response.statusCode = 404;
            }

        } else {
            response.body = JSON.stringify('Invalid request');
            response.statusCode = 400;
        }
    } catch (e) {
        console.error("Error:", e);
        response.body = JSON.stringify(e.message);
    }
    return response;
};
