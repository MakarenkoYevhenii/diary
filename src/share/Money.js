import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzQyYmRiMjY5NDkwODA4MDM2MmEyYiIsImlhdCI6MTY2NDQzNzc1NiwiZXhwIjoxNjY0NDczNzU2fQ.tuZT2899szpK24gl5nRpI8MhLRaqzG3hKJoRoN-Hm7Q";

  const addToken = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
  const instance = axios.create({
  baseURL: "http://localhost:4500/api/dails",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const allMoney = async () => {
  try {
    const data = instance.get(`/`);
    return  (await data).data.contacts;
  } catch (error) {
    console.log(error);
  }
};
export const deleteItemFetch = async (id) => {
  try {
    const data = instance.delete(`/${id}`);
    return  (await data).data.contacts;
  } catch (error) {
    console.log(error);
  }
};
export const changeItemFetch = async (id,name,date,description,importance,value) => {
  try {
    const data = instance.patch(`/${id}`);
    return  (await data).data.contacts;
  } catch (error) {
    console.log(error);
  }
};
