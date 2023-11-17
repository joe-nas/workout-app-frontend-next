import { headers } from "@/next.config";
import { apiClient } from "./ApiClient";
import chalk from "chalk";

// export const getUser = async (oauthId, jwt) => {
//   const res = await apiClient.get(`/api/user/${oauthId}`, {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   });
//   return res;
// };

export const getUser = async (oauthId, myJWT) => {
  const user = await fetch(`http://localhost:8080/api/user/${oauthId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${myJWT}`,
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    }
  });
  if (user.status === 200) {
    return await user.json();
  } else if (user.status === 404) {
    return false;
  }
}




export const checkIfUserExists = async (oauthId, myJWT) => {
  const user = await fetch(`http://localhost:8080/api/user/check/${oauthId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${myJWT}`,
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    }
  });
  if (user.status === 200) {
    return true;
  } else if (user.status === 404) {
    return false;
  }
}



export const deleteWorkout = async (oauthId, jwt, workoutId) => {
  const res = await apiClient.delete(`/api/workouts/delete/${workoutId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
  return res;
}


export const createUser = async (user, myJWT) => {
  console.log(chalk.bgMagentaBright("🥩🥩🥩 createUser: user: ", JSON.stringify(user)))
  const newUser = await fetch(`http://localhost:8080/api/user/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${myJWT}`,
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify(user)
  });
  if (newUser.status === 200) {
    return await user.json();
  }
}






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
  const receivedUserWorkouts = await fetch(
    `http://localhost:8080/api/user/${oauthId}/workouts`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      }
    }
  );
  if (receivedUserWorkouts.status === 200) {
    return await receivedUserWorkouts.json();
  } else if (receivedUserWorkouts.status === 404) {
    throw new Error("No workouts found");
  }
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


export const getStats = async (jwt) => {
  await fetch("http://localhost:8080/api/stats", {
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
      Authorization: `Bearer ${jwt}`,
    },
  });
}