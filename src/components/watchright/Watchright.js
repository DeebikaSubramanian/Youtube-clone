import React from 'react'
import './watchright.css';
import behindwoods from '../../media/behindwoods.jpeg'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

function Watchright({channelview=false,video}) {
    
    const navigate=useNavigate();
    
    function imageOnclick()
    {
        navigate(`/Watch/${video.id}`)
    }
    const formatted = moment
    .unix(video?.timestamp?.seconds)
    .format("YYYYMMDD,HH:mm:ss");
  const timenew = moment(formatted, "YYYYMMDD,HH:mm:ss").fromNow();

  function divOnclick()
  {
      navigate(`/Watch/${video.id}`)
  }

  return (
    <div 
    onClick={divOnclick}
    className={channelview?"watchright_preview":"watchright"}>
        <div 
         className='watchright_left'>
            <img  onClick={imageOnclick} 
            className={channelview?'watchright_preview_img':'watchright_img'} 
            src={video.thumbnailURL}
            alt="thumbnail"/>
            </div>
            <div className='watchright_right'>
                <p className='title'>
                    {video.title}
                </p>
                <div className='text thumb_text'>
                    {!channelview&&(<p className="text2">
                    {video.channelName}</p>)}
                
            <p className='text2'>700k views  • {timenew}</p>
                </div>
            </div>
            
        </div>
  )
}

export default Watchright;