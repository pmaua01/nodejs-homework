const { Contact } = require("../../models/contacts");

const { httpError } = require("../../helpers/httpError");

async function updateContact(req, res, next) {
  const id = req.params.contactId;
  const { name, phone, email } = req.body;

  if (Object.keys(req.body).length === 0) {
    return next(httpError(400, "missing fields"));
  }
  const contact = await Contact.findById(id);

  if (contact.length === 0) {
    return next(httpError(404, "Not found"));
  }

  await Contact.findByIdAndUpdate(id, { name, phone, email });
  res.status(200).json({ id, name, phone, email });
}

module.exports = updateContact;
