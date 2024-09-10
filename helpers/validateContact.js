// helpers/validateContact.js
function validateContact(contact) {
  // Placeholder validation logic
  if (!contact.name || !contact.email || !contact.phone) {
    return false;
  }
  return true;
}

module.exports = validateContact;
