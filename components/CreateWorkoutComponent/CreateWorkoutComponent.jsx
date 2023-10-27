import React from "react";
import { useForm } from "react-hook-form";
import CreateExercise from "./CreateExercise";
import axios from "axios";

const defaultValues = {
  dateCreated: new Date().toISOString(),
};

export default function CreateWorkoutComponent() {
  // Form hooks
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });

  // Form submission
  function onSubmit(data) {
    data.username = "hardcodedUsername";
    axios
      .post("http://localhost:8080/api/workouts/create", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(JSON.stringify({ ...data }, null, 2));
  }

  return (
    <div className="flex flex-row justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-between px-7 pt-7">
          <WorkoutNameInputField register={register} />
          <SubmitWorkoutButton />
        </div>

        <div className="border rounded-md m-5">
          <CreateExercise
            {...{
              control,
              register,
              defaultValues,
              getValues,
              setValue,
              errors,
            }}
          />
        </div>
      </form>
    </div>
  );
}

const WorkoutNameInputField = ({ register }) => {
  return (
    <div>
      <input
        type="text"
        id="workoutName"
        placeholder="Enter A Workout Name"
        {...register("workoutName", { required: true })}
        className="input focus:outline-none "
      />
    </div>
  );
};

const SubmitWorkoutButton = () => {
  return (
    <button className="btn" type="submit">
      Submit Workout
    </button>
  );
};
