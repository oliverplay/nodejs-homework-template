import express from 'express';
import authenticate from '../../middlewares/auth.js';
import Joi from 'joi';
import Contact from '../../models/contacts.js';

const router = express.Router();

// Validation schemas
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// GET All Contacts (Paginated)
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find({ owner: req.user._id })
      .skip(skip)
      .limit(parseInt(limit, 10));
    const total = await Contact.countDocuments({ owner: req.user._id });

    res.status(200).json({
      contacts,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(total / limit),
      totalContacts: total,
    });
  } catch (error) {
    next(error);
  }
});

// POST Create new Contact
router.post('/', authenticate, async (req, res, next) => {
  try {
    // Validate request body
    const { name, email, phone } = await contactSchema.validateAsync(req.body);

    // Create a new contact
    const newContact = new Contact({
      name,
      email,
      phone,
      owner: req.user._id, // assuming the user is authenticated and assigned via the 'auth' middleware
    });

    // Save the new contact to the database
    await newContact.save();

    res.status(201).json(newContact); // Respond with the created contact
  } catch (error) {
    next(error);
  }
});

export default router;
