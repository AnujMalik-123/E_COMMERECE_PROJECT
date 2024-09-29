const Product = require("../models/productModels");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryobj = { ...this.queryString };
    console.log(queryobj);
    const excluded = ["page", "sort", "limit"];
    excluded.forEach((el) => delete queryobj[el]);

    let querystr = JSON.stringify(queryobj);
    console.log(querystr);
    querystr = querystr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(querystr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortby);
      console.log(sortby);
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productctrl = {
  getproduct: async (req, res) => {
    try {
      console.log(req.query);
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sorting();
      const product = await features.query;
      // const product = await Product.find();
      res.json(product);
    } catch (err) {
      res.status(500).json({ msg: "error" });
    }
  },
  createproduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        // images,
        category,
      } = req.body;
      // if (!images) {
      //   return res.status(400).json({ msg: "image not upload" });
      // }
      const product = await Product.findOne({ product_id });
      if (product) {
        return res.status(400).json({ msg: "product already exist" });
      }
      const newproduct = Product({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        // images,
        category,
      });
      await newproduct.save();
      res.json(newproduct);
    } catch (err) {
      res.status(500).json({ msg: "error jkn" });
    }
  },
  deleteproduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ msg: "deleted " });
    } catch (err) {
      res.status(500).json({ msg: "error" });
    }
  },
  updateproduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        // images,
        category,
      } = req.body;

      // if (!images) {
      //   return res.status(400).json({ msg: "image not upload" });
      // }
      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title: title.toLowerCase(),
          price,
          description,
          content,
          // images,
          category,
        }
      );
      res.json("update");
    } catch (err) {
      res.status(500).json({ msg: "error" });
    }
  },
};
module.exports = productctrl;
