"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@components/Form";

export default function UpdatePromptPage({ searchParams }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { id: promptId } = use(searchParams);

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const fetchPostDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`);
      const data = await response.json();
      setPost({ prompt: data.prompt, tag: data.tag });
    };

    if (promptId) fetchPostDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      action="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
      isUserLogged={Boolean(session?.user)}
    />
  );
}
