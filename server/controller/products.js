const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const productModel = require("../models/products");
const fs = require("fs");
const path = require("path");

class Product {
  static deleteImages(images, mode) {
    const basePath = path.resolve(__dirname, "../../public/uploads/products/");
    for (const img of images) {
      const filePath = basePath + (mode === "file" ? img.filename : img);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete image:", err);
        });
      }
    }
  }

  async postAddProduct(req, res) {
    try {
      const {
        pName, pDescription, oldPrice, pPrice,
        pQuantity, pCategory, pOffer, pStatus,
        topCollection, solarPerfume, discount,
        seasonalProduct, animation
      } = req.body;

      const images = req.files;
      const parseBool = (val) => val === "true" || val === true;

      if (!pName || !pDescription || !oldPrice || !pPrice || !pQuantity || !pCategory || !pStatus) {
        Product.deleteImages(images, "file");
        return res.status(400).json({ error: "All required fields must be filled" });
      }

      if (pName.length > 255 || pDescription.length > 3000) {
        Product.deleteImages(images, "file");
        return res.status(400).json({ error: "Name max 255, Description max 3000 characters" });
      }

      if (!images || images.length < 2 || images.length > 5) {
        Product.deleteImages(images, "file");
        return res.status(400).json({ error: "Upload between 2 to 5 images" });
      }

      const allImages = images.map((img) => img.filename);

      const newProduct = new productModel({
        pName, pDescription, oldPrice, pPrice,
        pQuantity, pCategory, pOffer, pStatus,
        pImages: allImages,
        topCollection: parseBool(topCollection),
        solarPerfume: parseBool(solarPerfume),
        discount: parseBool(discount),
        seasonalProduct: parseBool(seasonalProduct),
        animation: parseBool(animation)
      });

      await newProduct.save();
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Save error:", err);
      return res.status(500).json({ error: "Server error while saving product" });
    }
  }

  async postEditProduct(req, res) {
    const {
      pId, pName, pDescription, oldPrice, pPrice,
      pQuantity, pCategory, pOffer, pStatus,
      pImages, topCollection, solarPerfume,
      discount, seasonalProduct, animation
    } = req.body;

    const editImages = req.files;
    const parseBool = (val) => val === "true" || val === true;

    if (!pId || !pName || !pDescription || !oldPrice || !pPrice || !pQuantity || !pCategory || !pStatus) {
      return res.json({ error: "All required fields must be filled" });
    }

    if (pName.length > 255 || pDescription.length > 3000) {
      return res.json({ error: "Name max 255, Description max 3000 characters" });
    }

    if (editImages && (editImages.length < 2 || editImages.length > 5)) {
      Product.deleteImages(editImages, "file");
      return res.json({ error: "Upload between 2 to 5 new images or none" });
    }

    const editData = {
      pName, pDescription, oldPrice, pPrice,
      pQuantity, pCategory, pOffer, pStatus,
      topCollection: parseBool(topCollection),
      solarPerfume: parseBool(solarPerfume),
      discount: parseBool(discount),
      seasonalProduct: parseBool(seasonalProduct),
      animation: parseBool(animation)
    };

    if (editImages?.length >= 2 && editImages?.length <= 5) {
      const newImgs = editImages.map((img) => img.filename);
      editData.pImages = newImgs;
      if (typeof pImages === "string") {
        Product.deleteImages(pImages.split(","), "string");
      }
    }

    try {
      const updated = await productModel.findByIdAndUpdate(pId, editData);
      return res.json({ success: "Product updated successfully" });
    } catch (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: "Update failed" });
    }
  }

  async getAllProduct(req, res) {
    try {
      const Products = await productModel
        .find({})
        .populate("pCategory", "_id cName")
        .sort({ _id: -1 });
      return res.json({ Products });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  async getDeleteProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      let deleteProductObj = await productModel.findById(pId);
      let deleteProduct = await productModel.findByIdAndDelete(pId);
      if (deleteProduct) {
        Product.deleteImages(deleteProductObj.pImages, "string");
        return res.json({ success: "Product deleted successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleProduct(req, res) {
    let { pId } = req.body;
    if (!pId) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      let singleProduct = await productModel
        .findById(pId)
        .populate("pCategory", "cName")
        .populate("pRatingsReviews.user", "name email userImage");
      if (singleProduct) {
        return res.json({ Product: singleProduct });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProductByCategory(req, res) {
    let { catId } = req.body;
    if (!catId) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      let products = await productModel
        .find({ pCategory: catId })
        .populate("pCategory", "cName");
      return res.json({ Products: products });
    } catch (err) {
      return res.json({ error: "Search product failed" });
    }
  }
  

  // ✅ FIXED: This function now uses `newPrice` instead of `pPrice`
  async getProductByPrice(req, res) {
    let { price } = req.body;
    if (!price) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      let products = await productModel
        .find({ pPrice: { $lt: price } }) // ✅ pPrice filtering
        .populate("pCategory", "cName")
        .sort({ pPrice: -1 });
      return res.json({ Products: products });
    } catch (err) {
      return res.json({ error: "Filter product failed" });
    }
  }

  // GET /api/product/top-collection
async getTopCollectionProducts(req, res) {
    try {
      const products = await productModel
        .find({ topCollection: true })
        .populate("pCategory", "cName");

      return res.json({ Products: products });
    } catch (err) {
      console.error("Top Collection Error:", err);
      return res.status(500).json({ error: "Failed to fetch top collection products" });
    }
  }


  async getDiscountProducts(req, res) {
    try {
      const products = await productModel
        .find({ discount: true })
        .populate("pCategory", "cName");
      return res.json({ Products: products });
    } catch (err) {
      return res.json({ error: "Failed to fetch discounted products" });
    }
  }

  async getWishProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      let wishProducts = await productModel.find({
        _id: { $in: productArray },
      });
      return res.json({ Products: wishProducts });
    } catch (err) {
      return res.json({ error: "Wish product failed" });
    }
  }

  async getCartProduct(req, res) {
    let { productArray } = req.body;
    if (!productArray) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      let cartProducts = await productModel.find({
        _id: { $in: productArray },
      });
      return res.json({ Products: cartProducts });
    } catch (err) {
      return res.json({ error: "Cart product failed" });
    }
  }

  async postAddReview(req, res) {
    let { pId, uId, rating, review } = req.body;
    if (!pId || !rating || !review || !uId) {
      return res.json({ error: "All fields must be required" });
    }

    try {
      const product = await productModel.findById(pId);
      const alreadyReviewed = product.pRatingsReviews.some(
        (item) => item.user.toString() === uId
      );

      if (alreadyReviewed) {
        return res.json({ error: "You already reviewed the product" });
      }

      product.pRatingsReviews.push({ user: uId, review, rating });
      await product.save();
      return res.json({ success: "Thanks for your review" });
    } catch (err) {
      console.error(err);
      return res.json({ error: "Review submission failed" });
    }
  }

  async deleteReview(req, res) {
    let { rId, pId } = req.body;
    if (!rId || !pId) {
      return res.json({ error: "All fields must be required" });
    }
    try {
      await productModel.findByIdAndUpdate(pId, {
        $pull: { pRatingsReviews: { _id: rId } },
      });
      return res.json({ success: "Your review is deleted" });
    } catch (err) {
      console.log(err);
    }
  }
}

const productController = new Product();
module.exports = productController;
