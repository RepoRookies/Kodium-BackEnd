import mongoose from 'mongoose'
const {Schema} = mongoose;
const QuestionSchema = new mongoose.Schema({
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

// export default mongoose.models.Question
export default mongoose.model("Question",QuestionSchema)