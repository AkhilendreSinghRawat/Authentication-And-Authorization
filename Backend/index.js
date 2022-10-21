require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
)

const port = process.env.PORT || 9000

const USERS = []

app.post('/register', (req, res) => {
  if (
    USERS.find((user) => {
      console.log(user.email)
      return user.email === req.body.email
    })
  ) {
    res.status(400).json({ message: 'Email already registered' })
    return
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = { email: req.body.email, password: hashedPassword }
      USERS.push(user)
      res.status(200).send({ message: 'successfully registered' })
    })
    .catch((err) => res.status(500).send(err))
})

app.post('/login', (req, res) => {
  const user = USERS.find((user) => user.email === req.body.email)
  if (!user) {
    return res.status(400).json({ message: 'Email not registered' })
  }
  bcrypt
    .compare(req.body.password, user.password)
    .then((isMatch) => {
      if (isMatch) {
        res.status(200).json({ message: 'Successfully logged in' })
      } else {
        res.status(409).json({ message: 'Incorrect password' })
      }
    })
    .catch((err) => res.status(500).send(err))
})

app.listen(port, () => {
  console.log('server listening on port', port)
})
