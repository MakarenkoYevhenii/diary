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

function Body() {
  const [open, setOpen] = useState(false);
  const [moneyList, setMoney] = useState([]);
  const [id, setId] = useState("");
  const [filter, setFilter] = useState("");
  const userToken = useSelector(getToken, shallowEqual);
  const loginUser = useSelector(getLogin, shallowEqual);

  console.log(loginUser);
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
      setMoney(result);
    } catch (error) {
      // console.log(error);
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
    const { name, value } = target;
    setFilter(value);
  };

  const filtere = () => {
    return moneyList.filter((id) => {
      return id.name.includes(filter);
    });
  }
  return !loginUser ? (
    "Loading"
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название </TableCell>
            <TableCell align="right">Дата</TableCell>
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
  );
}

export default Body;
