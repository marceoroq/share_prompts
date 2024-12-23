import Feed from "@components/Feed";

const Home = () => {
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
      <Feed />
    </section>
  );
};

export default Home;
