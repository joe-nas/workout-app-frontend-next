"use client";
import { updateProfile } from "@/app/api/UserService";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserProfileComponent = ({ username, email }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (updatedData) => {
    if (session?.user.oauthId) {
      try {
        updateProfile(session.user.oauthId, session.user.jwt, updatedData);
        router.reload();
        console.log(updatedData);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="flex mt-8 p-5 shadow-2xl shadow-black backdrop-opacity-90 bg-white/50 backdrop-blur-md rounded-lg">
      <form id="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <InputField
            name="username"
            label="Username"
            placeholder={username}
            register={register}
            id="username"
            validation={{
              required: { value: true, message: "Username is required" },
              minLength: { value: 1, message: "Username must be at least 1 character long" }
            }}
            errors={errors}
          />
          <InputField
            name="email"
            label="Email"
            placeholder={email}
            register={register}
            id="email"
            validation={{
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Please enter a valid email address"
              }
            }}
            errors={errors}
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

function InputField({ label, placeholder, register, name, validation, errors }) {
  return (
    <div key={placeholder?.replace(" ", "-")}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        {...register(name, { ...validation })}
        type="text"
        placeholder={placeholder}
        className="input w-full max-w-xs"
      />
      {errors[name] && <p>{errors[name].message}</p>}
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
