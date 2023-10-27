"use server";

import React from "react";
import chalk from "chalk";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import UserProfileComponent from "@/components/UserProfileComponent";
import { getUser } from "../api/UserService";

const Profile = async () => {
  try {
    const session = await getServerSession(authOptions);
    const user = await getUser(session.user.oauthId);

    const handleEdit = () => {};
    const handleDelete = () => {};

    return (
      <UserProfileComponent
        name={session.user.name}
        image={session.user.image}
        metric={user.metric}
        handleSave={handleSave}
      />
    );
  } catch (err) {
    // throw new Error(chalk.red("Error in Profile.jsx: "))
    console.log(chalk.red("Error in Profile.jsx: "), err);
  }
  return;
};

export async function handleSave(formData) {
  console.log(formData);
}

export default Profile;
