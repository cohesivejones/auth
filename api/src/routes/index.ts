import { Router } from 'express';
import * as controller from '../controllers';

const routes = () => {
  const router = Router();
  router.post('/login', controller.login);
  router.get('/verify', controller.verify);
  return router;
}
export default routes;
