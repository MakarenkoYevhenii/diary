import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import { changeItemFetch, createNewItem, findItemFetch } from "../../Money";

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

const InputChange = (open) => {
    const [data,setData]=useState([])
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      const submitForm = (e) => {
        e.preventDefault();
        if (open.id===""||open.id===undefined) {
            createNewItem(data)
            open.fetchNew()
            open.handleClose()
            return setData("")
        }
        changeData()
        open.fetchNew()
        open.handleClose()
       return setData("")
      };
      const makeMoney = async () => {
        try {
          const result = await findItemFetch(open.id);
          setData(result);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        if (open.id===""||open.id===undefined) {
            return
        }
        makeMoney();
    }, [open.id]);
    const changeData = async()=>{
        const result=  await changeItemFetch(open.id,data)
    }
    const {ModalOpen,handleClose}=open
  return (
    <div>
      <Modal
        open={ModalOpen}
        onClose={handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={submitForm}>
          <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center"}}>
              Change Form
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Name
            </Typography>
            <Input id="modal-modal-name-input" sx={{width:"100%"}} onChange={handleChange} name="name" value={data.name}></Input>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Desription
            </Typography>
            <Input id="modal-modal-name-input" sx={{width:"100%"}} onChange={handleChange} name="description" value={data.description}></Input>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Category
            </Typography>
            <Input id="modal-modal-name-input" sx={{width:"100%"}} onChange={handleChange} name="importance" value={data.importance}></Input>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Value
            </Typography>
            <Input id="modal-modal-name-input" sx={{width:"100%"}} onChange={handleChange} name="value" value={data.value}></Input>
            <Box sx={{mt:2,textAlign:"center"}}>
              <Button variant="contained" size="large" sx={{mr:5}} type="submit">
               {open.id===""||open.id===undefined? "Create New":"Change Data" } {" "}
              </Button>
              <Button variant="contained" size="large" onClick={handleClose()} >
                close
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default InputChange;
