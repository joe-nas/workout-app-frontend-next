"use client"
import React from 'react'
import primaryMuscles from '@/data/primary-muscles'
import { useForm } from "react-hook-form";
import { useState } from 'react';

const ExerciseSearch = () => {
    const [data, setData] = useState("");
    const defaultValues = {}

    const {
        register,
        handleSubmit,
    } = useForm({ defaultValues });


    const onSubmit = async (data) => {
        console.log(JSON.stringify({ ...data }, null, 2));
    };

    return (
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
            <SelectBox register={register} options={primaryMuscles} />
            <Checkbox register={register} label="Push" name="push" />
            <Checkbox register={register} label="Pull" name="pull" />
            <Checkbox register={register} label="Static" name="static" />
            <p>{data}</p>
            <SubmitButton />
        </form>
    )
}

export default ExerciseSearch


const SubmitButton = () => {
    // const { pending } = useFormStatus()
    return (
        <button type="submit" className="btn btn-primary">Submit</button>
    )

}

const Checkbox = ({ register, label, name }) => {
    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">{label}</span>
                <input type="checkbox" className="checkbox" {...register(`${name}`)} />
            </label>
        </div>
    )
}

const SelectBox = ({ register, options }) => {
    return (
        <select {...register("primaryMuscles")} className="select select-bordered w-full max-w-xs">
            <option disabled selected>Primary Muscle</option>

            {options.map((option, index) => {
                return (
                    <option key={index} value={option}>{option}</option>
                )
            })}
        </select>
    )
}