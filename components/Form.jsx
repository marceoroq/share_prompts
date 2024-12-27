import Link from "next/link";

const Form = ({ action, post, setPost, submitting, handleSubmit, isUserLogged }) => {
  const actionInProgressForm = action.slice(0, -1) + "ing...";

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{action} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {action} and share amazing prompts with the world, and let your imagination run wild with
        any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="my-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism self-center">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea "
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">(#product, #webdevelopment, #idea, etc.)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting || !isUserLogged}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white disabled:bg-slate-500">
            {submitting ? actionInProgressForm : action}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
