import React, { useEffect, useState } from "react";
import "../pages/Login.css";
import { MdLogin } from "react-icons/md";
import { RiAdminFill, RiLockPasswordFill } from "react-icons/ri";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from "@mui/material";

import { Link, Link as RouterLink } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const login_details = JSON.parse(localStorage.getItem("accesser"))
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState("login"); 
  const [erralert,setAlert] = useState({
  message: "",
  type:"warning",
})

const login_handle = async () => {
  try {
    console.log(username, password);
    console.log("#################");
    const response = await axios.post('http://localhost:8888/api/admins/login',
    {username, password} );
    if(username == "" || password == ""){
        setAlert({
          message:"Fill the fields",
          type:"warning"
        })
        return;
    }
    console.log("***********");
    if (response.data.islogin) {
      setAlert({
          type:"success",
          message:"Ok Logged In"
        });
        localStorage.setItem("accesser",JSON.stringify(response.data))
        window.location.href = '/formpage';
        // console.log(response.data);
      } else {
        console.log(response.data.message);
        setAlert({
          type:"error",
          message:response.data.message
        });
      }
    } catch (error) {
      setAlert({
        type:"warning",
        message:"Server Can't be reached right now \nSorry for the inconvenience"});
      console.log(error);
    }
  };
  
 
    
    return (
      <div className="admin-login-main">
      {login_details ? (
        <div>
          
          <Typography variant="h5" gutterBottom margin={7}>
            You are Already logged in as <h1>{login_details.admin}</h1>
          </Typography>
           <Typography variant="h5" gutterBottom margin={7}>
            To Access your Dashboards <br/><br/>
            <Button variant="contained" component={Link} to='/formpage' >Go to Console </Button>
          <br/><br/>or</Typography>
       
           <Typography variant="h5" gutterBottom margin={7}>
            <Button variant="contained" component={RouterLink} to='/' 
            onClick={(e)=>{
              localStorage.removeItem("accesser")
            }}
            >Logout</Button>
          </Typography>
        </div>
      ) : (
        <div>
          { erralert.message ? (

        <Stack 
          sx={{ width: '70%' }} 
          spacing={2}
          style={{
            display:"flex",
            flexDirection:"column",
            backgroundColor:"blue",
            width:"50%",
            alignItems:"center"
            }}>
              <Alert severity={erralert.type} onClose={() => {setAlert(false)}}>
                {erralert.message}
              </Alert>
      
        </Stack>
          ):(<div></div>)}
        <div className="admin-login-form">
          <div className="login-form">
            <h2>Admin Login</h2>
            <div className="form-group">
              <label htmlFor="admin-username">
                <RiAdminFill />
                Admin Username:
              </label>
              <input
                type="text"
                id="admin-username"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
              <label htmlFor="admin-password">
                <RiLockPasswordFill />
                Admin Password:
              </label>
              <input
                type="password"
                id="admin-password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
           
            <button className="btn-admin-login" onClick={login_handle}>
              LOGIN <MdLogin />
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Login;