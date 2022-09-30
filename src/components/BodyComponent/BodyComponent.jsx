import { useEffect, useState } from "react";
import { allMoney, deleteItemFetch } from "../../share/Money";
import style from "./Body.module.css"


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


function Body() {
  const [moneyList, setMoney] = useState([]);
  useEffect(() => {
    const makeMoney = async () => {
      try {
        console.log("askdkfskd");
        const result = await allMoney();
        setMoney(result);
      } catch (error) {
        console.log(error);
      }
    };
    makeMoney();
  }, []);

  const changeItem=(e)=>{
    
  }
  

  const deleteItem=(e)=>{
    deleteItemFetch(e)
    setMoney(moneyList.filter((id)=>{return id._id!==e}))
  }
  
return(
<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>Название </TableCell>
      <TableCell align="right">Дата</TableCell>
      <TableCell align="right">Описание</TableCell>
      <TableCell align="right">Важность</TableCell>
      <TableCell align="right">Стоимость </TableCell>
      <TableCell align="right"> </TableCell>
      <TableCell align="right"> </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {moneyList.map((row) => (
      <TableRow
        key={row._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.date.substr(0,10) }</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.importance}</TableCell>
        <TableCell align="right">{row.value}</TableCell>
        <TableCell align="right"><Button variant="contained" onClick={()=>changeItem(row._id)}>Изменить</Button></TableCell>
        <TableCell align="right"><Button variant="outlined" onClick={()=>deleteItem(row._id)}>Удалить</Button> </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
)
}

export default Body;
