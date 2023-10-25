"use client";

import React from "react";
import chalk from "chalk";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import UserProfile from "@/components/UserProfileComponent";
import { getUser } from "../api/UserService";
import { get, set } from "react-hook-form";

const Profile = () => {
    const { data: session } = useSession();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleEdit = () => { }
    const handleDelete = async () => { }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await getUser(session.user.oauthId)
                setIsLoading(false);
                setData(res.data);
            } catch (e) {
                console.log(e)
            }
        }
        if (session?.user.oauthId) {
            fetchUserProfile();
        }
    }, [session])

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Not found</div>

    return (
        <UserProfile
            name="Jonas Falck"
            description="Welcome to your personalized profile page"
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default Profile