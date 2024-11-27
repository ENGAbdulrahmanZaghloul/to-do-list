import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import  '../css/todo.css'
import { useState } from 'react';
// dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// use context
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';




export default function Todo({todoObj , handleCheck}){
  const { tasksArr, setTasksArr } = useContext(TodoContext);
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const  [showUpdateDialog, setShowUpdateDialog]  = useState(false);
  const [updateTodo, setUpdateTodo] = useState({ title: todoObj.title, details:todoObj.details });
function handleCheckBtn(){
  // handleCheck(todoObj.id);    params way
    const upgradeTask =tasksArr.map((t)=>{
     if(t.id === todoObj.id){
      if(t.isCompleted === false){
        t.isCompleted = true;
      }else{
        t.isCompleted = false;
      }
  }
       return t;
  
  })
  setTasksArr(upgradeTask);
  localStorage.setItem("savedStates",JSON.stringify(upgradeTask))
}
function handleDeleteBtn(){
  setshowDeleteDialog(true);
}
function dialogClosing(){
  setshowDeleteDialog(false);
}
function handleUpdateBtn(){
  setShowUpdateDialog(true);
}
function UpdateDialogClosing(){
  setShowUpdateDialog(false);
}

function confirmDelete(){
  const DeleteTask = tasksArr.filter((t)=>{
    if(t.id === todoObj.id){
      return false;
    }else{
      return true
    }
  })
  setTasksArr(DeleteTask)
  localStorage.setItem("savedStates",JSON.stringify(DeleteTask))
}
function confirmUpdate(){
  // alert("confirmed");
  const UpdatingTask = tasksArr.map((t)=>{
    if(t.id === todoObj.id){
      return {...t , title:updateTodo.title,details:updateTodo.details}
    }else {
      return t;
    }
    
  })
  setTasksArr(UpdatingTask)
  localStorage.setItem("savedStates",JSON.stringify(UpdatingTask))
  setShowUpdateDialog(false)
}


return(
<>

{/* delete dialog */}
 <Dialog
        open={showDeleteDialog}
        onClose={dialogClosing}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are youe sure , you will delete this task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            !!!Warning, you can't restore the task again
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClosing}>close</Button>
          <Button onClick={confirmDelete}>yes,delete</Button>
        </DialogActions>
      </Dialog>
{/* delete dialog */}
{/* update dialog */}

 <Dialog
        open={showUpdateDialog}
        onClose={UpdateDialogClosing}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update your task"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            !!!Warning, you can't restore the task again
          </DialogContentText> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e)=>{
              setUpdateTodo({...updateTodo,title:e.target.value})
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="Details"
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e)=>{
              setUpdateTodo({...updateTodo,details:e.target.value})
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={UpdateDialogClosing}>close</Button>
          <Button onClick={confirmUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
{/* update dialog */}
            <Card className='todosection' sx={{ minWidth: 275,backgroundColor:"#9e9e9e" ,marginTop:5 ,opacity:todoObj.isCompleted ? 0.6 : 1   }}>
          <CardContent>
         <Grid container spacing={2}>
        <Grid item xs={8}>
            <Typography gutterBottom sx={{ color: 'white', fontSize:20,fontWeight:"600" , textAlign:"left"}}>
                {todoObj.title} 
            </Typography>
            <Typography gutterBottom sx={{ color: '#212121', fontSize: 15 , textAlign:"left"}}>
                {todoObj.details}
            </Typography>
        </Grid>
        <Grid  item xs={4} display="flex" justifyContent="space-around" alignItems="center">
            <IconButton  onClick={()=>{handleCheckBtn()}}
            className='iconbtn1' aria-label="check" style={{backgroundColor:todoObj.isCompleted ? "#4caf50" : "white", color:todoObj.isCompleted ? "white" : "#4caf50" , border:"solid #4caf50 3px"}}>
            <TaskAltIcon />
      </IconButton>
            <IconButton onClick={()=>{handleUpdateBtn()}}
            className='iconbtn2' aria-label="check" style={{backgroundColor:"white", color:"#673ab7" , border:"solid #673ab7 3px"}}>
            <EditOutlinedIcon />
      </IconButton>
      <IconButton value={true}
      onClick={()=>{handleDeleteBtn()}}
      className='iconbtn3' aria-label="delete" style={{backgroundColor:"white", color:"#f44336" , border:"solid #f44336 3px"}}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
        </Grid>
      </Grid>

        </CardContent>
        </Card>
</>
)
}