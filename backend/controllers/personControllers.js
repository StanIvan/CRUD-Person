const Person = require("../models/personModels");
const mongoose = require("mongoose");

//get all
const getPersons = async (req, res) => {
  const persons = await Person.find({}).sort({ createdAt: -1 });
  res.status(200).json(persons);
};

//get a single document
const getPerson = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid ID" });
  }
  const person = await Person.findById(id);
  if (!person) {
    return res.status(404).json({ error: "No such person!" });
  }
  res.status(200).json(person);
};

//create document
const createPerson = async (req, res) => {
  const { name, surname, city, address, phone } = req.body;
  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!surname) {
    emptyFields.push("surname");
  }
  if (!city) {
    emptyFields.push("city");
  }
  if (!address) {
    emptyFields.push("address");
  }
  if (!phone) {
    emptyFields.push("phone");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Fill in all the fields", emptyFields });
  }
  try {
    const person = await Person.create({ name, surname, city, address, phone });
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete document
const deletePerson = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Not valid ID" });
  }
  const person = await Person.findOneAndDelete({ _id: id });
  if (!person) {
    res.status(404).json({ error: "No such person" });
  }
  res.status(200).json(person);
};

//update document
const updatePerson = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not valid ID" });
  }
  const person = await Person.findByIdAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } /*sending req.body as a property */
  );
  if (!person) {
    return res.status(404).json({ error: "No such person" });
  }
  res.status(200).json(person);
};

module.exports = {
  createPerson,
  getPersons,
  getPerson,
  deletePerson,
  updatePerson,
};
