"use client"
import React from 'react'
import { useState } from "react";
import { createUserWorkout } from '@/app/api/UserService';
import CreateWorkoutComponent from '@/components/CreateWorkoutComponent/CreateWorkoutComponent';

const CreateWorkout = ({ thisIsMySession }) => {
    const [submitting, setSubmitting] = useState(false)
    const [workout, setworkout] = useState()


    const createWorkout = async (e) => {
        // e.preventDefault()
        setSubmitting(true)

        try {
            const res = await createUserWorkout(workout)
            setSubmitting(false)
        } catch {

        }
    }

    return (
        <>
            {thisIsMySession}
            <CreateWorkoutComponent createWorkoutHandle={createWorkout} />
        </>
    )
}

export default CreateWorkout