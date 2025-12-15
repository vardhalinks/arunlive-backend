const Testimonial = require("../models/Testimonial");

exports.getAll = async (req, res) => {
  const data = await Testimonial.find().sort({ order: 1 });
  res.json(data);
};

exports.create = async (req, res) => {
  const { name, title, review, rating, image } = req.body;
  if (!name || !review) {
    return res.status(400).json({ message: "Name & review required" });
  }

  const t = new Testimonial({ name, title, review, rating, image });
  await t.save();
  res.status(201).json(t);
};

exports.remove = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
