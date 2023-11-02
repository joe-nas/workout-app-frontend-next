import React from "react";

const ExerciseComponent = ({ exercise }) => {
  const { name, force, category, equipment, mechanic, instructions } = exercise;
  const muscleGroups = new Set([
    ...exercise.primaryMuscles,
    ...exercise.secondaryMuscles,
  ]);

  return (
    <div className="w-full max-w-screen-lg flex flex-col p-5 justify-center backdrop-blur-sm bg-white/30 shadow-md shadow-gray-400 ring-1 ring-slate-700 rounded-lg m-5">
      <div className="text-xl">{name}</div>
      {/* BADGES */}
      <div>
        <span className="badge m-1 shadow-sm shadow-slate-700 bg-red-600">{force}</span>
        {equipment && (
          <span className="badge m-1 shadow-sm shadow-slate-700 bg-teal-500">{equipment}</span>
        )}
        <span className="badge m-1 shadow-sm shadow-slate-700 bg-blue-500">{category}</span>
        <span className="badge m-1 shadow-sm shadow-slate-700 bg-cyan-500">{mechanic}</span>
        {muscleGroups.size > 0 &&
          [...muscleGroups].map((muscle, id) => (
            <span className="badge m-1 shadow-sm shadow-slate-700 bg-green-500" key={id}>
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
