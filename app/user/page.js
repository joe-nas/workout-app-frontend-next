import React from "react";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth";


const Home = async (req) => {

  const session = await getServerSession(authOptions)

  console.log("Session:", session)
  return <div className="text-center mt-20">
    <h1 className="text-5xl font-bold">{session.user.oauthId}</h1>
  </div>;
};

export default Home;