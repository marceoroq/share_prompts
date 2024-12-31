"use client";
import { useState } from "react";

import PromptCardList from "./PromptCardList";

const Feed = ({ posts }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredPost, setFilteredPost] = useState(posts);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterPosts = (query) => {
    const regex = new RegExp(query, "i");
    const filterPrompts = posts.filter(
      (item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
    );
    setFilteredPost(filterPrompts);
  };

  const handleSearchChange = ({ target }) => {
    clearInterval(searchTimeout);
    setSearchText(target.value.trim());
    setSearchTimeout(setTimeout(() => filterPosts(target.value.trim()), 500));
  };

  const handleTagClick = ({ tag }) => {
    setSearchText(tag);
    filterPosts(tag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or an username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPost}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
