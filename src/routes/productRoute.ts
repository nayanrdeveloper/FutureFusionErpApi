import { Router } from 'express';
import { createProduct } from '../controllers/productController';

const router: Router = Router();

router.post('/product', createProduct);

export default router;
