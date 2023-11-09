import React from "react";

const ExerciseComponent = ({ exercise }) => {
  const { name, force, category, equipment, mechanic, instructions } = exercise;
  const muscleGroups = new Set([
    ...exercise.primaryMuscles,
    ...exercise.secondaryMuscles,
  ]);

  return (
    <div className="w-full max-w-screen-lg text-slate-50 flex flex-col p-5 justify-center rounded-lg m-5 backdrop-blur-lg bg-secondary/20 shadow-2xl shadow-black">
      <div className="text-xl">{name}</div>
      {/* BADGES */}
      <div>
        <span className="badge badge-primary m-1 shadow-sm">{force}</span>
        {equipment && (
          <span className="badge badge-secondary m-1 shadow-sm">{equipment}</span>
        )}
        <span className="badge badge-neutral m-1">{category}</span>
        <span className="badge badge-success m-1">{mechanic}</span>
        {muscleGroups.size > 0 &&
          [...muscleGroups].map((muscle, id) => (
            <span className="badge badge-accent  m-1" key={id}>
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
