import { ExpandMore, Home, OndemandVideo, Restore, Subscriptions, ThumbUp, VideoLibrary, WatchLater, Whatshot } from '@material-ui/icons';
import React from 'react';
import './sidebar.css'
import {useNavigate} from "react-router-dom";

function Sidebar(props) {
  const navigate=useNavigate();
  function homeClick()
  {
    navigate("/")
  }
  return (
    <div className={props.preview_width?"preview_width":"sidebar"}>
      <div className="sidebar_top">
<div onClick={homeClick} className="sidebar_icon sidebar_icon_active">
  <Home className="side_icons"/>
    <p>Home</p>
 </div>
 <div className="sidebar_icon">
  <Whatshot className="side_icons"/>
    <p>Trending</p>
 </div>
 <div className="sidebar_icon">
  <Subscriptions className="side_icons"/>
    <p>Subscriptions</p>
 </div>
 </div>

 <div className='sidebar_bottom'>
   <div className='sidebar_icon'>
     <VideoLibrary className='Side_icons'/>
     <p>Libraries</p>
   </div>

   <div className='sidebar_icon'>
     <Restore className='Side_icons'/>
     <p>History</p>
   </div>

   <div className='sidebar_icon'>
     <OndemandVideo className='Side_icons'/>
     <p>Your Videos</p>
   </div>

   <div className='sidebar_icon'>
     <WatchLater className='Side_icons'/>
     <p>WatchLater</p>
   </div>

   <div className='sidebar_icon'>
     <ThumbUp className='Side_icons'/>
     <p>Liked videos</p>
   </div>

   <div className='sidebar_icon'>
     <ExpandMore className='Side_icons'/>
     <p>Show more</p>
   </div>


 </div>
     
    </div>
  )
}

export default Sidebar