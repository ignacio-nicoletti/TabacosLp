import { Product } from "../models/products.js";
import { formatError } from "../utils/formatError.js";

export const createProduct = async (req, res) => {
  const {
    code,
    title,
    stock,
    description,
    priceList,
    priceCost,
    category,
    brand,
    amount,
    image,
  } = req.body;
  try {
    let product = new Product({
      code,
      title: title[0].toUpperCase() + title.slice(1),
      stock,
      description: description[0].toUpperCase() + description.slice(1),
      priceList,
      priceCost,
      category,
      brand,
      amount,
      image,
    });
    await product.save();
    return res.status(200).json({ msg: "producto creado" });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const GetAllProduct = async (req, res) => {
  try {
    let products = await Product.find();
    return res.status(200).json(products.reverse());
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const GetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await Product.findById(id);
    return res.status(200).json({ product });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const UpdateProductById = async (req, res) => {
  const { id } = req.params;
  const {
    code,
    title,
    stock,
    description,
    priceList,
    priceCost,
    category,
    brand,
    amount,
    image,
  } = req.body;

  try {
    let product = await Product.findByIdAndUpdate(
      id,
      {
        code,
        title: title[0].toUpperCase() + title.slice(1),
        stock,
        description: description[0].toUpperCase() + description.slice(1),
        priceList,
        priceCost,
        category,
        brand,
        amount,
        image,
      },
      { new: true }
    );
    return res.status(200).json({ product });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const DeleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndRemove(id);

    return res.status(200).json("producto eliminado");
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const getAllCategories = async (req, res) => {
  try {
    let products = await Product.find();
    const categoriesPrimary = new Set(products.map((el) => el.category));
    const uniqueCategoriesPrimary = Array.from(categoriesPrimary);

    return res.status(200).json({
      categories: uniqueCategoriesPrimary,
    });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const getAllBrands = async (req, res) => {
  try {
    let products = await Product.find();
    const categoriesPrimary = new Set(products.map((el) => el.brand));
    const uniqueCategoriesPrimary = Array.from(categoriesPrimary);

    return res.status(200).json({
      brands: uniqueCategoriesPrimary,
    });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};


export const EditPriceAllProducts = async (req, res) => {
  try {
    const { priceListPercentage, priceCostPercentage } = req.body;
    console.log(req.body);

    const products = await Product.find();

    products.forEach(async (product) => {
      let priceList = product.priceList;
      let priceCost = product.priceCost;

      priceList += priceList * (priceListPercentage / 100);
      priceCost += priceCost * (priceCostPercentage / 100);

      // Actualizar el producto en la base de datos
      await Product.findByIdAndUpdate(product._id, {
        $set: {
          priceList: Math.max(priceList, 0),
          priceCost: Math.max(priceCost, 0),
        },
      });
    });

    return res.status(200).json({ message: 'Precios actualizados correctamente' });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};