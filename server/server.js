import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

// import path from 'path'
// import express from 'express'
// import { MongoClient } from 'mongodb'
// import template from './../template'
// import config from "./../config/config";
// import mongoose from "mongoose";

// //comment out before building for production
// import devBundle from './devBundle'

// const app = express()
// //comment out before building for production
// devBundle.compile(app)

// mongoose.promise = global.promise;
// mongoose.connect(config.mongoUri);

// const CURRENT_WORKING_DIR = process.cwd()

// app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// app.get('/', (req, res) => {
//   res.status(200).send(template())
// })

// let port = process.env.PORT || 3000

// app.listen(config.port, (err) => {
//   console.log(`port ${process.env.PORT}`)
//   if (err) {
//     console.log(err)
//   }
//   console.info('Server started on port %s.', config.port)
// });

// mongoose.connection.on("error", () => {
//   throw new Error(`UNABLE to connect to DB ${config.mongoUri}`)
// })