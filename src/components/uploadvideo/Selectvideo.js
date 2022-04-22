import React,{useState} from 'react'
import { useAppContext } from '../../context/AppContext'
import {Dialog,Slide,DialogTitle,Divider,DialogContent} from '@material-ui/core'
import {Close,Publish} from '@material-ui/icons'
import Uploadvideo from './Uploadvideo'
import './selectvideo.css'

const Transition=React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
   })



function Selectvideo() {
    
const {showUploadVideo,setShowUploadVideo}=useAppContext();


const [video, setVideo] = useState(null);

const handleVideoChange = (e) => {
  if (e.target.files[0]) {
    setVideo(e.target.files[0]);
  }
};

function closeOnclick()
{
    setShowUploadVideo(false);
}
  return (
    <div>
        <Dialog
        TransitionComponent={Transition}
        open={showUploadVideo}
        keepMounted
      >
        {video ? (
          <Uploadvideo
            video={video}
            setVideo={setVideo}
            closeOnclick={closeOnclick}
          />)
        :(
            <>
                        
           <div className="selectvideo">
               <DialogTitle>Upload Video</DialogTitle>
               <Close className="selectvideo_closeIcon" onClick={closeOnclick}/>
               </div>
               <Divider/>
               <DialogContent className="selectvideo_dialog">
                   <div className='selectvideo_publish'>
                       <Publish className="selectvideo_publishicon"/>
                   </div>
                   <div className="selectvideo_text">
                       <p className='selectvideo_title'>
                           Drag and drop video files to upload
                       </p>

                       <p className='selectvideo_subtitle'>
                           Your videos will be private until you publish them.
                       </p>

                   </div>
                   <input type="file" onChange={handleVideoChange} className="file_input"/>
                   
                   <p className="selectvideo_props">
                       By submitting your videos to YouTube, 
                       you acknowledge that you agree to YouTube's Terms of Service and Terms of Service and community Guidelines.  
                       Please be sure not to violate others' copyright or privacy rights. Leran more
                   </p>
               </DialogContent>
               </>
        )}

        </Dialog>
    </div>
  )
}

export default Selectvideo