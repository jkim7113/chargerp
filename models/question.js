import { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    body: {
        type: String,
        required: [true, 'Body is required! Please fill in the details section.']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required!']
    },
});

const Question = models.Question || model('Question', QuestionSchema);

export default Question;