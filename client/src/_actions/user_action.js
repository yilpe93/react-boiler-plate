import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit) {
  const res = axios
    .post("/api/users/login", dataToSubmit)
    .then(res => res.data);

  return {
    type: LOGIN_USER,
    payload: res
  };
}

export function registerUser(dataToSubmit) {
  const res = axios
    .post("/api/users/resigter", dataToSubmit)
    .then(res => res.data);

  return {
    type: REGISTER_USER,
    payload: res
  };
}

export function auth(dataToSubmit) {
  const res = axios.get("/api/users/auth", dataToSubmit).then(res => res.data);

  return {
    type: AUTH_USER,
    payload: res
  };
}
