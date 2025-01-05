"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

export default function MyProfilePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt?userId=${session?.user.id}`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const filteredPosts = posts.filter((item) => item._id !== post._id);
          setPosts(filteredPosts);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My Profile"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={posts}
      handleDelete={handleDelete}
    />
  );
}
