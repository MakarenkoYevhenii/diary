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
import InputLabel from "@mui/material/InputLabel";

import { current } from "../../redux/auth/auth-operation";
import InputChange from "../../share/component/Input/Input";
import {
  FormControl,
  Input,
  MenuItem,
  Select,
  TablePagination,
  TextField,
} from "@mui/material";
import Charts from "../ChartsComponent/ChartsComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { categories } from "../../share/categories";

function Body() {
  const [open, setOpen] = useState(false);
  const [moneyList, setMoney] = useState([]);
  const [id, setId] = useState("");
  const [filter, setFilter] = useState("");
  const userToken = useSelector(getToken, shallowEqual);
  const loginUser = useSelector(getLogin, shallowEqual);
  const [pomulka, setpomulka] = useState("");
  const [date, setDate] = useState(null);
  const [categori, setCategori] = useState("");

  // dfmsldkf;lsdkfskdd

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // dl;fksldfkl;sdkf

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
      if (result.name === "AxiosError") {
        return setpomulka(result);
      }
      setMoney(result);
      filtere();
    } catch (error) {}
  };
  useEffect(() => {
    makeMoney();
  }, [loginUser]);

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
    if (date !== null && filter.length > 0 && date.$d !== undefined) {
      console.log("filter and data");
      return moneyList.filter((id) => {
        if (
          id.name.includes(filter) &&
          moment(id.date.substr(0, 10)).format() ===
            moment(date._d.toDateString()).format()
        ) {
          return id;
        }
      });
    }
    if (categori.length > 0 && filter.length > 0) {
      console.log("categori and filter");
      return moneyList.filter((id) => {
        if (id.name.includes(filter) && id.importance === categori) {
          return id;
        }
      });
    }
    if (categori.length > 0 && filter.length > 0) {
      console.log("category and filter");
      return moneyList.filter((id) => {
        if (id.name.includes(filter) && id.importance === categori) {
          return id;
        }
      });
    }
    if (categori.length > 0 && date !== null && date._d !== undefined) {
      console.log("category and data");
      return moneyList.filter((id) => {
        if (
          moment(id.date.substr(0, 10)).format() ===
            moment(date._d.toDateString()).format() &&
          id.importance === categori
        ) {
          return id;
        }
      });
    }
    if (date !== null && date._d !== undefined) {
      console.log("prosto data");
      return moneyList.filter((id) => {
        return (
          moment(id.date.substr(0, 10)).format() ===
          moment(date._d.toDateString()).format()
        );
      });
    }
    if (categori.length > 0) {
      console.log("prosto categori");
      return moneyList.filter((id) => {
        if (id.importance === categori) {
          return id;
        }
      });
    }
    if (
      date !== null &&
      filter.length > 0 &&
      date.$d !== undefined &&
      categori.length > 0
    ) {
      console.log("vse srazu");
      return moneyList.filter((id) => {
        if (
          id.name.includes(filter) &&
          moment(id.date.substr(0, 10)).format() ===
            moment(date._d.toDateString()).format() &&
          id.importance === categori
        ) {
          return id;
        }
      });
    }
    return moneyList.filter((id) => {
      return id.name.includes(filter);
    });
  };

  const SetCategori = (e) => {
    setCategori(e.target.value);
  };

  return !loginUser || moneyList.length < 0 ? (
    <LoadingComponent></LoadingComponent>
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={style.header__table__Item} align="center">
                Название
              </TableCell>
              <TableCell className={style.header__table__Item} align="center">
                {" "}
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Дата"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </TableCell>
              <TableCell className={style.header__table__Item} align="center">
                Описание
              </TableCell>
              <TableCell className={style.header__table__Item} align="center">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Категория
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categori}
                    label="importance"
                    onChange={SetCategori}
                    name="importance"
                  >
                    {categories.map((categori) => {
                      return <MenuItem value={categori}>{categori} </MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell className={style.header__table__Item} align="center">
                Стоимость{" "}
              </TableCell>
              <TableCell className={style.header__table__Item} align="center">
                {" "}
                <Button variant="contained" onClick={() => handleOpen()}>
                  добавить нового
                </Button>
              </TableCell>
              <TableCell className={style.header__table__Item} align="center">
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
            {/* {filtere().map((row) => ( 
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.date.substr(0, 10)}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.importance}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleOpen(row._id)}
                  >
                    Изменить
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() => deleteItem(row._id)}
                  >
                    Удалить
                  </Button>{" "}
                </TableCell>
              </TableRow>
            ))}
          */}
            {filtere()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      {row.date.substr(0, 10)}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.importance}</TableCell>
                    <TableCell align="center">{row.value}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleOpen(row._id)}
                      >
                        Изменить
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => deleteItem(row._id)}
                      >
                        Удалить
                      </Button>{" "}
                    </TableCell>
                  </TableRow>
                );
              })}

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filtere().length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ width: "max-content" }}
            />
          </TableBody>
        </Table>
        <InputChange
          ModalOpen={open}
          id={id}
          handleClose={() => handleClose}
          fetchNew={() => makeMoney()}
        ></InputChange>
      </TableContainer>
      <div>
        <Charts moneyList={filtere()}></Charts>
      </div>
    </>
  );
}

export default Body;
