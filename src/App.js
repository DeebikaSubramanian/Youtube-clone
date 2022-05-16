import {React,useState} from "react";
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import Home from "./components/home/Home"
import Watch from "./components/watch/Watch"
import Preview from "./components/preview/Preview"
import Selectvideo from "./components/uploadvideo/Selectvideo";
import {BrowserRouter,Route,Routes,useNavigate} from "react-router-dom"
import Login from "./components/login/Login";
import { useAppContext, Userprovider } from "./context/AppContext";
import { VideocamSharp } from "@material-ui/icons";

 
function App() {
  
const {videos,appState,showUploadVideo}=useAppContext();
const [sidebar,setSidebar]=useState(false);


  return (
       <BrowserRouter>
       {appState==="home"&& 
    <div className="appjs">
      
{videos.map((e)=>
{
  console.log(e)
return(
  <><Routes>
    <Route path={`/Watch/${e.id}`} element={<Header/>} />
  </Routes><Routes>
      <Route path={`/Watch/${e.id}`} element={<Watch video={e}/>} />
    </Routes></>
)
})}

      <Selectvideo/> 
     
         <Routes>
         <Route path='/' element={<Header/>}/>
         </Routes>

      <div className="sidehome">
        <Routes>
       <Route path='/' element={<><Sidebar/><Home/></>}/></Routes>
       {showUploadVideo&&<Selectvideo/>}
       </div>
     
      
      <Routes>
        <Route path='/preview' element={<Header/>}/>
      </Routes>
      <div className="appjs2 ">
        <Routes> 
      <Route path='/Preview' element={<><Sidebar preview_width={true} /><Preview/></>}/>
      </Routes>
       
       </div>
     
      </div>
}
{appState==="login"&&<Login/>}
      </BrowserRouter>
   
  );
}

export default App;
