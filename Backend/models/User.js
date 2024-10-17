import mongoose from 'mongoose'
const {Schema} = mongoose;
const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    rollnumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    starred_q:{
        type:Boolean,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    no_of_q:{
        type:[String]
    },
    contest_given:{
        type:Boolean,
        default:false
    }
});

// export default mongoose.models.User
export default mongoose.model("User",UserSchema)