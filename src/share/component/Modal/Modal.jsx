import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  return (
    <div>
      <Modal
        open={ModalOpen}
        onClose={handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleSumbit()}>
          <Box sx={style}>
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
              id="modal-modal-password-input"
              sx={{ width: "100%" }}
              onChange={handleChange()}
              name="password"
              placeholder="Password"
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
                  id="modal-modal-password-input"
                  sx={{ width: "100%" }}
                  onChange={handleChange()}
                  name="passwordRepeat"
                  placeholder="Password"
                ></Input>
              </>
            )}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              {validateEmail() || lengthPassword() || validatePassword() ? (
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
