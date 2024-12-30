"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvidersState = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvidersState();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 bg-red">
      <Link
        href="/"
        className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="promptverse logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">PromptVerse</p>
      </Link>

      {/*Desktop Navigation*/}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : providers ? (
          <>
            {Object.values(providers).map((provider) => (
              <div
                key={provider.name}
                className="flex gap-3 md:gap-5">
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <button
              type="button"
              disabled
              className="black_btn disabled">
              Sign In
            </button>
          </div>
        )}
      </div>

      {/*Mobile Navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() => setToggleDropdown((prevValue) => !prevValue)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown((prevValue) => !prevValue)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown((prevValue) => !prevValue)}>
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : providers ? (
          <>
            {Object.values(providers).map((provider) => (
              <div
                key={provider.name}
                className="flex gap-3 md:gap-5">
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              </div>
            ))}
          </>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <button
              type="button"
              disabled
              className="black_btn disabled">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
