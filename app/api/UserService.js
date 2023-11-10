import { headers } from "@/next.config";
import { apiClient } from "./ApiClient";

export const getUser = async (oauthId) => {
  const res = await apiClient.get(`/api/user/${oauthId}`);
  return res;
};

export const createUser = async (user) => {
  const createdUser = await apiClient.post("/api/user", user, {
    headers: { "Content-Type": "application/json" },
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
        "Access-Control-Allow-Origin": "http://localhost:3000",
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
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
    }
  );
};
