"use client";
import { handleSave } from "@/app/profile/page";

const UserProfileComponent = ({ name, image, metric }) => {
  return (
    <form id="user-profile-form" onClick={handleSave}>
      <div className="flex flex-col form-control w-full max-w-xs">
        <InputField label="Change Username" placeholder={name} />
        <InputField label="Change profile Image" placeholder={image} />

        <div className="flex flex-row">
          <label>Metric: Kg</label>
          <input type="checkbox" className="toggle" />
          <label>Lbs</label>
        </div>

        {/* Buttons */}
        <SubmitButton />
      </div>
    </form>
  );
};

const InputField = ({ label, placeholder }) => {
  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="input w-full max-w-xs"
      />
    </div>
  );
};

const SubmitButton = () => {
  return (
    <button className="btn btn-primary rounded-full" type="submit">
      Save
    </button>
  );
};

export default UserProfileComponent;
