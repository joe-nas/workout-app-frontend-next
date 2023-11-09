"use client";
import { updateProfile } from "@/app/api/UserService";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

const UserProfileComponent = ({ name, image, metric, email }) => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (updatedData) => {
    // updateProfile(oauthId, jwt, updatedData);
    console.log(updatedData);
  };

  return (
    <div className="flex w-1/3 p-5">
      <form id="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <InputField
            name="username"
            label="Username"
            placeholder={name}
            register={register}
            id="username"
          />
          <InputField
            name="image"
            label="Profile Image"
            placeholder={image}
            register={register}
            id="image"
          />
          <InputField
            name="email"
            label="Email"
            placeholder={email}
            register={register}
            id="email"
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

function InputField({ label, placeholder, register, name }) {
  return (
    <div key={placeholder?.replace(" ", "-")}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        {...register(name)}
        type="text"
        placeholder={placeholder}
        className="input w-full max-w-xs"
      />
    </div>
  );
}

const SubmitButton = () => {
  return (
    <button className="btn btn-primary rounded-full" type="submit">
      Save
    </button>
  );
};

export default UserProfileComponent;
