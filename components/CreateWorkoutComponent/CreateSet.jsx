import React from "react";
import { useFieldArray } from "react-hook-form";

export default function CreateSet({ nestIndex, control, register }) {
  // unpacking the useFieldArray hook, and setting the array name to "exercises"
  const { fields, remove, append } = useFieldArray({
    control,
    name: `exercises.${nestIndex}.sets`,
  });

  return (
    <div name="sets">
      {fields.map((set, index) => {
        return (
          <div key={set.id}>
            <div className="join m-2">
              <button className="btn rounded-l-full join-item">
                Set {index + 1}
              </button>
              <input
                {...register(`exercises.${nestIndex}.sets.${index}.reps`, {
                  required: true,
                  min: 1,
                })}
                type="number"
                placeholder="Reps"
                className="input input-bordered join-item"
              />
              <input
                {...register(`exercises.${nestIndex}.sets.${index}.weight`, {
                  required: true,
                  min: 0,
                })}
                type="number"
                placeholder="Weight"
                className="input input-bordered bordered join-item"
              />
              <input
                {...register(`exercises.${nestIndex}.sets.${index}.rpe`, {
                  required: false,
                  min: 1,
                  max: 10,
                })}
                type="number"
                placeholder="RPE"
                className="input input-bordered bordered join-item"
              />
              <input
                {...register(`exercises.${nestIndex}.sets.${index}.done`, {
                  required: false,
                })}
                placeholder="Done"
                type="checkbox"
                className="toggle toggle-lg join-item h-12"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn join-item rounded-r-full"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() =>
          append({
            setNumber: fields.length + 1,
            reps: "",
            weight: "",
            rpe: "",
            done: "",
          })
        }
        className="btn mt-2"
      >
        Add Set
      </button>
      <hr className="py-3" />
    </div>
  );
}