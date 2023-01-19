const { Contact } = require("../../models/contacts");

const { httpError } = require("../../helpers/httpError");

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(httpError(404, "Not found"));
  }
  await Contact.findByIdAndRemove(contactId);

  return res.status(200).json({ message: "contact deleted" });
}

module.exports = removeContact;
