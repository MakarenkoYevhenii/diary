import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import style from "./Modal.module.css";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//    bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 40,
// };

const MyModal = (open) => {
  const {
    ModalOpen,
    handleClose,
    handleChange,
    handleSumbit,
    version,
    validateEmail,
    validatePassword,
    lengthPassword,
  } = open;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Modal
        open={ModalOpen}
        onClose={handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSumbit()}>
          <Box className={style.modal} style={{ bgcolor: "background.paper" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              {version} form
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Login
            </Typography>
            <Input
              id="modal-modal-name-input"
              sx={{ width: "100%" }}
              onChange={handleChange()}
              name="email"
              placeholder="Email"
            ></Input>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Password
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              id="modal-modal-password-input"
              sx={{ width: "100%" }}
              onChange={handleChange()}
              name="password"
              placeholder="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            ></Input>
            {version !== "register" ? (
              ""
            ) : (
              <>
                {" "}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Password repeat
                </Typography>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="modal-modal-password-input"
                  sx={{ width: "100%" }}
                  onChange={handleChange()}
                  name="passwordRepeat"
                  placeholder="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                ></Input>
              </>
            )}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              {validateEmail() ||
              lengthPassword() ||
              (version === "register" && validatePassword()) ? (
                <Button
                  disabled={true}
                  variant="contained"
                  size="large"
                  sx={{ mr: 5 }}
                  type="submit"
                >
                  {version}{" "}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mr: 5 }}
                  type="submit"
                >
                  {version}{" "}
                </Button>
              )}

              <Button variant="contained" size="large" onClick={handleClose()}>
                close
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default MyModal;
