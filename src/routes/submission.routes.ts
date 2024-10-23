import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import submissionController from '../controllers/submission.controller';

const router: Router = Router();

router.post('/',submissionController.submitProblem);
router.get('/', submissionController.getUserSubmissions);
router.put('/status',submissionController.updateProblemStatus)

module.exports = router;
