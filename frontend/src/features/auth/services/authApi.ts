import api from "../../../lib/axios";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterPayload) {
  const response = await api.post("/users/register", payload);
  return response.data;
}

export async function login(payload: LoginPayload) {
  const response = await api.post("/users/login", payload);
  return response.data;
}

export async function getCurrentUser() {
  const response = await api.get("/users/current");
  return response.data;
}
