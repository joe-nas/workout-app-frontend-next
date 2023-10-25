"use client"
import React from 'react'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Workouts from '@/components/Workouts';
import { getUserWorkouts } from '@/app/api/UserService';

import workoutData from '@/workout';

const ShowWorkouts = () => {
    const { data: session } = useSession();
    const [jwt, setJwt] = useState(null)
    const [oauthId, setOauthId] = useState(null)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    console.log(workoutData)

    useEffect(() => {
        if (session) {
            setJwt(session.user.jwt)
            setOauthId(session.user.oauthId)
            getUserWorkouts(oauthId, jwt)
                .then(res => { setData(res.data) })
                .then(setIsLoading(false))
        }

    }, [session])


    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Not found</div>

    return (
        <Workouts data={workoutData} />
    )
}

export default ShowWorkouts