'use strict';

const { handler } = require('./index.js');

describe('Testing the readBreed lambda', () => {
  test('Should return a list of dogs', async () => {
    let response = await handler({pathParameters: {}});
    expect(response.statusCode).toEqual(200);
    let responseBody = JSON.parse(response.body);
    console.log(responseBody);
    expect(responseBody[0].Name).toBeTruthy();
  });
});