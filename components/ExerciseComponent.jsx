import React from "react";
import exercises from "../data/exercises.json";

const ExerciseComponent = ({ exercise }) => {
  exercise = exercises[800];
  const { name, force, category, equipment, mechanic, instructions } = exercise;
  const muscleGroups = new Set([
    ...exercise.primaryMuscles,
    ...exercise.secondaryMuscles,
  ]);

  return (
    <div className="w-full max-w-screen-lg flex flex-col p-5 justify-center shadow-xl ring-1 ring-slate-500 rounded-lg">
      <div className="text-xl">{name}</div>
      {/* BADGES */}
      <div>
        <span className="badge m-1 shadow-md bg-red-300">{force}</span>
        {equipment && (
          <span className="badge m-1 shadow-md bg-teal-300">{equipment}</span>
        )}
        <span className="badge m-1 shadow-md bg-blue-300">{category}</span>
        <span className="badge m-1 shadow-md bg-cyan-300">{mechanic}</span>
        {muscleGroups.size > 0 &&
          [...muscleGroups].map((muscle, id) => (
            <span className="badge m-1 shadow-md bg-green-300" key={id}>
              {muscle}
            </span>
          ))}
      </div>
      <div className="divider">Instructions</div>
      <ul className="list-decimal m-5">
        {instructions.map((instruction, id) => (
          <li key={id}>{instruction}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseComponent;
