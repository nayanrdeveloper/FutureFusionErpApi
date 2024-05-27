import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/productController';
import { validate } from '../middlewares/validationHandler';
import { validateProduct } from '../validators/productValidator';

const router: Router = Router();

router.get('/', getProducts);
router.post('/', validate(validateProduct), createProduct);

export default router;
