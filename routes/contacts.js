const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updatefavorite,
} = require("../controllers");
const { auth } = require("../middlewares");

const {
  addContactSchema,
  updateFavorite,
  validateBody,
} = require("../validation/validation");

const express = require("express");

const contactRouter = express.Router();

contactRouter.get("/", auth, listContacts);

contactRouter.get("/:contactId", auth, getContactById);

contactRouter.post("/", auth, validateBody(addContactSchema), addContact);

contactRouter.delete("/:contactId", auth, removeContact);

contactRouter.put(
  "/:contactId",
  auth,
  validateBody(addContactSchema),
  updateContact
);

contactRouter.put(
  "/:contactId/favorite",
  validateBody(updateFavorite),
  updatefavorite
);

module.exports = contactRouter;
