"use client"
import React from 'react'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Workouts from '@/components/Workouts';
import { getUser, getUserWorkouts } from '@/app/api/UserService';

const ShowWorkouts = () => {
    const { data: session } = useSession();
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                if (session?.user.jwt) {
                    console.log("session,user.jwt", session.user.jwt)
                    const userWorkouts = await getUserWorkouts(session.user.oauthId, session.user.jwt)
                    setData(userWorkouts.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }


        if (session?.user.jwt) {
            fetchWorkouts()
        }

    }, [session])

    console.log("session", data)

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Not found</div>
    if (data) return <Workouts data={data} oauthId={session.user.oauthId} jwt={session.user.jwt} />


}


export default ShowWorkouts