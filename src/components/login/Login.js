import { Button, TextField } from '@material-ui/core'
import React from 'react'
import google_logo from '../../media/google_logo.png'
import { useState } from 'react'
import Signup from "../signup/Signup"
import './login.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../lib/firebase";

function Login() {
    const[loading,setLoading]=useState(false);
    const[showSignup,setShowSignup]=useState(false);
    
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const [emailError,setEmailError]=useState({state:false,msg:""});
    const [passwordError,setPasswordError]=useState({state:false,msg:""})
    
    function toggleSignup()
    {
setLoading(true)
setTimeout(()=>
{
    setLoading(false)
    setShowSignup(true)
},1500)
    }

    function signin(e)
    {
        e.preventDefault();
        setLoading(true);
        setTimeout(()=>
        {
            setLoading(false)
            
        },1500);
        const auth = getAuth();
signInWithEmailAndPassword(auth,email,password)
      .then(() => {
          setEmailError({state:false,msg:""});
          setPasswordError({state:false,msg:""});
    })
    .catch((error)=>{
        setLoading(false)
        if(error.code==="auth/wrong-password")
        {
            setEmailError({state:false,msg:""})
            setPasswordError({state:true,msg:"Incorrect Password"})
        }
        else if (error.code==="auth/user-not-found"||error.code==="auth/invalid-email")
        {
            setEmailError({state:true,msg:"Email Dosen't exist"});
            setPasswordError({state:false,msg:""});
        }
    })
}

  return (
    <div className="login">
        {showSignup?<Signup setShowSignup={setShowSignup}/>:
        <div className='login_content'>
        {loading && <div className="login__loading" />}
            <div className={`login_wrap ${loading && "login_fade"}`}>
                <img 
                className="login_img"
                src={google_logo}
                alt="Google"/>

<p className='login_title'>Sign in</p>
<p className='login_subtitle'>Continue to Gmail</p>
<form className='login_form'>
    <TextField 
    id="outlined-basic"
    label="Email"
    variant="outlined" 
    className='login_input'
    type="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    error={emailError.state}
    helperText={emailError.state?emailError.msg:""}
    />

<TextField 
    id="outlined-basic"
    label="password"
    variant="outlined" 
    className='login_input'
    type="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    error={passwordError.state}
    helperText={passwordError.state?passwordError.msg:""}
    />
{/* <div className='login_info'>
    <p>Not your computer?Use guest mode to sign in privately?</p>
    <a href="/learnmore">Learn More</a>
</div> */}
    <div className="login_button_wrap">
        <Button
        className="login_button"
        color="primary"
        onClick={toggleSignup}>
            Create Account
        </Button>

        <Button
        className="login_button"
        variant="contained"
        color="primary"
        onClick={signin}>
            Sign in
        </Button>

    </div>
   
</form>

            </div>
            <div className="sample">
    <p className="sample_credentials"><u>sample credentials:</u></p>
    <p className="username">karthish@gmail.com</p>
    <p className="password">12345678</p>
</div>
        </div>
    }
    </div>
  
  )
}

export default Login