const { Contact } = require("../../models/contacts");

async function listContacts(req, res) {
  const { limit, page } = req.query;
  const skip = (page - 1) * limit;
  const answer = await Contact.find({}).skip(skip).limit(limit);
  res.status("200").json(answer);
}

module.exports = listContacts;
