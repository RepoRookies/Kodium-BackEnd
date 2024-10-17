import mongoose from 'mongoose'
const {Schema} = mongoose;
const BlogSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    starred_q:{
        type:Boolean,
        required:true
    }
});

// export default mongoose.models.Blog
export default mongoose.model("Blog",BlogSchema)