const urls = {
  // POST - https://5no20lzcb5.execute-api.ap-south-1.amazonaws.com/dev/notes
  // GET - https://5no20lzcb5.execute-api.ap-south-1.amazonaws.com/dev/notes/{id}
  // GET - https://5no20lzcb5.execute-api.ap-south-1.amazonaws.com/dev/notes
  // PUT - https://5no20lzcb5.execute-api.ap-south-1.amazonaws.com/dev/notes/{id}
  // DELETE - https://5no20lzcb5.execute-api.ap-south-1.amazonaws.com/dev/notes/{id}

  getAll: {
    url: "https://5no20lzcb5.execute-api.ap-south-1.amazonaws.com/dev/notes",
    method: "GET",
  },
  insertMany: {
    url: "https://5no20lzcb5.execute-api.ap-south-1.amazonaws.com/dev/notes",
    method: "POST",
  },
};
