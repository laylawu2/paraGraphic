'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const axios = require('axios')
//const passport = require('passport')

// Bones has a symlink from node_modules/APP to the root of the app.
// That means that we can require paths relative to the app root by
// saying require('APP/whatever').
//
// This next line requires our root index.js:
const pkg = require('APP')

const app = express()

if (!pkg.isProduction && !pkg.isTesting) {
  // Logging middleware (dev only)
  app.use(require('volleyball'))
}

const fs = require('fs')

const pyRoute = code => {
  code = code.toString()  
  return (req, res, next) =>
    axios.post('http://localhost:5000/eval', {code})
      .then(({data}) => res.send(data)) 
      .catch(({response: {data}}) => res.status(400).send(data))
}

const pyFile = filename => pyRoute(fs.readFileSync(__dirname + '/' + filename))

module.exports = app
  // We'll store the whole session in a cookie
  // .use(require('cookie-session') ({
  //   name: 'session',
  //   keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
  // }))

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())


  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))


  // post request receive from axios on front end should send another axios call to python backend, 
  // receive that data
  .post('/', (req, res, next) =>{
    //console.log(req.body)
    axios.post('http://localhost:5000/api', req.body)    
      .then(response => {
        res.send(response.data)})
      .catch(err => console.error(err))
  })

  .post('/testPythonEndpoint', pyFile('./test.py'))

if (module === require.main) {
  // Start listening only if we're the main module.
  // 
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)      
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
}
