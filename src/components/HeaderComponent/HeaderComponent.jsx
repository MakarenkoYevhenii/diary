import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "../../share/component/Modal/Modal";
import { useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getLogin } from "../../redux/auth/auth-selector";

import { login, logout, signup } from "../../redux/auth/auth-operation";

function Header() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const [version,setVersion]=useState("")
  const dispatch = useDispatch();
  const userIsLogin = useSelector(getLogin, shallowEqual);
  const handleOpen = (name) => {setOpen(true)
    setVersion(name)
  };
  const handleClose = () => setOpen(false);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitForm = (e) => {
    e.preventDefault();

    if(version==="login"){
    return  dispatch(login(data));
    }
     return dispatch(signup(data))
  };
 const logOut=()=>{
  dispatch(logout())
 }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Spends Money
            </Typography>
            {userIsLogin ? (
              <Button color="inherit" onClick={logOut}>
                logout
              </Button>
            ) : (<>
              <Button color="inherit" onClick={()=>handleOpen("login")} >
                 Login
              </Button>
              <Button color="inherit" onClick={()=>handleOpen("register")}>
                 register
              </Button></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Modal
        version={version}
        ModalOpen={open}
        handleClose={() => handleClose}
        handleChange={() => handleChange}
        handleSumbit={() => submitForm}
      />
    </>
  );
}
export default Header;
