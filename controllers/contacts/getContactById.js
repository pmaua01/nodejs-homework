const { Contact } = require("../../models/contacts");
const { httpError } = require("../../helpers/httpError");

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (contactById.length === 0) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json(contactById);
}
module.exports = getContactById;
