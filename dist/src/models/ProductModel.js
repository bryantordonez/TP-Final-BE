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
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false
});
const Product = mongoose_1.default.model("product", productSchema);
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product.find();
        return products;
    }
    catch (error) {
        throw new Error("Error al obtener productos");
    }
});
const addProduct = (dataProduct) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new Product(dataProduct);
        yield newProduct.save();
        return newProduct;
    }
    catch (error) {
        throw new Error("Error al crear producto");
    }
});
const updateProduct = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedProduct) {
            throw new Error("Producto no encontrado");
        }
        return updatedProduct;
    }
    catch (error) {
        throw new Error("Error al actualizar el producto");
    }
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield Product.findByIdAndDelete(id);
        if (!deleteProduct) {
            throw new Error("No se encuentra el producto que quieres borrar");
        }
        return deletedProduct;
    }
    catch (error) {
        throw new Error("Error al eliminar el producto");
    }
});
exports.default = { getAllProducts, addProduct, updateProduct, deleteProduct };
//# sourceMappingURL=ProductModel.js.map