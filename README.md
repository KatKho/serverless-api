# Serverless REST API using AWS

This project involves the creation of a serverless REST API using AWS Cloud Services. The API will be designed to manage a single resource, using a chosen domain model, and will be constructed using various AWS components.

## Routing: API Gateway

  - `POST /dogs`: Insert a new record into the database by providing a JSON body.
    - Returns an object representing the inserted record, identified by its ID.
  - `GET /dogs`: Retrieve an array of objects representing all records in the database.
  - `GET /dogs/##`: Retrieve an object representing a specific record by its ID (##).
  - `PUT /dogs/##`: Update a specific record in the database by providing a JSON body and the record's ID (##).
    - Returns an object representing the updated record.
  - `DELETE /dogs/##`: Remove a specific record from the database by providing its ID (##).
    - Returns an empty object.


## URLs

- [PR 1](https://github.com/KatKho/serverless-api/pull/1)
- [UML](./UML18.png)