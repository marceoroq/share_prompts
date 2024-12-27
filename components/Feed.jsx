"use client";
import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [value, setValue] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or an username"
          value={value}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} />
    </section>
  );
};

export default Feed;
