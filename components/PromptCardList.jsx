import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, handleDelete }) => (
  <div className="mt-10 prompt_layout">
    {data.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={() => handleTagClick && handleTagClick(post)}
        handleDelete={() => handleDelete && handleDelete(post)}
      />
    ))}
  </div>
);

export default PromptCardList;
