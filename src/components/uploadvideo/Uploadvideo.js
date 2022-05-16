import { DialogContent,DialogTitle,Divider,TextField,DialogActions,Button } from '@material-ui/core'
import {Close, Description} from '@material-ui/icons'
import React from 'react'
import './selectvideo.css'
import { useState,useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import { useAppContext } from '../../context/AppContext'
import {storage,db} from '../../lib/firebase'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp} from "firebase/firestore"; 
import { addDoc, collection } from "firebase/firestore";
import { async } from '@firebase/util'


function Uploadvideo(props) {

const [progress,setProgress]=useState(0)
const [thumbnailProgress,setThumbnailProgress]=useState(0);
const [title,setTitle]=useState("");
const [description,setDescription]=useState("");
const [thumbnail,setThumbnail]=useState(null);
const [thumbnailURL,setThumbnailURL]=useState(null);
const [videoURL,setVideoURl]=useState(null);
const [id,setId]=useState(uuidv4);
const [thumbnailUploaded,setThumbnailUploaded]=useState(false);
const [videoUploaded,setVideoUploded]=useState(false);

const {currentUser}=useAppContext();

function createId()
{
  setId(uuidv4);
}


function thumbnailOnUploaded(e)
{
  
  if(e.target.files[0])
  {
    setThumbnail(e.target.files[0]);
  }
}
console.log(thumbnail)



function handleVideoUpload()
{

  const metadata = {
    contentType: 'image/jpeg'
  };
  
const uploadvideo=ref(storage,`image/${props.video.name}`);
const uploadTask = uploadBytesResumable(uploadvideo,props.video,metadata);

uploadTask.on('state_changed', 
  (snapshot) => {
    const progresspercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progresspercent + '% done');
        switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
        console.log("from default")
    }
    setProgress(progresspercent)
  },
  (error) => {
   
    switch (error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;

      case 'storage/unknown':
    
        break;
        default:
          console.log("from default")
    }
  }, 
  () => { getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    setVideoURl(downloadURL);
    setVideoUploded(true);
  });
}
);
}

function thumbnailOnchange()
{
  const metadata = {
    contentType: 'image/jpeg'
  };
  
const uploadvideo=ref(storage,`thumbnails/${thumbnail.name}`);
const uploadTask = uploadBytesResumable(uploadvideo,thumbnail,metadata);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progresspercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progresspercent + '% done');
        switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
        console.log("from default")
    }
    setThumbnailProgress(progresspercent)
  },
  (error) => {
   
    switch (error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;

      case 'storage/unknown':
    
        break;
        default:
          console.log("from default")
    }
  }, 
  () => { getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    setThumbnailURL(downloadURL)
    setThumbnailUploaded(true);
  });
}
);

}

useEffect(() => {
  if (thumbnailUploaded && videoUploaded) {
    try {
      const docRef =  addDoc(collection(db, "Images_folder"), {
      
      timestamp: serverTimestamp(),
      id: id,
      videoURL: videoURL,
      thumbnailURL:thumbnailURL,
      title: title,
      description: description,
      channelName: currentUser.displayName,
      email: currentUser.email,
     
    })
    .then(() => {
      setProgress(0);
      props.setVideo(null);
      setTitle("");
      setThumbnail("");
      setThumbnailURL("");
      setVideoURl("");
      setDescription("");
      props.closeOnclick();
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  }
}, [thumbnailUploaded, videoUploaded]);


function uploadbtnOnclick()
  {
   createId();
   handleVideoUpload();
   thumbnailOnchange();
  }

  return (
    <div >
        <div className='selectvideo'>
            <DialogTitle>Upload Videos</DialogTitle>
            <Close className="selectvideo_closeIcon"
             onClick={props.closeOnclick}
             />

        </div>
        <Divider/>

        <DialogContent>
            
            <DialogTitle >Details</DialogTitle>

            <TextField 
            label="Title"
           variant="outlined"
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
            fullWidth
            />

          <TextField 
            label="Description"
           variant="outlined"
            multiline
            rows={10}
           placeHolder="Tell viewers about your video"
            fullWidth
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            style={{marginTop:"30px"}}
            
            />

<input type="file"
 className='file_input add_thumbnail'
 placeholder="Thumbnail"
 onChange={thumbnailOnUploaded}></input>

 <progress value={progress} max="100"/>
 {/* {console.log(progress)} */}

<DialogActions>
  <Button variant="contained"
   onClick={uploadbtnOnclick}
  color="primary">
    Upload
  </Button>
</DialogActions> 

        </DialogContent>
    </div>
  )
}

export default Uploadvideo