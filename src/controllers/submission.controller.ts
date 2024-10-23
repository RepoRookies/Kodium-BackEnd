import { Request, Response } from 'express';
import { Admin } from '../models/user.model';
import { Problem } from '../models/problem.model';
import { Submission } from '../models/submission.model';
import { ISubmissionData, ISubmissionRequest } from '../interfaces/submission.interface';
import problemController from '../controllers/problem.controller';
import axios from "axios"
import { defaultMaxListeners } from 'events';


const submitProblem =  async (req: Request, res: Response): Promise<void> => {
    try{
        const languageLookup  = {
            "cpp": 54,
            "java": 62,
            "python": 71,
        }


        const submsissionDetails : ISubmissionRequest = req.body
        console.log(submsissionDetails)
        const problem = await Problem.findOne({ title: submsissionDetails.problemTitle });
        if (!problem) {
            res.status(404).json({ message: 'Problem Does Not Exist', success: false });
            return; 
        }
        const submission = new Submission({...submsissionDetails,verdict:"Running",username:req.cookies.user.username})

        // console.log(submission)
        const protocol = req.protocol;
        let  host = req.hostname;
        host = host=="localhost"?"host.docker.internal":host
        const port = parseInt(process.env.PORT as string) || 3000;
        const hostUrl = `${protocol}://${host}:${port}`

        const submissionID = submission._id
        const testCases = problem.exampleTestCases.concat(problem.actualTestCases||[])

        const judge0Payload : any[]= testCases.map( (tc,index) => {
            if(!tc)return
            const payload = {
                source_code: Buffer.from(submsissionDetails.program).toString('base64'),
                stdin: Buffer.from(tc.input).toString('base64'),
                expected_output: Buffer.from(tc.output).toString('base64'),
                language_id: languageLookup[submsissionDetails.language as keyof typeof languageLookup],
                cpu_time_limit: problem.timeLimit || 1,
                memory_limit: problem.memoryLimit || 256000,
                cpu_extra_time: (problem.timeLimit || 1 ) * 0.1,
                number_of_runs : 3,
                callback_url:`${hostUrl}/app/v1/submission/status?id=${submission._id}&tc=${index+1}&total=${testCases.length}`
            }
            // console.log(payload)
            return payload
        })
        const judge = await axios.post(`${process.env.JUDGE0_URL}/submissions/batch?base64_encoded=true`,{submissions:judge0Payload})
        await submission.save()
        res.status(201).json({ message: 'Submission made Successfully', success: true, submission: submission });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: 'Error Adding Submission', success: false, error });
    }
}


const updateProblemStatus = async (req: Request, res: Response): Promise<void> => {
    try{
        // console.log(req.body)
        const status = req.body.status.description
        const id = req.query.id
        const tc = req.query.tc
        const total = req.query.total
        const submission = await Submission.findOne({_id:id})
        if(!submission){
            throw new Error(`Submission not found`)
        }
        if(submission.verdict !== `Running`){
            res.sendStatus(200)
            return;
        }
        if(status !== `Accepted`) submission.verdict = status
        else if(tc == total) submission.verdict = `Accepted`
        // console.log(submission)
        await submission.save()
        res.sendStatus(200)
    }
    catch(err){
        res.sendStatus(500)
    }

}

const getUserSubmissions = async (req:Request,res:Response): Promise<void> => {
    try{
        const username = req.params.username
        const submissions = await Submission.find({username:username}).sort({createdAt:-1})
        res.status(200).json({
            success:true,
            submissions:submissions
        })
    }
    catch(err){
         console.log(err)
        res.status(500).json({ message: 'Error Fetching Submission', success: false, err });
    }
}

// const getAllSubmissions = async (req: Request, res: Response): Promise<void> => {
//     const 
// }
export default{
    getUserSubmissions,
    submitProblem,
    updateProblemStatus
}