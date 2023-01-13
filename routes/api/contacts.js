const {
  controllerListContacts,
  controllerGetContactById,
  controllerAddContact,
  controllerRemoveContact,
  controllerUpdateContact,
  controllerUpdatefavorite,
} = require("../../controllers/contactsController");

const {
  addContactSchema,
  updateFavorite,
  validateBody,
} = require("../../validation/validation");

const express = require("express");

const router = express.Router();

router.get("/", controllerListContacts);

router.get("/:contactId", controllerGetContactById);

router.post("/", validateBody(addContactSchema), controllerAddContact);

router.delete("/:contactId", controllerRemoveContact);

router.put(
  "/:contactId",
  validateBody(addContactSchema),
  controllerUpdateContact
);

router.put(
  "/:contactId/favorite",
  validateBody(updateFavorite),
  controllerUpdatefavorite
);

module.exports = router;
