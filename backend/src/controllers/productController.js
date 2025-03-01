import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};
  const brand = req.query.brand ? { brand: req.query.brand } : {};
  const priceMin = req.query.priceMin
    ? { price: { $gte: Number(req.query.priceMin) } }
    : {};
  const priceMax = req.query.priceMax
    ? { price: { $lte: Number(req.query.priceMax) } }
    : {};
  const inStock =
    req.query.inStock === "true" ? { countInStock: { $gt: 0 } } : {};
  const featured = req.query.featured === "true" ? { isFeatured: true } : {};
  const newProducts = req.query.new === "true" ? { isNew: true } : {};

  // Combine all filters
  const filters = {
    ...keyword,
    ...category,
    ...brand,
    ...priceMin,
    ...priceMax,
    ...inStock,
    ...featured,
    ...newProducts,
  };

  // Handle price range when both min and max are provided
  if (req.query.priceMin && req.query.priceMax) {
    filters.price = {
      $gte: Number(req.query.priceMin),
      $lte: Number(req.query.priceMax),
    };
  }

  const count = await Product.countDocuments(filters);
  const products = await Product.find(filters)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    discount,
    colors,
    sizes,
    isNew,
    isFeatured,
  } = req.body;

  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
    discount,
    colors,
    sizes,
    isNew,
    isFeatured,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    discount,
    colors,
    sizes,
    isNew,
    isFeatured,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price !== undefined ? price : product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock =
      countInStock !== undefined ? countInStock : product.countInStock;
    product.discount = discount !== undefined ? discount : product.discount;
    product.colors = colors || product.colors;
    product.sizes = sizes || product.sizes;
    product.isNew = isNew !== undefined ? isNew : product.isNew;
    product.isFeatured =
      isFeatured !== undefined ? isFeatured : product.isFeatured;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 5;

  const products = await Product.find({}).sort({ rating: -1 }).limit(limit);

  res.json(products);
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 8;

  const products = await Product.find({ isFeatured: true }).limit(limit);

  res.json(products);
});

// @desc    Get new products
// @route   GET /api/products/new
// @access  Public
export const getNewProducts = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? Number(req.query.limit) : 8;

  const products = await Product.find({ isNew: true }).limit(limit);

  res.json(products);
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
export const getProductCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
});

// @desc    Get product brands
// @route   GET /api/products/brands
// @access  Public
export const getProductBrands = asyncHandler(async (req, res) => {
  const brands = await Product.distinct("brand");
  res.json(brands);
});
