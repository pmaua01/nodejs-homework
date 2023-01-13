const { Contact } = require("../models/contacts");

const { httpError } = require("../helpers/httpError");

async function controllerListContacts(req, res) {
  const answer = await Contact.find({});
  res.status("200").json(answer);
}
async function controllerGetContactById(req, res, next) {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);

  if (contactById.length === 0) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json(contactById);
}

async function controllerAddContact(req, res, next) {
  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
}

async function controllerRemoveContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (contact.length === 0) {
    return next(httpError(404, "Not found"));
  }
  await Contact.findByIdAndRemove(contactId);

  return res.status(200).json({ message: "contact deleted" });
}

async function controllerUpdateContact(req, res, next) {
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

async function controllerUpdatefavorite(req, res, next) {
  const id = req.params.contactId;
  const { favorite } = req.body;
  if (Object.keys(req.body).length === 0) {
    return next(httpError(400, "missing missing field favorite"));
  }
  await Contact.findByIdAndUpdate(id, { favorite });
  const { name, phone, email } = await Contact.findById(id);
  res.status(200).json({ id, name, phone, email });
}

module.exports = {
  controllerListContacts,
  controllerGetContactById,
  controllerAddContact,
  controllerRemoveContact,
  controllerUpdateContact,
  controllerUpdatefavorite,
};
