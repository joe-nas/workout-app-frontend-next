import { headers } from "@/next.config";
import { apiClient } from "./ApiClient";

export const getUser = async (oauthId, jwt) => {
  const res = await apiClient.get(`/api/user/${oauthId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res;
};


export const deleteWorkout = async (oauthId, jwt, workoutId) => {
  const res = await apiClient.delete(`/api/workouts/delete/${workoutId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  return res;
}

export const createUser = async (user, jwt) => {
  const createdUser = await apiClient.post("/api/user", user, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const updateProfile = async (oauthId, jwt, user) => {
  const updatedProfile = await apiClient.put(
    `/api/user/${oauthId}/profile`,
    user,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );
  return updatedProfile;
};

export const getUserWorkouts = async (oauthId, jwt) => {
  const receivedUserWorkouts = await apiClient.get(
    `/api/user/${oauthId}/workouts`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );
  return receivedUserWorkouts
};

export const createUserWorkout = async (oauthId, jwt, workout) => {
  const createdUserWorkout = await apiClient.post(
    `/api/user/${oauthId}/workouts`,
    workout,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );
};
