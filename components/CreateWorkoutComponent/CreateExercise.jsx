import React from "react";
import { useFieldArray } from "react-hook-form";
import CreateSet from "./CreateSet";

export default function Exercises({ control, register, setValue, getValues }) {
  // unpacking the useFieldArray hook, and setting the array name to "exercises"
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "exercises",
  });

  return (
    <div name="exercises">
      {fields.map((exercises, index) => {
        return (
          <div key={exercises.id}>
            <div className="flex flex-row p-3 justify-between">
              <input
                type="text"
                id="exerciseName"
                placeholder="Exercise Name"
                {...register(`exercises.${index}.exerciseName`)}
                className="input focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  remove(index);
                }}
                className="btn btn-danger"
              >
                Remove Exercise
              </button>
            </div>

            <CreateSet nestIndex={index} {...{ control, register }} />
          </div>
        );
      })}

      <section>
        <button
          type="button"
          onClick={() => {
            append({ exerciseName: "" });
          }}
          className="btn"
        >
          Add Exercise
        </button>
      </section>
    </div>
  );
}