import React, { useState ,useEffect} from "react";
import{useNavigate}from 'react-router-dom';

const SignUp=()=>{
    const [name,setName]=useState("")
    const [password,setpassword]=useState("")
    const [email,setemail]=useState("")
    const navigate=useNavigate();

    
      useEffect(()=>{
         const auth=localStorage.getItem('user');
         if (auth) {
          navigate('/');
         }
      },[navigate]);

    const collectData=async()=>{
        console.warn(name,email,password)
        let result=await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name,email,password}),
            headers:{
                'content-Type':'application/json'
            }
        });
        result = await result.json()
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate('/');
    }
    return(
        <div className="register">
            <h1 className="register-h1">Register</h1>
            <input className="inputbox" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Username"/>
            <input className="inputbox" type="text" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter Email"/>
            <input className="inputbox" type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Password"/>
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp;