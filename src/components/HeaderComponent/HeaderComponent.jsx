import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "../../share/component/Modal/Modal";
import { useEffect, useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getLogin } from "../../redux/auth/auth-selector";

import { login, logout, signup } from "../../redux/auth/auth-operation";

const initialStateData = { email: "", password: "", passwordRepeat: "" };
function Header() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ ...initialStateData });
  const [version, setVersion] = useState("");

  const dispatch = useDispatch();
  const userIsLogin = useSelector(getLogin, shallowEqual);

  const handleOpen = (name) => {
    setOpen(true);
    setVersion(name);
  };

  const handleClose = () => {
    setOpen(false);
    setData({ ...initialStateData });
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateEmail = () => {
    const vakidate = String(data.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!vakidate) {
      return true;
    }
    return false;
  };
  const validatePassword = () => {
    if (data.password === data.passwordRepeat) {
      return false;
    }
    return true;
  };
  const lengthPassword = () => {
    if (data.password.length < 5) {
      return true;
    }
    return false;
  };
  const submitForm = (e) => {
    e.preventDefault();

    if (version === "login") {
      return dispatch(login(data));
    }
    if (version === "register") {
      return dispatch(signup(data));
    }
  };

  const logOut = () => {
    dispatch(logout());
  };
  useEffect(() => {
    console.log("fdjsfkj");
    if (userIsLogin) {
      setOpen(false);
    }
  }, [userIsLogin]);

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
            ) : (
              <>
                <Button color="inherit" onClick={() => handleOpen("login")}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => handleOpen("register")}>
                  register
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Modal
        validatePassword={validatePassword}
        validateEmail={validateEmail}
        lengthPassword={lengthPassword}
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
