import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginLeft:10
  },
}));

export default function TableData({result}) {
  const classes = useStyles();
  const [graduated, setGraduated] = React.useState('all');
  const [filltred, setFilltred] = React.useState([]);

  
  const handleChange = (event) => {
    setGraduated(event.target.value);
  };

  useEffect(() => {
    if(graduated === 'all') {
      setFilltred(result);
    }else {
      const newResult = result.filter(el => el.graduated === graduated)
      setFilltred(newResult);
    }
    
  }, [graduated])

  useEffect(() => {
    setFilltred(result);
  }, [result])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.no</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="center">Country</TableCell>
            <TableCell align="center">Graduated 
                <Select
                  value={graduated}
                  onChange={handleChange}
                  // displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value="all" > All </MenuItem>
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filltred.length > 0 ?
          filltred.map((row ,key) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {key+1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.country}</TableCell>
              <TableCell align="center">{row.graduated === false ?'False':'True'}</TableCell>
            </TableRow>
          )):
          <TableRow style={{textAlign:"center"}} scope="row">
            <TableCell align="center"> </TableCell>
            <TableCell align="center"> </TableCell>
            <TableCell align="center"> No Data </TableCell>
            <TableCell align="center"> </TableCell>
          </TableRow>
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}