import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import problemController from '../controllers/problem.controller';

const router: Router = Router();

router.post('/add', isAuthenticated, problemController.addProblem);
router.get('/get/all', problemController.getProblems);
router.get('/get/:id', problemController.getProblemById);
router.delete('/delete/:id', isAuthenticated, problemController.deleteProblem);

module.exports = router;
