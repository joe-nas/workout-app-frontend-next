import React from "react";
import exercises from "../data/exercises.json";

const ExerciseComponent = ({ exercise }) => {
  exercise = exercises[6];

  return (
    <div className="indicator">
      <span className="indicator-item badge badge-primary">
        {exercise.force}
      </span>
      <div className="card bg-secondary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{exercise.name}</h2>
          <ul>
            <li className="flex flex-row justify-between">
              <div>Force: {exercise.force}</div>
              <div>Primary Muscle: {exercise.primaryMuscles[0]}</div>
            </li>

            <li className="flex flex-row justify-between">
              <div>Category: {exercise.category}</div>
              {exercise.secondaryMuscles.length > 0 ? (
                <div>Secondary Muscle: {exercise.secondaryMuscles[0]}</div>
              ) : (
                <></>
              )}
            </li>
            <li>Level: {exercise.level}</li>
          </ul>
          <div className="card-actions justify-end">
            <button className="btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseComponent;
