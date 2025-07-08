const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

exports.getAllContacts = asyncHandler(async (req, res) => {
  const search = req.query.search || "";  
  const searchQuery = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const allContacts = await Contact.find(searchQuery)
    .find({ user_id: req.user.id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "Successfully Getting All Contacts",
    allContacts,
  });
});

exports.createContact = asyncHandler(async (req, res) => {
  // console.log("The body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Every field is mandatory!");
  }
  const newContact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json({
    message: "Successfully Created new contact",
    newContact,
  });
});

exports.getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({
    message: `Successfully Get Contact of Id = ${req.params.id}`,
    contact,
  });
});

exports.updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not authorized to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  // console.log(updatedContact);
  res.status(200).json({
    message: `Successfully Updated Contact of Id = ${req.params.id}`,
    updatedContact,
  });
});

exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not authorized to delete other user contacts");
  }
  // await Contact.remove();
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `Successfully Deleted the contact of Id = ${req.params.id}`,
  });
});
