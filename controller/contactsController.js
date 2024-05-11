const contacts = require("./../contacts");

async function index(req, res, next) {
  try {
    const contactsList = await contacts.listContacts();
    res.json(contactsList);
  } catch (error) {
    next(error);
  }
}

async function show(req, res, next) {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
    }
    const newContact = await contacts.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const contact = await contacts.removeContact(req.params.contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing required name field" });
    }
    const updatedContact = await contacts.updateContact(req.params.contactId, {
      name,
      email,
      phone,
    });
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  show,
  create,
  destroy,
  update,
};
