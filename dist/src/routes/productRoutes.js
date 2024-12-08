"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const productController_1 = require("../controllers/productController");
const productsRoutes = (0, express_1.Router)();
exports.productsRoutes = productsRoutes;
productsRoutes.get("/products", authMiddleware_1.auth, productController_1.getAllProducts);
productsRoutes.post("/addProduct", productController_1.addProduct);
productsRoutes.post("/addProducts", productController_1.addProducts);
productsRoutes.patch("/:id", productController_1.updateProduct);
productsRoutes.delete("/:id", productController_1.deleteProduct);
//# sourceMappingURL=productRoutes.js.map