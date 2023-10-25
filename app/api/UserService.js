import { headers } from "@/next.config";
import { apiClient } from "./ApiClient";




export const getUser = async (oauthId) => {
  const res = await apiClient.get(
    `/api/user/${oauthId}`
  )
  return res
}

export const createUser = async (user) => {
  const newUser = await apiClient.post(
    "/api/user",
    user,
    { headers: { "Content-Type": "application/json" } }
  );
  return res
}

export const getUserWorkouts = async (oauthId, jwt) => {
  const res = await apiClient.get(
    `/api/user/${oauthId}/workouts`,
    {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Access-Control-Allow-Origin": "http://localhost:3000"
      }
    }
  )
  return res
}



// export const getUserWorkouts = async (oauthId, jwt) => {
//   const res = await fetch(
//     `http://localhost8080/api/user/${oauthId}/workouts`,
//     {
//       headers: {
//         "Authorization": `Bearer ${jwt}`,
//         "Access-Control-Allow-Origin": "http://localhost:3000",
//         Origin: "http://localhost:3000"
//       }
//     }
//   );
//   const data = await res.json();
//   return data;
// }

export const createUserWorkout = async (oauthId, jwt, workout) => {
  const res = await apiClient.post(
    `/api/user/${oauthId}/workouts`,
    {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json"
      }
    }
  )
}
