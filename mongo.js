const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} 
const password = process.argv[2]
const name = process.argv[3]
const phonenumber = process.argv[4]

const url =
`mongodb+srv://fullstacker:${password}@cluster0.q5bt9.mongodb.net/fspuhluettelo?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  phonenumber: String
  
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  phonenumber: phonenumber,
  
})

if (process.argv[3] == null || process.argv[4] == null) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} 
else {
  person.save().then(response => {
    console.log(`${name} number ${phonenumber} added to the database`)
    mongoose.connection.close()
  })
}

