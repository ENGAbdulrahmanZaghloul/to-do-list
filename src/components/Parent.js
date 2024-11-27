import * as React from 'react';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from '../components/Todo'
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

// use contxt
import { TodoContext } from '../contexts/TodoContext';

// use effect
import { useEffect } from 'react';


// const initialArr = [
//   {
//     id:uuidv4(),
//     title:"قراءة كتاب",
//     details:"اااااالينلي",
//     isCompleted:false,
//   },
//   {
//     id:uuidv4(),
//     title:"قراءة كتاب",
//     details:"اااااالينلي",
//     isCompleted:false,
//   },
//   {
//     id:uuidv4(),
//     title:"قراءة كتاب",
//     details:"اااااالينلي",
//     isCompleted:false,
//   },
// ]
export default function Parent() {


const [tasksArr,setTasksArr] = useState([  {
    id:uuidv4(),
    title:"قراءة كتاب",
    details:"اااااالينلي",
    isCompleted:false,
  },])
  
  
const [inputTitle, setInputTitle] = useState("");


// filter the array
const [tasksType, setTasksType] = useState("all");
const completedTask = tasksArr.filter((t)=>{
  return t.isCompleted;
})
const nonCompletedTask = tasksArr.filter((t)=>{
  return !t.isCompleted;
})

  let tasksDisplayed = tasksArr;
  if(tasksType === "completed" ){
    tasksDisplayed = completedTask;
  }else if (tasksType === "non-completed"){
    tasksDisplayed = nonCompletedTask;
  }


function handleTaskType(e){
  setTasksType(e.target.value);
}

const tasks = tasksDisplayed.map((t)=>{
  return <Todo key={t.id} todoObj={t} />
})

function addClick() {
  const newTask = {
    id: uuidv4(),
    title: inputTitle,
    details: "No details field",
    isCompleted: false,
  };
  const allTasks = [...tasksArr, newTask]
  setTasksArr(allTasks); // أضف العنصر مباشرة
  localStorage.setItem("savedStates",JSON.stringify(allTasks))
  setInputTitle("")
}

useEffect(()=>{
  const storageTasks = JSON.parse(localStorage.getItem("savedStates")) ?? [];
  setTasksArr(storageTasks);
},[])
// params way  
// function handleCheckBtn(todoId){
//   // alert("from parent" + todoId)
//   const upgradeTask =tasksArr.map((t)=>{
//      if(t.id === todoId){
//       if(t.isCompleted === false){
//         t.isCompleted = true;
//       }else{
//         t.isCompleted = false;
//       }
//   }
//        return t;
  
//   })
//   setTasksArr(upgradeTask);
// }


    return (
    <TodoContext.Provider value={{tasksArr , setTasksArr}}>
          <Container maxWidth="sm">
             <Card sx={{ minWidth: 275 }} style={{maxHeight:"80vh",overflow:"scroll",}}>
          <CardContent>
           <Divider>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 30,fontWeight:"600" }}>
                To Do List
            </Typography>
          </Divider>
          
        <ToggleButtonGroup
            color="primary"
            exclusive
            aria-label="Basic button group"
            value={tasksType}
            onChange={handleTaskType}
            >
        <ToggleButton  value="all">ALL</ToggleButton>
        <ToggleButton value="completed">completed</ToggleButton>
        <ToggleButton value="non-completed">non-completed</ToggleButton>
          </ToggleButtonGroup>
        
        
        {/* all todos */}

          {tasks}
          
        {/* addind section */}
        <Grid container spacing={2} sx={{marginTop:"5px", width:"100%"}} >
        <Grid item xs={8}   display="flex" justifyContent="space-around" alignItems="center">
          <TextField id="outlined-basic" label="Add your task" variant="outlined" style={{width:"100%"} }
          value={inputTitle}
          onChange={(e)=>{
            // setInputTitle([...inputTitle, e.target.value])
            setInputTitle( e.target.value)
          }}
          />
        </Grid>
        
        <Grid item xs={4}   display="flex" justifyContent="space-around" alignItems="center" >
            <Button disabled={inputTitle.length == 0}
            onClick={()=>{
            addClick()}}
            variant="contained" endIcon={<AddIcon />} style={{width:"100%", height:"100%",backgroundColor:"#311b92"}}>
                Add
            </Button>
        </Grid>
        </Grid>
          </CardContent>
        </Card>
          </Container>
    </TodoContext.Provider>
    );
}