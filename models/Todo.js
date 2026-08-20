import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Task is required'],
        trim: true
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false  
}
});

export default mongoose.model('Todo', todoSchema);