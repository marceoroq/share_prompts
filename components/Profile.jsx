import PromptCardList from "./PromptCardList";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full flex justify-center items-center flex-col">
      <h1 className="head_text text-left self-baseline">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left self-baseline">{desc}</p>
      <PromptCardList
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default Profile;
