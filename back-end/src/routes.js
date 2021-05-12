import { Router } from 'express';
import multer from 'multer';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import OrderDeliveredController from './app/controllers/OrderDeliveredController';
import OrderProblemController from './app/controllers/OrderProblemController';
import OrderStatusController from './app/controllers/OrderStatusController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import adminAuthMiddleware from './app/middlewares/adminAuth';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const upload = multer(multerConfig);
const routes = new Router();

// No auth routes
routes.post('/sessions', SessionController.store);

// Auth routes
routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.get(
  '/deliveryman/:deliverymanId/delivered',
  OrderDeliveredController.index
);
routes.get('/deliveryman/:deliverymanId/deliveries', OrderController.index);

routes.put('/deliveries/:deliveryId/withdraw', OrderStatusController.update);

routes.get('/deliveries/problems', OrderProblemController.index);

routes.get('/deliveries/:deliveryId/problems', OrderProblemController.show);

routes.post('/deliveries/:deliveryId/problems', OrderProblemController.store);

// admin routes
routes.use(adminAuthMiddleware);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:deliveryId', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:deliveryId', DeliveryController.update);
routes.delete('/deliveries/:deliveryId', DeliveryController.delete);

routes.delete(
  '/problems/:problemId/cancel-delivery',
  OrderProblemController.delete
);

export default routes;
