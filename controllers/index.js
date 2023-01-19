const { addContact } = require("./contacts");
const { listContacts } = require("./contacts");
const { getContactById } = require("./contacts");
const { removeContact } = require("./contacts");
const { updateContact } = require("./contacts");
const { updatefavorite } = require("./contacts");

module.exports = {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  updatefavorite,
};
