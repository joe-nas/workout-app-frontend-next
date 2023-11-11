import React from "react";
import Link from "next/link";
import { deleteWorkout } from "@/app/api/UserService";


const Workouts = ({ data, oauthId, jwt }) => {
  return (
    <div className="">
      {/* <button href= className="btn rounded-md ml-4  shadow-xl ring-1 ring-slate-500 rounded-lg"> */}
      <Link href={`/user/${oauthId}/create`} className="btn btn-primary ml-4 shadow-xl">Create Workout</Link>
      {/* </button> */}
      <div className="grid grid-flow-row-dense lg:grid-cols-4 md:grid-cols-3 grid-auto-rows-min sm:grid-cols-2 ">
        {data.map((workout) => (
          <div className="m-4 min-h-0 rounded-lg  min-w-min backdrop-blur-lg bg-secondary/20 shadow-2xl shadow-black" key={workout.id}>
            <h2 className="text-center">{workout.workoutName}</h2>
            <DeleteWorkoutButton id={workout.id} jwt={jwt} oauthId={oauthId} />
            {workout.exercises.map((exercise) => (
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;

const deleteWorkoutWithId = async (id, jwt, oauthId) => {
  try {
    await deleteWorkout(oauthId, jwt, id);
    // const response = await axios.delete(`/api/workouts/${id}`);
    // console.log(response);
    console.log("delete workout with id: ", id);
  } catch (err) {
    console.log(err);
  }
}

const DeleteWorkoutButton = ({ id, jwt, oauthId }) => {
  return (
    <div className="flex justify-center">
      <button className="btn btn-primary" onClick={() => deleteWorkoutWithId(id, jwt, oauthId)}>Delete Workout</button>
    </div>
  )
}




