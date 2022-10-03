import axios from "axios";


const addToken = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
const auth=axios.create({
    baseURL:"http://localhost:4500/api/user/"
  })
  
export const login = async (userData) => {
    try {
      const data = auth.post(`/login`,{email:userData.login,password:userData.password});
      console.log(await data);
      const token= (await data).data.token
     addToken(token);
    } catch (error) {
      console.log(error);
    }
  };




const signup =async(data)=>{
    const {data:result} =await axios.post("https://connections-api.herokuapp.com/users/signup/",data)
    addToken(result.token)
    return result
}

const logout =async()=>{
    const {data:result}=await axios.post("https://connections-api.herokuapp.com/users/logout/")
    return result
}
const getCurrent = async (token) => {
    addToken(token);
    const {data: result} = await axios.get("https://connections-api.herokuapp.com/users/current/");

    return result;
}


const authApi={
    signup,
    login,
    logout,
    getCurrent
}
export default authApi