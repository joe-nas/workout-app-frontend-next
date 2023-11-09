"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaDumbbell } from "react-icons/fa";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <div className="navbar shadow-lg shadow-black/40 backdrop-blur-sm text-white font-bold">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Iron Delirium</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {session?.user ? (
            <li>
              <details>
                <summary className="backdrop-blur-3xl shadow-xl shadow-black/70 bg-secondary/80 mr-3">Workouts</summary>
                <ul className="p-2 text-white">
                  <li>
                    <div
                      onClick={() =>
                        router.push(`/user/${session?.user.oauthId}/workouts`)
                      }
                    >
                      Previous
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() =>
                        router.push(`/user/${session?.user.oauthId}/create`)
                      }
                    >
                      Create
                    </div>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <></>
          )}
          <li>
            <Link className="backdrop-blur-3xl shadow-xl shadow-black/70 bg-primary/50" href="/exercises">Exercises</Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {session?.user.image ? (
                <Image src={session?.user.image} width={30} height={30} />
              ) : (
                <FaDumbbell className="align-middle" size={40} />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 backdrop-blur-3xl shadow-xl shadow-black/70 bg-primary/80 rounded-box w-52"
          >
            <li>
              <div onClick={signOut}>Logout</div>
            </li>
            <li>
              <div onClick={signIn}>SignIn</div>
            </li>
            <li>
              <Link href="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
