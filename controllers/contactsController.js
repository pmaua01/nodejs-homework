const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../readContact/readContact");

const Joi = require("joi");

const { httpError } = require("../helpers/httpError");

async function controllerListContacts(req, res) {
  const answer = await listContacts();
  res.status("200").json(answer);
}
async function controllerGetContactById(req, res, next) {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (contactById.length === 0) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json(contactById);
}

async function controllerAddContact(req, res, next) {
  const { name, email, phone } = req.body;

  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
}

async function controllerRemoveContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact.length === 0) {
    return next(httpError(404, "Not found"));
  }
  await removeContact(contactId);

  return res.status(200).json({ message: "contact deleted" });
}

async function controllerUpdateContact(req, res, next) {
  const id = req.params.contactId;
  const { name, phone, email } = req.body;

  if (Object.keys(req.body).length === 0) {
    return next(httpError(400, "missing fields"));
  }
  const contact = await getContactById(id);

  if (contact.length === 0) {
    return next(httpError(404, "Not found"));
  }

  await updateContact({ id, name, phone, email });
  res.status(200).json({ id, name, phone, email });
}

module.exports = {
  controllerListContacts,
  controllerGetContactById,
  controllerAddContact,
  controllerRemoveContact,
  controllerUpdateContact,
};
