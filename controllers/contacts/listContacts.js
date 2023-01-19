const { Contact } = require("../../models/contacts");

async function listContacts(req, res) {
  const answer = await Contact.find({});
  res.status("200").json(answer);
}

module.exports = listContacts;
