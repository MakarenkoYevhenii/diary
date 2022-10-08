import { useEffect, useState } from "react";
import { allMoney, deleteItemFetch } from "../../share/Money";
import style from "./Body.module.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { getLogin, getToken, getUser } from "../../redux/auth/auth-selector";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { current } from "../../redux/auth/auth-operation";
import InputChange from "../../share/component/Input/Input";
import { Input } from "@mui/material";
import Charts from "../ChartsComponent/ChartsComponent";

function Body() {
  const [open, setOpen] = useState(false);
  const [moneyList, setMoney] = useState([]);
  const [id, setId] = useState("");
  const [filter, setFilter] = useState("");
  const userToken = useSelector(getToken, shallowEqual);
  const loginUser = useSelector(getLogin, shallowEqual);
  const [pomulka,setpomulka]=useState("")
  const [date,setDate]=useState("")
  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setId("");
  };

  const dispatch = useDispatch();

  const makeMoney = async () => {
    try {
      dispatch(current());
      const result = await allMoney(userToken);
      if(result.name==="AxiosError"){
         return setpomulka(result)
      }
      setMoney(result);
      filtere()
      
    } catch (error) {
    }
  };
  useEffect(() => {
    makeMoney();
  }, []);

  const deleteItem = (e) => {
    deleteItemFetch(e);
    setMoney(
      moneyList.filter((id) => {
        return id._id !== e;
      })
    );
  };
  const filterName = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  const filtere = () => {

    if(filter.length>0&&date.length>0){
      console.log("filterAndDate");
        return moneyList.filter((id)=>{
         if(id.name.includes(filter)&& id.date.substr(0, 10)===date ){
          return id
         } 
        })
      }
    if(date.length>0){
      return moneyList.filter((id)=>{
      return id.date.substr(0, 10)===date
    })
  }

    return moneyList.filter((id)=>{
      return id.name.includes(filter)})}


  console.log(date);
  return !loginUser ? (
    "Loading"
  ) : (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название </TableCell>
            <TableCell align="right"><Input type="date" onChange={(e)=>{setDate(e.target.value)}}/></TableCell>
            <TableCell align="right">Описание</TableCell>
            <TableCell align="right">Категория</TableCell>
            <TableCell align="right">Стоимость </TableCell>
            <TableCell align="right">
              {" "}
              <Button variant="contained" onClick={() => handleOpen()}>
                добавить нового
              </Button>
            </TableCell>
            <TableCell align="right">
              <Input
                id="modal-modal-name-input"
                sx={{ width: "100%" }}
                onChange={filterName}
                name="filter"
                value={filter}
              ></Input>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtere().map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.date.substr(0, 10)}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.importance}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="right">
                <Button variant="contained" onClick={() => handleOpen(row._id)}>
                  Изменить
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" onClick={() => deleteItem(row._id)}>
                  Удалить
                </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <InputChange
        ModalOpen={open}
        id={id}
        handleClose={() => handleClose}
        fetchNew={() => makeMoney()}
      ></InputChange>
    </TableContainer>
  <Charts moneyList={filtere()}></Charts>
    </>
  );
}

export default Body;
