import axios from "axios";


const auth=axios.create({
  baseURL:"http://podchitat.herokuapp.com/api/user/"
})
// const auth=axios.create({
//   baseURL:"http://localhost:4500/api/user/"
// })
const addToken = token => {
   auth.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const login = async (userData) => {
    try {
      const data = auth.post(`/login`,{email:userData.email,password:userData.password});
      const token= (await data).data.token
     addToken(token);
     return data
    } catch (error) {
      console.log(error);
    }
  };

  export const getCurrent = async (token) => {
    addToken(token);
      const {data: result} = await auth.get("/current");
      return result;
  }
  
  const logout =async()=>{
      const {data:result}=await auth.get("/logout")
      console.log(result);
      return result
  }



const signup =async(data)=>{
    const {data:result} =await auth.post("/signup",data)
    addToken(result.token)
    return result
}


const authApi={
    signup,
    login,
    logout,
    getCurrent
}
export default authApi