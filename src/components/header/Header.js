import React, { useState } from 'react';
import Sidebar from "../sidebar/Sidebar"
import {Menu,Search, VideoCall, Apps,
  PersonAddOutlined, Notifications,CameraAltOutlined} from "@material-ui/icons";
import {Button,Avatar,Badge,Popover,makeStyles} from "@material-ui/core";
import youtubelogo1 from "../../media/youtubelogo1.png";
import "./header.css";
import { useAppContext } from '../../context/AppContext';
import { app } from "../../lib/firebase";
import { getAuth, signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom'

const auth = getAuth();

const useStyles=makeStyles(theme=>({
  large:{
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
}));

function Header(props) {
  
  const [anchorEl, setAnchorE1]=useState(null)
  const classes=useStyles();
  const AvatarClick=(e)=>
  {
    setAnchorE1(e.currentTarget);
  }
  function handleClose()
  {
    setAnchorE1(null)
  }
  const open=Boolean(anchorEl);
  const id=open?"simple-popover":undefined;

  const {currentUser,setShowUploadVideo}=useAppContext();

 return (
    <div className="header">

      <div className="headleft">
        <Menu className="menuicon"
        onClick={props.sidebar}
        >
        </Menu>
        {/* {props.sidebar?<Sidebar/>:""} */}
        <img className="youtubelogo" src={youtubelogo1} alt="Youtube"></img>
        </div>

<div className='headcenter'>
    
    <input className='searchbox' placeholder='Search'
   />
<Button className="searchbtn">
<Search className="searchicon"/>
</Button>

</div>

<div className='headright'>
    <VideoCall className="headright_icon"
   onClick={()=>setShowUploadVideo(true)} />
    <Apps className="headright_icon"/>
    <Notifications className="headright_icon"/>
    <Avatar onClick={AvatarClick} className="headright_icon"/>

    <Popover
          open={open}
          id={id}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
          }}
        >
          <div className="popover">
            <div className="popover_top">
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <div className="popover_badge">
                    <CameraAltOutlined className="popover_camera" />
                  </div>
                }
              >
                <Avatar className={classes.large}/>
              </Badge>

              <div className="popover_text">
                <div className="popover_displayName">
                 {currentUser?.displayName}
                
                </div>
                <div className="popover_mail">{currentUser?.email}</div>
              </div>
              <div className="popover_manage_btn">Manage your Google Account</div>
            </div>

            <div className="popover_add_btn_parentdiv">
              <div className="popover_add_Btn">
                <PersonAddOutlined className="popover_addIcon" />
                <p>Add another account</p>
              </div>

              <Button
                onClick={() => signOut(auth)}
                variant="outlined"
                className="popover_signOut"
              >
                Sign Out
              </Button>

              <div className="popover_footer">
                <p>Privacy Policy</p>
                <span>•</span>
                <p>Terms of service</p>
              </div>
            </div>
          </div>
        </Popover>
</div>
      </div>  
      
  )
}

export default Header