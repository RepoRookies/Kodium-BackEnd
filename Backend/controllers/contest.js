import Contest from ".../models/Contest.js"

export const createContest = async (req, res, next)=>{
    const newContest = new Contest(req.body)
    try{
        const savedContest = await newContest.save()
        res.status(200).json()
    }catch(err){
        next(err);
    }
}

export const updateContest = async (req, res, next)=>{
    try{
        const updateContest = await Contest.findByIdAndUpdate(
            req.params.id,
            { $set:req.body }, 
            {new: true})
        res.status(200).json(updateContest)
    }catch(err){
        next(err);
    }
}

export const deleteContest = async (req, res, next)=>{
    const delContest = new Contest(req.body)
    try{
        const savedContest = await delContest.save()
        res.status(200).json()
    }catch(err){
        next(err);
    }
}