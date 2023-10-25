'use client'
import { useState } from "react";
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from "next/router";

const UserProfileComponent = ({ name, description, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();


  return <div>
    <div>{name}</div>
    <div>{description}</div>
    <div>{JSON.stringify(data)}</div>
  </div>;
};

export default UserProfileComponent;
