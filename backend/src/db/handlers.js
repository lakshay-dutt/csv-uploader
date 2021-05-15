"use strict";

const { connectToDatabase, Note } = require("./connect");

const callback = (res, statusCode, response) => res.status(statusCode).json(response);

const create = async (req, res) => {
  connectToDatabase().then(() => {
    Note.insertMany(req.body)
      .then(note => {
        return callback(res, 200, { message: "Success", data: note });
      })
      .catch(err => callback(res, 400, { message: "Error", error: err }));
  });
};

// const getOne = (req, res) => {

//   connectToDatabase().then(() => {
//     Note.findById(event.pathParameters.id)
//       .then(note =>
//         callback(null, {
//           statusCode: 200,
//           body: JSON.stringify(note),
//         })
//       )
//       .catch(err =>
//         callback(null, {
//           statusCode: err.statusCode || 500,
//           headers: { "Content-Type": "text/plain" },
//           body: "Could not fetch the note.",
//         })
//       );
//   });
// };

const getAll = async (req, res) => {
  console.log("Inside getAll");
  await connectToDatabase().then(() => {
    Note.find()
      .then(notes => callback(res, 200, notes))
      .catch(err => callback(res, 400, { message: "Could not fetch the notes.", error: err }));
  });
};

const deleteAll = (req, res) => {
  connectToDatabase().then(() => {
    Note.deleteMany()
      .then(note => callback(res, 200, { message: "Collection Deleted", data: note }))
      .catch(err => callback(res, 400, { message: "Error", error: err }));
  });
};

module.exports = {
  deleteAll,
  create,
  getAll,
};
