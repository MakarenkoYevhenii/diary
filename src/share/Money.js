import axios from "axios";

  const instance = axios.create({
  baseURL: "https://podchitat.herokuapp.com/api/dails",
});
const addToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
export const allMoney = async (token) => {
  try {
    addToken(token)
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
export const changeItemFetch = async (id,userData) => {
  try {
    const data = instance.patch(`/${id}`,userData);
    return  (await data).data.contacts;
  } catch (error) {
    console.log(error);
  }
};
export const findItemFetch = async (id) => {
  try {
    const data = instance.patch(`/${id}`);
    return  (await data).data.contacts;
  } catch (error) {
    console.log(error);
  }
};
export const createNewItem = async (itenData) => {
  try {
    const data = instance.post(`/`,itenData);
    return  (await data).data.contacts;
  } catch (error) {
    console.log(error);
  }
};
