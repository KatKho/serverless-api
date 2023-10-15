'use strict';

const { handler } = require('./index.js');

describe('Testing the readOneBreed lambda', () => {
  // Test for retrieving a single dog by ID
  test('Should return a single dog by ID', async () => {
    let response = await handler({ pathParameters: { id: '1' }}); 
    expect(response.statusCode).toEqual(200);
    let responseBody = JSON.parse(response.body);
    expect(responseBody.Name).toBeTruthy();
  });

  // Test for retrieving a non-existent dog by ID
  test('Should return 404 for a non-existent dog by ID', async () => {
    let response = await handler({ pathParameters: { id: '9999' }}); 
    expect(response.statusCode).toEqual(404);
  });
});