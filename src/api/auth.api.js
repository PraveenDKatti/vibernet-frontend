import client from "./client.js";

export const login = (credentials) => 
    client.post("/users/login", credentials).then(res => res.data)


export const logout = () => 
    client.post("/users/logout").then(res => res.data)


export const refresh = () => 
    client.get("/users/refresh-token").then(res => res.data)


export const register = (data) => 
    client.post("/users/register", data).then(res => res.data)
