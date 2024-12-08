"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProducts = exports.deleteProduct = exports.updateProduct = exports.addProduct = exports.getAllProducts = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const productSchema_1 = require("./joi/productSchema");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.default.getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock } = req.body;
    const { error } = productSchema_1.productSchema.validate({ name, price, description, stock });
    if (error) {
        console.log('/addProduct: productSchema error:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }
    const product = { name, description, price, stock };
    try {
        const newProduct = yield ProductModel_1.default.addProduct(product);
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});
exports.addProduct = addProduct;
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = req.body;
    if (!Array.isArray(products)) {
        return res.status(400).json({ error: "Expected an array of products in the request body" });
    }
    const validationErrors = [];
    const successfullyAdded = [];
    for (const product of products) {
        const { name, description, price, stock } = product;
        const { error } = productSchema_1.productSchema.validate({ name, price, description, stock });
        if (error) {
            validationErrors.push(`Error in product '${name || "unknown"}': ${error.details[0].message}`);
            continue;
        }
        try {
            const newProduct = yield ProductModel_1.default.addProduct({ name, description, price, stock });
            successfullyAdded.push(newProduct);
        }
        catch (error) {
            validationErrors.push(`Failed to add product '${name}': ${error.message}`);
        }
    }
    if (validationErrors.length > 0) {
        return res.status(400).json({
            message: "Some products could not be added",
            successfullyAdded,
            errors: validationErrors
        });
    }
    res.status(201).json({ message: "All products added successfully", products: successfullyAdded });
});
exports.addProducts = addProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        const updatedProduct = yield ProductModel_1.default.updateProduct(id, { name, description, price, stock });
        res.json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedProduct = yield ProductModel_1.default.deleteProduct(id);
        res.json(deletedProduct);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map