import { Avatar, Button } from '@material-ui/core';
import React, {useState,useEffect } from 'react'
import whatsapp_song_image from '../../media/whatsapp_song_image.jpeg';
import Watchright from '../watchright/Watchright'
import "./preview.css"
import {useLocation} from "react-router-dom"
import { useAppContext } from "../../context/AppContext"

function Preview() {

    const [currentChannel,setCurrentChannel]=useState([]);
  const {videos}=useAppContext();
  
  return (
    <div className="preview">
      <img className="whatsapp_song_img" src={whatsapp_song_image} alt="whatsapp_status_song_img"/>
<div className="preview_details">
  <div className="preview_details2">
    <div className='preview_avatar'>
      <Avatar className="preview_avatar2"/>

      <div className="thumb_channel">
       <h2>Channel</h2>
        <p className="thumb_text watch_subscribe_count">5M Subscribers</p>
      </div> 
</div>
      <Button className="preview_subscribe_btn channel_subscribe_btn" color="primary" variant="contained">
        SUBSCRIBE
      </Button>
    </div>
    

    <div className="channel_links">
      <div className="channel_links2">
        <p>HOME</p>
        </div>
        

      <div className='channel_links2 channel_links_active'>
        <p>VIDEOS</p>
        <div className='channel_link_border'></div>
      </div>
      

      <div className='channel_links2'>
        <p>COMMUNITY</p>
      </div>

      <div className='channel_links2'>
        <p>PLAYLIST</p>
      </div>

      <div className='channel_links2'>
        <p>CHANNELS</p>
      </div>

      <div className='channel_links2'>
        <p>ABOUT</p>
      </div>
      </div>
      </div>
      <div className='channel_content'>
        <div className='channel_content2'>
          
          {
            videos.map((e)=>
            {
              return(
              <Watchright channelview video={e}></Watchright>)
          })
        }
          
        </div>
      </div>
</div>
    
  )
}
 
export default Preview