"use client"
import React from 'react'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Workouts from '@/components/Workouts';
import { getUserWorkouts } from '@/app/api/UserService';

const ShowWorkouts = ({ workouts }) => {
    const { data: session } = useSession();

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        const fetchWorkouts = async () => {
            await getUserWorkouts(session.user.oauthId, session.user.jwt)
                .then(res => { setData(res?.data) })
                .then(setIsLoading(false))
        }

        if (session?.user.jwt) {
            fetchWorkouts()
        }

    }, [session])


    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Not found</div>
    if (data) return <Workouts data={data} oauthId={session.user.oauthId} />

}


export default ShowWorkouts