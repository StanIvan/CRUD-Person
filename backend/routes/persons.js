const express = require("express");
const {
  createPerson,
  getPersons,
  getPerson,
  deletePerson,
  updatePerson,
} = require("../controllers/personControllers");

const router = express.Router();

//get all persons
router.get(
  "/",
  getPersons
  //res.json({ mssg: "GET all persons" });//za testiranje
);

//get single persons
router.get(
  "/:id",
  getPerson
  //res.json({ mssg: "Get a single person" });//za testiranje
);

//post a new person
router.post(
  "/",
  createPerson
  //res.json({ mssg: "Post a new person" });//za testiranje
);

//delete a person
router.delete(
  "/:id",
  deletePerson
  //res.json({ mssg: "Delete a person" });//za testiranje
);

//update a person
router.put(
  "/:id",
  updatePerson
  //res.json({ mssg: "Update a person" });//za testiranje
);

module.exports = router;
