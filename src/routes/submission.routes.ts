import { Router } from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import submissionController from '../controllers/submission.controller';

const router: Router = Router();

router.post('/',isAuthenticated,submissionController.submitProblem);
router.post('/run',isAuthenticated,submissionController.runSubmission);
router.get('/:username', submissionController.getUserSubmissions);
router.put('/status',submissionController.updateProblemStatus)

module.exports = router;
