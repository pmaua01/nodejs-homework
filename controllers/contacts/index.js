const getContactById = require("./getContactById");
const listContacts = require("./listContacts");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updatefavorite = require("./updatefavorite");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updatefavorite,
};
