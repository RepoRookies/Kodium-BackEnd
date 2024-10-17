import Question from "./models/Question.js"

export const createQuestion = async (req, res, next)=>{
    const newQuestion = new Question(req.body)
    try{
        const savedQuestion = await newQuestion.save()
        res.status(200).json()
    }catch(err){
        next(err);
    }
}

export const updateQuestion = async (req, res, next)=>{
    try{
        const updateQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { $set:req.body }, 
            {new: true})
        res.status(200).json(updateQuestion)
    }catch(err){
        next(err);
    }
}

export const getQuestion = async (req, res, next)=>{
    try{
        const QUESTION = await Question.findById();
        res.status(200).json(QUESTION);
    }catch(err){
        next(err);
    }
}

export const getQuestions = async (req, res, next)=>{
    try{
        const QUESTIONS = await Question.findById();
        res.status(200).json(QUESTIONS);
    }catch(err){
        next(err);
    }
}
