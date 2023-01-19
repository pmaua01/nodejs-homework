const {
  controllerListContacts,
  controllerGetContactById,
  controllerAddContact,
  controllerRemoveContact,
  controllerUpdateContact,
  controllerUpdatefavorite,
} = require("../controllers/contactsController");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updatefavorite,
} = require("../controllers");

const {
  addContactSchema,
  updateFavorite,
  validateBody,
} = require("../validation/validation");

const express = require("express");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(addContactSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateBody(addContactSchema), updateContact);

router.put(
  "/:contactId/favorite",
  validateBody(updateFavorite),
  updatefavorite
);

module.exports = router;
