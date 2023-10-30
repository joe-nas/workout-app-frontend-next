import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import CreateExercise from "./CreateExercise";
import { createUserWorkout } from "@/app/api/UserService";
// import axios from "axios";

const defaultValues = {
  dateCreated: new Date().toISOString(),
};

export default function CreateWorkoutComponent() {
  const { data: session, status } = useSession();
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
  const onSubmit = async (data) => {
    data.oauthId = session.user.oauthId;
    try {
      if (session) {
        const response = await createUserWorkout(
          session.user.oauthId,
          session.user.jwt,
          data
        );
        console.log(
          chalk.blueBright(
            `CreateWorkoutComponent: onSubmit: status code ${JSON.stringify(
              response.status
            )} - ${JSON.stringify(response.data)}`
          )
        );
      }
    } catch (error) {
      console.log(error);
    }

    console.log(JSON.stringify({ ...data }, null, 2));
  };

  return (
    <div className="flex flex-row justify-center shadow-xl ring-1 ring-slate-500 rounded-lg">
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
