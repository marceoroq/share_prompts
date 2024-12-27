import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const tag = searchParams.get("tag");

  let query = {};

  if (userId) {
    query.creator = userId;
  }

  if (tag) {
    query.tag = tag;
  }

  try {
    await connectToDB();
    const prompts = await Prompt.find(query).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch prompts from DB", { status: 500 });
  }
};
