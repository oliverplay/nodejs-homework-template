function validateContact(contact) {
  const errors = [];

  if (!contact.name || typeof contact.name !== 'string') {
    errors.push('Name is required and must be a string.');
  }

  if (!contact.email || typeof contact.email !== 'string' || !contact.email.includes('@')) {
    errors.push('A valid email is required.');
  }

  if (!contact.phone || typeof contact.phone !== 'string') {
    errors.push('Phone number is required and must be a string.');
  }

  // If there are errors, return an object with an error key
  if (errors.length > 0) {
    return { error: errors.join(' ') };
  }

  // If everything is valid, return an object with no error
  return { error: null };
}

module.exports = validateContact;
