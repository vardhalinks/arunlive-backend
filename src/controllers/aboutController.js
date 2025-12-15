const About = require("../models/About");

exports.getAbout = async (req, res) => {
  try {
    const doc = await About.findOne({});
    res.json(doc || {});
  } catch (err) {
    res.status(500).json({ message: "Error fetching about", err });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { title, paragraph1, paragraph2, image } = req.body;
    const doc = await About.findOneAndUpdate({}, { title, paragraph1, paragraph2, image }, { upsert: true, new: true });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: "Error updating about", err });
  }
};
