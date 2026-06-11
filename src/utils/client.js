import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const client = axios.create({
    baseURL: `${API_URL}/api/v1`,
    withCredentials: true
});

// Request Interceptor
client.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;

        // 1. ADD THIS CONDITION: If it's a 401 AND NOT the login route
        if (
            error?.response?.status === 401 && 
            !prevRequest?.sent &&
            !prevRequest?.url?.includes("/users/login") // Don't refresh on login failure
        ) {
            prevRequest.sent = true;

            try {
                await axios.post(
                    `${API_URL}/api/v1/users/refresh-token`,
                    {},
                    { withCredentials: true }
                );

                return client(prevRequest);
            } catch (refreshError) {
                // If refresh fails (e.g., no cookie), clear auth state and reject
                return Promise.reject(refreshError);
            }
        }
        
        // Return the actual error (like "Invalid Password") to your SignIn component
        return Promise.reject(error);
    }
);

export default client;