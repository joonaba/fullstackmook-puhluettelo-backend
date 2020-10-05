
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':body :method :url :status :res[content-length] - :response-time ms'))


let persons = [
{
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  }
  
]



app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  var today = new Date();  
  app.get('/info', (req, res) => {
    
    let today = new Date(); 
    res.send('<p>Phonebook has info for ' +  persons.length + ' people<p>' + today)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const maxId = getRandomInt(0, 1000)
    const body = request.body
    console.log(body)
    const allnames = persons.map(person => person.name)
    const alreadyused = allnames.includes(body.name)

    const person = {
      name: body.name,
      number: body.number,
      id: maxId 
      }

      if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      } else if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }

      else if (alreadyused === true) {
        return response.status(400).json({ 
          error: 'name is already in use' 
        })
      }

      persons = persons.concat(person)

    response.json(person)
  })
  
  app.get('/api/persons', (req, res) => {
    
    
    res.json(persons)
  })
  
  const PORT =  process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })