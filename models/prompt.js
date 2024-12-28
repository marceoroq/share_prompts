import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

/* Mongose stores the models created in models, so before creating the model
with model(), we must first check if the model does not already exist, to
avoid generating it every time the API is called. */
const Prompt = models?.Prompt || model("Prompt", PromptSchema);

export default Prompt;
