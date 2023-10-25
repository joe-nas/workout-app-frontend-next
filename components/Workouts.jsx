import React from "react";

const Workouts = ({data}) => {


  return (
    <div className="">
      <a href="/workouts/create" className="">
        Create Workout
      </a>
      <div className="grid grid-cols-4 grid-auto-rows-min">
        {data.map((workout) => (
          <div className="m-4 border rounded-md min-h-0" key={workout.id}>
            <h2 className="text-center">{workout.workoutName}</h2>
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






