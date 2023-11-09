import { apiClient } from "./ApiClient";


export const exerciseDbStats = async () => {
    const res = await apiClient.get("/api/stats",
        {
            headers: {
                "Content-Type": "application/json",
            },
        });
    return res;
};
