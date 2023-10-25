"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);



  return (

    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Iron Delirium</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {session?.user ? (
            <li>
              <details>
                <summary>Workouts</summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <Link href="/user/:username/workouts">Previous</Link>
                  </li>
                  <li>
                    <Link href="/user/:username/workouts/create">Create</Link>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <></>
          )}
          <li>
            <a>Exercises</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <li key={provider.name}>
                      <button
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                      >
                        Sign In
                      </button>
                    </li>
                  ))}
                <li>
                  <button type="button" onClick={signOut}>
                    Logout
                  </button>
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
