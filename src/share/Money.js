import axios from "axios";


  const addToken = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
  const instance = axios.create({
  baseURL: "http://localhost:4500/api/dails",
});
const auth=axios.create({
  baseURL:"http://localhost:4500/api/user/"
})

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
export const Login = async (userData) => {
  try {
    const data = auth.post(`/login`,{email:userData.login,password:userData.password});
    const token= (await data).data.token
   addToken(token);
  } catch (error) {
    console.log(error);
  }
};