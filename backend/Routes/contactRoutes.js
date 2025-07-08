const express = require("express");
const contactControllers = require("../Controllers/contactControllers");
const validateToken = require("../middlewares/validateToken");

const router = express.Router();

router.use(validateToken);
router
  .route("/")
  .get(contactControllers.getAllContacts)
  .post(contactControllers.createContact);

router
  .route("/:id")
  .get(contactControllers.getContact)
  .put(contactControllers.updateContact)
  .delete(contactControllers.deleteContact);

module.exports = router;
