const CategoryModels = require("../models/CategoryModels");

const categoryctrl = {
  getcategory: async (req, res) => {
    try {
      const category = await CategoryModels.find();
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await CategoryModels.findOne({ name });
      if (category) {
        return res.status(400).json({ message: "Category already exist" });
      }
      const newcategory = new CategoryModels({ name });
      await newcategory.save();
      res.json("check admin success");
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await CategoryModels.findByIdAndDelete(req.params.id);
      res.json({ msg: "deleted a Category" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },
  updatecategory: async (req, res) => {
    try {
      const { name } = req.body;
      await CategoryModels.findByIdAndUpdate({ id: req.params.id }, { name });
      res.json({ msg: "Updated" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = categoryctrl;
