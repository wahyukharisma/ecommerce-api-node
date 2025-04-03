import { Router } from "express"
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from "./productsController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { createProductSchema, updateProductSchema } from "../../db/schema/product.js";
import { verifySeller, verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, verifySeller, validateData(createProductSchema), createProduct);
router.put('/:id', verifyToken, validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;