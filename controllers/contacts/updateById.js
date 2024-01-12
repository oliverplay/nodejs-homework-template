const {Contact} = require("../../schemas/mongoModel");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json(result);
};

module.exports = updateById;