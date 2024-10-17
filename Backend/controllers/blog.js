import Blog from ".../models/Blog.js"

export const createBlog = async (req, res, next)=>{
    const newBlog = new Blog(req.body)
    try{
        const savedBlog = await newBlog.save()
        res.status(200).json()
    }catch(err){
        next(err);
    }
}

// It is upto you whether you wish to update the blogs 

/*
export const updateBlog = async (req, res, next)=>{
    try{
        const updateBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set:req.body }, 
            {new: true})
        res.status(200).json(updateBlog)
    }catch(err){
        next(err);
    }
}
*/

// Only Admins are given the power to delete blogs

/*
export const deleteBlog = async (req, res, next)=>{
    const delBlog = new Blog(req.body)
    try{
        const savedBlog = await delBlog.save()
        res.status(200).json()
    }catch(err){
        next(err);
    }
}
*/