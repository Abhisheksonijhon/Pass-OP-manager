const express = require('express')
const app = express()
require('dotenv').config()
console.log(process.env.MONGO_URI)
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:${port}`)
})