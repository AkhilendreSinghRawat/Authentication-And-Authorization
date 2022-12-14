require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
)

const port = process.env.PORT || 9000

const USERS = []
const refreshTokens = []
const DATA = { secret: 'Genda Swami' }

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).json({ message: 'Token Not Found' }) //no token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token Is Nolonger Valid' }) //token is nolonger invalid
    req.user = user
    next()
  })
}

app.get('/data', authenticateToken, (req, res) => {
  res.json(DATA)
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
  res.status(204).json({ message: 'Successfully logged out' })
})

app.post('/token', (req, res) => {
  const refreshToken = req.body.refreshToken
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ email: user.email })
    res.json({ accessToken: accessToken })
  })
})

app.post('/register', (req, res) => {
  if (
    USERS.find((user) => {
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
        const email = { email: req.body.email }
        const accessToken = generateAccessToken(email)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res
          .status(200)
          .json({ accessToken: accessToken, refreshToken: refreshToken })
      } else {
        res.status(409).json({ message: 'Incorrect password' })
      }
    })
    .catch((err) => res.status(500).send(err))
})

app.listen(port, () => {
  console.log('server listening on port', port)
})
