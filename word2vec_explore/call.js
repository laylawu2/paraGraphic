const axios = require('axios')
const fs = require('fs')

const code = fs.readFileSync(process.argv[2])

axios.post('http://localhost:5000/eval', {code: code.toString()})    
      .then(({data}) => console.log(JSON.stringify(data, 0, 2)))
      .catch(({response: {data}}) => console.error(data))