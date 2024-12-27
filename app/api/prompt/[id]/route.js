import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  const { id } = await params;

  try {
    await connectToDB();

    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch prompts from DB", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { id } = await params;
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existPrompt = await Prompt.findById(id);

    if (!existPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existPrompt.prompt = prompt;
    existPrompt.tag = tag;

    await existPrompt.save();
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = await params;

  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt delete successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
