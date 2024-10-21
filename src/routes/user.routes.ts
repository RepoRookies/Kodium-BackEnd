import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import userController from '../controllers/user.controller';

const router: Router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', isAuthenticated, userController.logout);

module.exports = router;