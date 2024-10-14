import mongoose, { Schema, Document } from "mongoose";
import { IFeedback as IFeedbackBase } from "src/types/feedback";

export interface IFeedback extends IFeedbackBase, Document {}

const feedbackSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  message: { type: String, required: true }
});

export default mongoose.model<IFeedback>("Feedback", feedbackSchema);