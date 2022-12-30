const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

async function readContacts() {
  const res = await fs.readFile(contactsPath, { encoding: "utf8" });
  const resParsed = JSON.parse(res);
  return resParsed;
}

async function listContacts() {
  try {
    const res = await readContacts();

    return res;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const res = await readContacts();
    const filtredRes = res.filter((element) => element.id === contactId);
    return filtredRes;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const res = await readContacts();

    const filtredRes = res.filter((element) => {
      return element.id !== String(contactId);
    });
    await fs.writeFile(contactsPath, JSON.stringify(filtredRes, null, 2));
  } catch (error) {
    console.log(error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const res = await readContacts();
    const id = nanoid();
    const newContact = { id, name, email, phone };

    res.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(res, null, 2));
    return newContact;
  } catch (error) {}
}

async function updateContact({ id, name, email, phone }) {
  try {
    const res = await readContacts();
    const updateContact = res.map((el) => {
      if (el.id === id) {
        el.name = name;
        el.phone = phone;
        el.email = email;
      }
      return el;
    });

    await fs.writeFile(contactsPath, JSON.stringify(updateContact, null, 2));
  } catch (error) {}
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
