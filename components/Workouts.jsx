"use client"
import React from "react";
import Link from "next/link";
import { deleteWorkout, getUserWorkouts } from "@/app/api/UserService";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { set } from "lodash";
import { useForm } from "react-hook-form";

const Workouts = () => {
  const { data: session } = useSession();
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [oauthId, setOauthId] = useState(null)
  const [jwt, setJwt] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        if (session?.jwt) {
          const userWorkouts = await getUserWorkouts(session.user.oauthId, session.jwt)
          console.log(userWorkouts)
          setData(userWorkouts)
          setJwt(session.jwt)
          setOauthId(session.user.oauthId)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }


    if (session?.jwt) {
      fetchWorkouts()
    }

  }, [session])


  const deleteAndReload = async (oauthId, jwt, id) => {
    try {
      await deleteWorkout(oauthId, jwt, id);
      const refreshData = await getUserWorkouts(oauthId, jwt)
      setData(refreshData)
    } catch (e) {
      console.log(e)
    };
  }

  const submitEditedWorkout = (formData) => {
    alert(JSON.stringify(formData));
    setEditMode(false)
  }

  const editWorkout = async (oauthId, jwt, id) => {
    setEditMode(true)
  }


  const EditWorkout = ({ data }) => {
    return (
      data.exercises.map((exercise) => (
        <div className="" key={exercise.exerciseName}>
          <h3 className="divider">{exercise.exerciseName}</h3>
          <div className="overflow-x-auto">
            {exercise.sets.map((set) => (
              <form key={set.setNumber} onSubmit={handleSubmit(submitEditedWorkout)}>
                <div className="flex justify-between">
                  <input {...register("set")} type="number" defaultValue={set.setNumber} />
                  <input {...register("reps")} type="number" defaultValue={set.reps} />
                  <input {...register("weight")} type="number" defaultValue={set.weight} />
                </div>
              </form>
            ))
            }

          </div>
        </div >
      )))
  }

  return (
    <div className="">
      <Link href={`/user/${oauthId}/create`} className="btn btn-primary ml-4 shadow-xl">Create Workout</Link >

      < div className="grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-3 grid-auto-rows-min sm:grid-cols-2 " >
        {isLoading ? (< div > Loading...</div>) :
          data.map((workout) => (
            <div className="m-4 min-h-0 rounded-lg  min-w-min backdrop-blur-lg bg-secondary/20 shadow-2xl shadow-black" key={workout.id}>
              <h2 className="text-center">{workout.workoutName}</h2>
              <div className="flex justify-center">

                <button className="btn btn-primary" onClick={() => deleteAndReload(oauthId, jwt, workout.id)}>Delete</button>


                {editMode
                  ? <button className="btn btn-primary mx-1" type="submit" onClick={handleSubmit(submitEditedWorkout)}>Submit</button>
                  : <button className="btn btn-primary mx-1" onClick={() => editWorkout(oauthId, jwt, workout.id)}>Edit</button>
                }


                <button className="btn btn-primary" onClick={() => repeatWorkout(oauthId, jwt, workout.id)}>Repeat</button>
              </div>
              {editMode
                ? <EditWorkout data={workout} />
                : <ShowWorkout data={workout} />}

            </div>
          ))
        }
      </div >
    </div >
  );
}

export default Workouts;


const ShowWorkout = ({ data }) => {
  return (
    data.exercises.map((exercise) => (
      <div className="" key={exercise.exerciseName}>
        <h3 className="divider">{exercise.exerciseName}</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th className="">Set Number</th>
                <th className="">Reps</th>
                <th className="">Weight</th>
              </tr>
            </thead>
            <tbody>
              {exercise.sets.map((set) => (
                <tr key={set.setNumber}>
                  <td className="">{set.setNumber}</td>
                  <td className="">{set.reps}</td>
                  <td className="">{set.weight}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
    ))

  )
}


