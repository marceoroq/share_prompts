import Profile from "@components/Profile";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }) {
  const userId = (await params).id;

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/prompt?userId=${userId}`);
  const posts = await response.json();

  if (!posts) notFound();

  const username = posts[0].creator.username;

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  );
}
