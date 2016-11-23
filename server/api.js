'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .get('/words', (req, res, next) => {
  	let data = {
      "z":[0,0,0.2], 
      "x":[0.2,0,0], 
      "y":[0,0.2,0], 
      "O":[0,0,0], 
      "hi":[0.1,0.3,0.2],
      "haha":[0,0,0.5],
      "cool":[0.9,0.6,0.7], 
      "new center":[0.5,0.5,0.5]
  	}
  	res.json(data)
  })

// Send along any errors
api.use((err, req, res, next) => {
  res.status(500).send(err)
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())