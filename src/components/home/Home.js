import React from 'react'
import Thumb from "./Thumb"
import './home.css'
import {useAppContext} from "../../context/AppContext"
;
function Home() {
  const {videos}=useAppContext();
  // console.log(videos)
  return (

    <div className="home">
     { videos.map((e)=>
      {
                return (
          
        <Thumb video={e} />
        
        )
          
      })    
    }
          </div>
  )
}

export default Home