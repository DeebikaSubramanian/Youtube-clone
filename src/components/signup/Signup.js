import React from 'react'
import { useState } from 'react'
import google_logo from "../../media/google_logo.png"
import signup_image from "../../media/signup_image.jpeg"
import { Button, FormControlLabel, TextField, Checkbox } from '@material-ui/core'
import "./signup.css"
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore"; 



function Signup(props) {
const initialFormData={
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  confirmPassword:"",
}
  const [loading,setLoading]=useState(false);
  const [formData,setFormData]=useState(initialFormData);
  const [checked,setChecked]=useState(false);
  const [passwordError,setPasswordError]=useState({state:false,msg:""});
  const [emailError,setEmailError]=useState({state:false,msg:""})

  function toggleSignup()
  {
    setLoading(true)
    setTimeout(()=>
    {
      setLoading(false)
props.setShowSignup(false);
    },1500)
  };


  const createAccount= (e)=>
  {
    e.preventDefault();
    setLoading(true);
    const error=formData.password===formData.confirmPassword
    if(!error)
    {
      setPasswordError({state:true,msg:"passwords do not match"})
      setFormData({...formData,confirmPassword:""})
      setLoading(false)
      return;
    }
else{
  setPasswordError({state:false,msg:""})
  setEmailError({state:false,msg:""})
}

const auth = getAuth();
createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() =>
       {
           updateProfile(auth.currentUser, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        
          })
        })
        .then(() => {
            setLoading(false);
            setEmailError({ state: false, msg: "" });
            setPasswordError({ state: false, msg: "" });
      
            setDoc(doc(db, "users", `${formData.email}`), {
              email:formData.email,
              firstName:formData.firstName,
              lastName:formData.lastName
            });
    })
      .catch((error)=>
{
  if(error.code==="auth/email-already-in-use")
  {
    setEmailError({state:true,msg:"Email is already in use"});
    setLoading(false);
    setFormData({...formData,email:""})
  }
  if(error.code==="auth/invalid-email")
  {
    setEmailError({state:true,msg:"Email is not properly formatted"});
    setLoading(false);
    setFormData({...formData,email:""})
  }
  else if(error.code==="auth/weak-password")
  {
    setPasswordError({state:true,msg:"password should be atleast 6 characters"});
    setLoading(false);
    setFormData({...formData,password:"",confirmPassword:""});
  }
})
updateProfile(auth.currentUser, {
  displayName: `${formData.firstName} ${formData.lastName}`
})
}


const disabled=
!formData.firstName||
!formData.lastName ||
!formData.email||
!formData.password||
!formData.confirmPassword;
 
  return (
   
    <div className="signup">
    <div className={`signup2${loading&&"login_fade"}`}>
{loading && <div className="login_loading signup_loading"/>}

<div className="signup">
  <div className="signup_left">
    <img 
    className='login_img'
    src={google_logo}
    alt="google"
    />

    <h1 className="signup_heading">Create your Google Account</h1>
    <p className="signup_subheading">Continue to Gmail</p>

    <div className="signup_input">
      <div className="signup_input_wrap">
        <TextField 
        id="outlined-basics"
        label="First Name"
        type="text"
        className="sigup_input_name"
        variant="outlined"
        value={formData.firstName}
        onChange={((e)=>{
          setFormData({
            ...formData,
            firstName:e.target.value
          })
        })}
        />

<TextField 
        id="outlined-basics"
        label="Last Name"
        type="text"
        className="sigup_input_name"
        variant="outlined"
        value={formData.lastName}
        onChange={((e)=>{
          setFormData({
            ...formData,
            lastName:e.target.value
          })
        })}
        />
     </div>

     <TextField 
        id="outlined-basics"
        label="Email"
        type="email"
        fullWidth
        className="sigup_input_email"
        variant="outlined"
        helperText={
          emailError.state?emailError.msg:
          "You can use letters,numbers & periods"}
        value={formData.email}
        onChange={((e)=>{
          setFormData({
            ...formData,
            email:e.target.value
          })
        })}
        error={emailError.state}
        />

        <div className="signup_input_password_wrap">
          <div className='signup_password_wrap'>
          <TextField 
        id="outlined-basics"
        label="Password"
        type={checked?"text":"password"}
        className="sigup_input_password"
        variant="outlined"
        value={formData.password}
        onChange={((e)=>{
          setFormData({
            ...formData,
            password:e.target.value
          })
        })}
        error={passwordError.state}
        />
        <TextField 
        id="outlined-basics"
        label="Confirm-Password"
        type={checked?"text":"password"}
        className="sigup_input_password"
        variant="outlined"
        value={formData.confirmPassword}
        onChange={((e)=>{
          setFormData({
            ...formData,
            confirmPassword:e.target.value
          })
        })}
        error={passwordError.state}
        />
        </div>
         <p className={`sigunp_helpertext ${passwordError.state && "signin_error"}`}>
          {passwordError.state?
          passwordError.msg:
          "Use 6 or more characters with a mix of letters, numbers, symbols"}
        </p>

        <FormControlLabel
        control={
          <Checkbox checked={checked}
          onClick={()=>setChecked(!checked)}
          color="primary"/>}
          label="Show Password"
        />
          </div>

          <div className='signup_button_wrap'>
            <Button 
            className="signup_button" 
            variant="text" 
            onClick={toggleSignup}
            color="primary">
              Sign in instead
            </Button>

            <Button className="signup_button" 
            variant="contained" color="primary"
            disabled={disabled}
            onClick={createAccount}>
              Create
            </Button>

          </div>
       </div>
    </div>
    
    <figure className="signup_figure">
      <img className="signup_figure_img" src={signup_image} alt="account"/>
      {/* <figurecaption className="signup_figure_caption">
        one account. All of google working for you
      </figurecaption> */}
      </figure>
    </div>
  </div>
</div>

  )
}

export default Signup