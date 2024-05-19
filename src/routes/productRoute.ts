import { Router } from 'express';
import { createProduct } from '../controllers/productController';
import { validate } from '../middlewares/validationHandler';
import { validateProduct } from '../validators/productValidator';

const router: Router = Router();

router.post('/product', validate(validateProduct), createProduct);

export default router;
