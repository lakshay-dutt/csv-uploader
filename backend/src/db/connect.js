require("dotenv").config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let isConnected;
const connectToDatabase = () => {
  console.log(process.env);
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  return mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(db => {
    isConnected = db.connections[0].readyState;
  });
};

const Schema = mongoose.Schema;
const NoteSchema = new Schema({}, { strict: false });
const Note = mongoose.model("Note", NoteSchema);

module.exports = { connectToDatabase, Note };
