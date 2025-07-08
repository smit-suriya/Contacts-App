import api from "../../../lib/axios";

type contactPayload = {
  name: string;
  email: string;
  phone: string;
};

export async function getContacts(search: string = "") {
  const response = await api.get("/contacts", {
    params: {
      search: search.trim() || undefined,
    },
  });
  return response.data;
}

export async function getContactByID(id: string) {
  const response = await api.get("/contacts/" + id);
  return response.data;
}

export async function createContact(data: contactPayload) {
  const response = await api.post("/contacts", data);
  return response.data;
}

export async function editContact(data: contactPayload, id: string) {
  const response = await api.put(`/contacts/${id}`, data);
  return response.data;
}

export async function deleteContact(id: string) {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
}
