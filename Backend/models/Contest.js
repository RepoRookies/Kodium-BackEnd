import mongoose from 'mongoose'
const {Schema} = mongoose;
const ContestSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        required: true
    },
    questions: {
        type: [String],
        required: true
    }
});

// export default mongoose.models.Contest
export default mongoose.model("Contest",ContestSchema)