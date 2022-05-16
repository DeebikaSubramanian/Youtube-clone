import { Button } from '@material-ui/core'
import { MoreHoriz, PlaylistAdd, Reply, ThumbDownAlt, ThumbUpAlt,
 } from '@material-ui/icons'
 import {Avatar} from '@material-ui/core'
import React from 'react'
import watchvideo from '../../media/watchvideo.mp4'
import './watch.css'
import Watchright from "../watchright/Watchright"
import moment from "moment"
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { useAppContext } from '../../context/AppContext';
import {db} from '../../lib/firebase'
 import { doc, arrayUnion,updateDoc } from "firebase/firestore";
import { FirebaseError } from 'firebase/app'

function Watch(props) {

  const navigate=useNavigate()
  
  const [showDescrip,setShowDescrip]=useState(false);

  const { videos,currentUser } = useAppContext();

  console.log(props.video.email)

  const formattedDate=moment.unix(props.video?.timestamp?.seconds).format("YYYYMMDD,hh:mm:ss")
  const uploadedTime=moment(formattedDate,"YYYYMMDD,HH:mm:ss").fromNow();

const subscribe=async()=>
{
  const userDoc = doc(db, "users", `${props.video.email}`);
  await updateDoc(userDoc, {
    subscriber: arrayUnion(currentUser.email)});

    const userDoc1 = doc(db, "users", `${currentUser.email}`);
  await updateDoc(userDoc1, {
    subscriber: arrayUnion(props.video.email)});

}
  function watch_avatarOnclick()
  { 
navigate(`/Preview`)
  }

  
  // console.log(props.video)


  return (
     <div className="watch">
       <div className="watchdiv2">
         <div className="watch_left">
           <video className='watch_video' autoPlay controls>
             <source src={props.video.videoURL}
              type="video/mp4">
               </source>
           </video>
           <div className='watch_left_btn'>
             <h3 className='watch_title'>
               {props.video.title}
             </h3>

             <div className='watch_infn'>
               <div className='watch_infn_left'>
                 <p className="video_txt">300k Views • {uploadedTime}</p>
               </div>
              
               <div className="watch_infn_right">
                 <div className="watch_like_btn">
                   <div className='watch_like_wrap'>
                     <div className='watch_likebtn color--gray'>
                     
                       <ThumbUpAlt className="watch_icon"></ThumbUpAlt>
                       <p>20k</p>
                     </div>

                     <div className='watch_likebtn color--gray'>
                       <ThumbDownAlt className="watch_icon"/>
                       <p>10k</p>
                     </div>
                     
                     {/* <div className="watch_like_dislike">
                                        
                                        </div> */}
                       <div className='watch_likebtn color--gray'>
                       <Reply className="watch_icon share_icon"/>
                       <p>SHARE</p>
                     </div>

                     <div className='watch_likebtn color--gray'>
                       <PlaylistAdd className="watch_icon playadd"/>
                       <p>SAVE</p>
                     </div>

                     <div className='watch_likebtn color--gray'>
                       <MoreHoriz ThumbDownAlt className="watch_icon playadd"/>
                       <p></p>
                       </div>
                       
                     </div>
                    </div>
                    </div>
                    </div>
                    </div> 
           <div className='Watchdetails'>
             <div className="watchdetails2">
             <div class="details watch_avatar_details">
        <Avatar className="watch_avatar" onClick={watch_avatarOnclick} />
        <div className="channel">
          <h1 className='thumb_title'>{props.video.channelName}</h1>
        
            <p className='thumb_text watch_subcount'>7M Subscribers
           </p>
            <p className='thumb_text'> 100k views </p>
         
        </div>
      </div>
<Button 
className={currentUser?.email===props.video?.email?"watch_subscribebtn_disabled":"watch_subscribebtn"} color="primary" 
variant="contained"
disabled ={currentUser?.email===props.video?.email}
onClick={subscribe}
>SUBSCRIBE</Button>"
     
           </div>
           <div className='watch_description'>
             <p style={{maxHeight:setShowDescrip&& "100%"}}> 
               {props.video.description}        
             </p>
             <p className="watch_showmore"
             onClick={()=>setShowDescrip(!showDescrip)}>
               SHOW {showDescrip ? "LESS" : "MORE"}
               </p>       
                   </div>
         </div>
       </div>
       
       <div className='watch_right'>
        {videos.map((e)=>
        {
          return(
          <Watchright video={e}/>)
        })}
       </div>
       </div>
       </div>
           
  )
}

export default Watch