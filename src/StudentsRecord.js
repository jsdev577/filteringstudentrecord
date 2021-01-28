import React from 'react'
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableData from './Components/TableData';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };
    const names = [
        'School #1',
        'School #2',
        'School #3',
        'School #4',
        'School #5',
        'School #6',
        'School #7',
        'School #8',
        'School #9',
        'School #10'
    ];

    function getStyles(name, selectedSchool, theme) {
    return {
        fontWeight:
        selectedSchool.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
    }
    
export default function StudentsRecord() {
    const classes = useStyles();
    const [country, setCountry] = React.useState('');
    const [selectedSchool, setSelectedSchool] = React.useState([]);
    const [result, setResult] = React.useState([]);
    const [schoolName, setSchoolName] = React.useState('');

    const theme = useTheme();
    
    const handleChange = (event) => {
        if(selectedSchool.length < 5) {
            setSelectedSchool(event.target.value);
        } 
    };

    const onSubmit = (e) => {
        if(selectedSchool.length > 0 && schoolName.length > 0 && country.length > 0) {
            e.preventDefault();
            if(selectedSchool.length <= 1) {
                alert('Select minimun 2 school');
            }else {
                const data = {
                    'country': country,
                    'schools': selectedSchool,
                    'classes': schoolName,
                };
                console.log("Api Data===>",data);
                axios({
                    method: 'post',
                    url: 'https://run.mocky.io/v3/ce6cb38a-7cd0-404a-b219-aadc7fab2f91',
                    data: data,
                }).then(res => {
                    console.log(res);
                    // console.log(res.data);
                    if(res.status === 200) {
                        const newResult = res.data.filter(el => el.country.toLowerCase().indexOf(country.toLowerCase()) !== -1)
                        setResult(newResult)
                        setCountry('')
                        setSchoolName('')
                        setSelectedSchool([])
                    }
                })
            }
        }
    } 


    return (
        <Container className="MuiRow">
        <Container maxWidth="sm">
        <form method="POST">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value.trim())}
                    required
                    >
                    <MenuItem value='Germany'>Germany</MenuItem>
                    <MenuItem value='India'>India</MenuItem>
                    <MenuItem value='France'>France</MenuItem>
                    <MenuItem value='Argentina'>Argentina</MenuItem>
                    <MenuItem value='Paraguay'>Paraguay</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">School</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selectedSchool}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                    required
                >
                {names.map((name) => (
                    <MenuItem key={name} value={name} style={getStyles(name, selectedSchool, theme)}>
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField 
                    id="standard-basic" 
                    label="Enter Class"
                    name="schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value.trim())} 
                    required/>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Button variant="contained" color="primary" type="submit" style={{marginTop:'15px'}} onClick={(e) => onSubmit(e)}>
                    Query
                </Button>
            </FormControl>
        </form>
                
        </Container>
        <Container style={{marginTop:'50px'}} maxWidth="lg">
            <TableData result={result}/>   
        </Container>
    </Container>
    )
}
