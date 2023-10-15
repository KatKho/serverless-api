
const {handler} = require('./index'); 
const dynamoose = require('dynamoose');

const dogSchema = new dynamoose.Schema({
  id: Number,
  Name: String,
  Breed: String,
});

// Create the Model
const dogModel = dynamoose.model('dog-breeds', dogSchema);

describe("Lambda Handler", () => {
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return dog details if dog exists", async () => {
    dogModel.get.mockResolvedValue({ id: 1, name: "Buddy" });
    
    const event = {
      pathParameters: {
        id: '1'
      }
    };

    const result = await handler.handler(event);
    
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ id: 1, name: "Buddy" }));
  });

  it("should return 404 if dog does not exist", async () => {
    dogModel.get.mockResolvedValue(null);
    
    const event = {
      pathParameters: {
        id: '2'
      }
    };

    const result = await handler.handler(event);

    expect(result.statusCode).toBe(404);
    expect(result.body).toBe(JSON.stringify('Dog with specified ID not found'));
  });

  it("should return 400 for invalid request", async () => {
    const result = await handler.handler({});

    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(JSON.stringify('Invalid request'));
  });

});
