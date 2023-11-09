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
              {/* Set Number */}
              <button className="btn btn-primary rounded-l-full join-item">
                Set {index + 1}
              </button>

              {/* Reps */}
              <input
                {...register(`exercises.${nestIndex}.sets.${index}.reps`, {
                  required: true,
                  min: 1,
                })}
                type="number"
                placeholder="Reps"
                className="input input-bordered join-item w-24"
              />

              {/* Weight */}
              <input
                {...register(`exercises.${nestIndex}.sets.${index}.weight`, {
                  required: true,
                  min: 0,
                })}
                type="number"
                placeholder="Weight"
                className="input input-bordered bordered join-item w-24"
              />

              {/* RPE */}
              <input
                {...register(`exercises.${nestIndex}.sets.${index}.rpe`, {
                  required: false,
                  min: 1,
                  max: 10,
                })}
                type="number"
                placeholder="RPE"
                className="input input-bordered bordered join-item w-24"
              />

              {/* Done */}
              <input
                {...register(`exercises.${nestIndex}.sets.${index}.done`, {
                  required: false,
                })}
                placeholder="Done"
                type="checkbox"
                className="toggle toggle-primary toggle-lg join-item h-12 w-8"
              />

              {/* Delete Set */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-primary join-item rounded-r-full"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {/* Add Set */}
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
        className="btn btn-primary mb-2 ml-2 justify-left"
      >
        Add Set
      </button>
    </div>
  );
}
