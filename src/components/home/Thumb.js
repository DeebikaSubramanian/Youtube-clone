import React from 'react'
import {Avatar} from "@material-ui/core"
import {useNavigate} from "react-router-dom"
import './home.css';
import moment from "moment"

function Thumb(props) {
  const navigate=useNavigate()
  function thumbOnclick()
  {
    navigate(`/Watch/${props.video.id}`)
  }
  function avatarOnclick()
  {
    navigate('/preview')
  }

  const formattedDate=moment.unix(props.video?.timestamp?.seconds).format("YYYYMMDD,hh:mm:ss")
  const uploadedTime=moment(formattedDate,"YYYYMMDD,HH:mm:ss").fromNow();

  return (
    <div className='thumb'>
      {/* {props.video.channelName} */}
       <img className='thumb_img' src={props.video.thumbnailURL}
      onClick={thumbOnclick} 
      alt="Thumbnail"/>
      <div class="details">
        <Avatar onClick={avatarOnclick} />
        <div className="channel">
          <p className='thumb_title'>{props.video.title}</p>
          <div className='thumb_text_title'>
            <p className='thumb_text'>{props.video.channelName}<br/>
            100k views •{uploadedTime}</p>
            {/* <p className='thumb_text'></p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thumb