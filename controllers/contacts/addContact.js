const { Contact } = require("../../models/contacts");

async function addContact(req, res, next) {
  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
}

module.exports = addContact;
