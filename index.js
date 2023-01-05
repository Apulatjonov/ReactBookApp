const { response, application } = require('express')
const express = require('express')

const app = express()

app.use(express.json())

const books = [
    {title: 'Java Programming', id:1},
    {title: 'JavaScript Programming', id:2},
    {title: 'Python Programming', id:3}
]

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.get('/api/books', (req, res)=>{
    res.send(books)
})

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id))
    if(!book) res.status(404).send('Book not found!')
    res.send(book)
})

app.post('/api/books/add', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title
    }
    books.push(book)
    res.send(book)
})

app.put('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id == parseInt(req.params.id))
    if(!book) res.status(404).send('Book not found!')
    book.title = req.body.title
    res.send(book)
})

app.delete('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id == parseInt(req.params.id))
    if(!book) res.status(404).send('Book not found!')

    books.splice(books.indexOf(book))
    res.send("Deleted!")
})

app.listen(3001)
