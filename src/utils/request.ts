import axios from "axios";
export const request = axios.create({
    baseURL: "http://localhost:8001",
    // baseURL: "http://192.168.131.110:8001",
    timeout: 10000,
    // headers: { "Content-Type": "application/json" },
});
