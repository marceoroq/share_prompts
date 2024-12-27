"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
  const router = useRouter();
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

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

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
      name={session?.user.name || "Your"}
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
