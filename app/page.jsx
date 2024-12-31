import Feed from "@components/Feed";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/prompt`);
  const posts = await response.json();

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptVerse is an open-source platform for discovering, creating, and sharing innovative AI
        prompts in the modern world.
      </p>
      <Feed posts={posts} />
    </section>
  );
}
