const {
  controllerListContacts,
  controllerGetContactById,
  controllerAddContact,
  controllerRemoveContact,
  controllerUpdateContact,
} = require("../../controllers/contactsController");

const {
  addContactSchema,
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

module.exports = router;
