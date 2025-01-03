"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleDelete }) => {
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    // TODO: move to a custom hook like useCopy (analize)
    setCopied(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link
          className="flex-1 flex justify-start items-center gap-3"
          href="/profile">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </Link>

        <div
          className="copy_btn"
          onClick={handleCopy}>
          <FontAwesomeIcon
            icon={copied ? faCheck : faCopy}
            alt={copied ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
            className="text-primary-orange"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-3">
          <p
            className="outline_red_btn cursor-pointer"
            onClick={handleDelete}>
            Delete
          </p>
          <Link
            className="green_btn cursor-pointer"
            href={`/update-prompt?id=${post._id}`}>
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
