const {MongoClient} = require('mongodb');
const express = require('express');
const { connect, startSession } = require('mongoose');
const cors = require('cors')
const app = express();
app.use(cors())
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express')
const username = 'MongoDB Atlas Username'
const password = 'MongoDB Atlas Password'
const uri = "mongodb+srv://" + username + ":" + password + "@cluster0.xjiegn0.mongodb.net/?retryWrites=true&w=majority";
var client;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node JS API Project',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8080/'
            }
        ]
    },
    apis:['./mongodb.js']
}

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.json());

app.listen(8080, () => {
    client = new MongoClient(uri);
    console.log("Connection successful!")
});

/**
 * @swagger
 *  components:
 *      schema:
 *          Book:
 *              type: object
 *              properties: 
 *                  id: 
 *                      type: integer
 *                  name:
 *                      type: string
 *                  genre:
 *                      type: string
 */

/**
 * @swagger
 * /api/books:
 *  get:
 *      summary: This api is used to get all book recordings from MongoDB database
 *      description: This api is used to get all book recordings from MongoDB database
 *      responses:
 *          200:
 *              description: To test GetAllBooks method
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
*/
app.get('/api/books', (req, resp) => {
    readAll(client, resp);
    client.close();
})

/**
 * @swagger
 * /api/books/{name}:
 *  get:
 *      summary: This api is used to get book recordings from their names from MongoDB database
 *      description: This api is used to get book recordings from their names from MongoDB database
 *      parameters:
 *        - in: path
 *          name: name
 *          required: true
 *          description: Name field of the Book object is required!
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: To test getBookByName method!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
*/
app.get('/api/books/:name', (req, res) => {
    readOneByName(client, req.params.name, res);
    client.close();
})

/**
 * @swagger
 * /api/bookById/{id}:
 *  get:
 *      summary: This api is used to get book recordings from their names from MongoDB database
 *      description: This api is used to get book recordings from their names from MongoDB database
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID field of the Book object is required!
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: To test getBookById method!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
*/
app.get('/api/bookById/:id', (req, res) => {
    readBookByID(client, req.params.id, res);
    client.close();
})

/**
 * @swagger
 * /api/booksByGenre/{genre}:
 *  get:
 *      summary: This api is used to get book recordings from their names from MongoDB database
 *      description: This api is used to get book recordings from their names from MongoDB database
 *      parameters:
 *        - in: path
 *          name: genre
 *          required: true
 *          description: Genre field of the Book object is required!
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: To test getBookByGenre method!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
*/
app.get('/api/booksByGenre/:genre', (req, res) => {
    readAllByGenre(client, req.params.genre, res);
    client.close();
})

/**
 * @swagger
 * /api/books/addBook:
 *  post:
 *      summary: This api is used to insert book recording into MongoDB database
 *      description: This api is used to insert book recording into MongoDB database
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/Book'
 *      responses:
 *          200:
 *              description: To test addBook method!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
*/
app.post('/api/books/addBook', (req, res) => {
    create(client, req.body, res);
    client.close();
})

/**
 * @swagger
 * /api/books/{id}:
 *  put:
 *      summary: This api is used to update book recording in MongoDB database based on the id field
 *      description: This api is used to update book recording in MongoDB database based on the id field
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/Book'
 *      parameters:
 *        - in: path
 *          id: id
 *          required: true
 *          description: Name field of the Book object is required
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: To test updateBookByID method
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
*/
app.put('/api/books/:id', (req, res) => {
    updateBookByID(client, req.params.id, req.body, res);
    client.close();
})

/**
 * @swagger
 * /api/books/{name}:
 *  delete:
 *      summary: This api is used to delete recording from MongoDB database
 *      description: This api is used to delete recording from MongoDB database
 *      parameters:
 *        - in: path
 *          name: name
 *          required: true
 *          description: Name field of the Book object is required
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Data is deleted!
*/
app.delete('/api/books/:name', (req, res) => {
    deleteByName(client, req.params.name, res);
    client.close();
})


/**
 * @swagger
 * /api/bookDeleteById/{id}:
 *  delete:
 *      summary: This api is used to delete recording from MongoDB database
 *      description: This api is used to delete recording from MongoDB database
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID field of the Book object is required
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Data is deleted!
*/
app.delete('/api/bookDeleteById/:id', (req, res) => {
    deleteById(client, req.params.id, res);
    client.close();
})


async function create(client, newListing, res){
    await client.connect();
    const result = await client.db("ReactBooksApp").collection("books").insertOne(newListing);
    res.send({message: "New listing created with the following id: " + result.insertdId});
}

async function getDatabases(client, res){
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();

    databasesList.databases.toArray((err, result) => {
        if(err){
            res.send({errorMessage: err})
        }else{
            res.send(result);
        }
    })
}

async function readAll(client, res){
    await client.connect();
    const result = await client.db("ReactBooksApp").collection("books").find({}).sort({author: 1}).toArray((err, response) => {
        if(err){
            res.send({errorMessage: err});
        }else{
            res.send(response);
        }
    });
}

async function readBookByID(client, id, res){
    await client.connect();
    const result = await client.db("ReactBooksApp").collection("books").findOne({id: {'$regex' : '.*' + id + '.*', '$options': 'i'}});
    if(result){
        res.send(result);
    }else{
        res.send({errorMessage: "No book found with the id of " + id});
    }
}

async function readOneByName(client, nameOfBook, res){
    await client.connect();
    const result = await client.db("ReactBooksApp").collection("books").findOne({name: {'$regex' : '.*' + nameOfBook + '.*', '$options': 'i'}});
    if(result){
        res.send(result);
    }else{
        res.send({errorMessage: "No book found with the name of " + nameOfBook});
    }
}

async function readAllByGenre(client, genre, res){
    await client.connect();
    const result = await client.db("ReactBooksApp").collection("books").find({
        genre: {'$regex' : '.*' + genre + '.*', '$options': 'i'}
    }).sort({author: 1});

    const response = await result.toArray((err, result) => {
        if(err){
            res.send({errorMessage: err})
        }else{
            res.send(result);
        }
    });
}

async function updateBookByID(client, id, editedBook, res){
    await client.connect();
    const result = await client.db("ReactBooksApp").collection("books").updateOne({
        id: {'$regex' : '.*' + id + '.*', '$options': 'i'}}, {$set: editedBook});
        if(result.matchedCount === 0){
            res.send({errorMessage: "No book found with the ID of " + id})
        }else{
            res.send({message: `${result.modifiedCount} books have been changed!`})
        }
        
}

async function deleteByName(client, name, res){
    await client.connect();
    const result = await client.db("ReactBooksApp").collection("books").deleteOne({
        name: {'$regex' : name, '$options': 'i'}
    });
    if(result.deletedCount > 0){
        res.send({message: `${result.deletedCount} books have been deleted!`});
    }else{
        res.send({errorMessage: `No books found!`});
    }
}

async function deleteById(client, id, res){
    await client.connect();
    const result = await client.db("ReactBooksApp").collection("books").deleteOne({
        id: {'$regex' : id, '$options': 'i'}
    });
    if(result.deletedCount > 0){
        res.send({message: `${result.deletedCount} books have been deleted!`});
    }else{
        res.send({errorMessage: `No books found!`});
    }
}