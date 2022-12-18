import { useState, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import MainNav from '../MainNav'
import {useRouter} from 'next/router'

const initialRows = ["гвозди", "шурупы", "доски", "булки и конфетки"];

export default function TypeCosts() {
  const [newValue, setNewValue] = useState("");
  const [rows, setRows] = useState(() => initialRows);

  const onChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewValue(event.target.value);
  };

  const onBlur = () => {
    if (newValue) {
      setRows([newValue, ...rows]);
      setNewValue("");
    }
  };
  function add(){
    setRows([...rows, newValue]);
    setNewValue('');
    console.log('Добавили запись "', newValue, '"');
  };

function remove(index: number) {
    setRows([...rows.slice(0, index), ...rows.slice(index + 1)]);
    console.log('Удалили запись "', rows[index], '"');
 }
 const router = useRouter()

  return (
    <><MainNav></MainNav>
    <TableContainer component={Paper} sx={{ width: 240 }}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Виды издержек</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                      <TableCell>
                          <Autocomplete
                              id="combo-box-demo"
                              options={initialRows}
                              getOptionLabel={(option) => option}
                              renderInput={(params) => <TextField {...params} label="Искать" variant="standard" value={newValue}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  onKeyPress={event => {
                                      if (event.key === 'Enter') {
                                          add();
                                      }
                                  } } />} />
                      </TableCell>
                  </TableRow>
                  {rows.map((row, index) => (
                      <TableRow
                          key={index}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                          <TableCell>{row}</TableCell>
                          <TableCell>
                              <DeleteIcon fontSize="small" onClick={() => remove(index)} />
                          </TableCell>
                      </TableRow>

                  ))}
              </TableBody>
          </Table>
      </TableContainer></>
  );
}
