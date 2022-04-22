import { createContext, useContext, useState,useEffect } from "react";
import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot,getFirestore} from "firebase/firestore"; 
import {db} from '../lib/firebase';
import { async } from "@firebase/util";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};


export const AppContextProvider=({children})=>{

    const [currentUser, setCurrentUser] = useState(null);
    const [appState, setAppState] = useState("empty");

const[showUploadVideo,setShowUploadVideo]=useState(false);
const[videos,setVideos]=useState([])


useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
      // console.log(user)
        setAppState("home");
        setCurrentUser(user);
        
      } else {
        setCurrentUser(null);
        setAppState("login");
      }
    });
  }, []);


useEffect(()=>{
const colRef=collection(db,"Images_folder")
onSnapshot(colRef,(snapshot)=>
{
  const pusharr=[];
  snapshot.docs.forEach((doc)=>
  {
    pusharr.push(doc.data());
    setVideos([...pusharr]);
  })
  })
},[])
console.log(videos)


  const value={videos,appState,currentUser,showUploadVideo,setShowUploadVideo};
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>

};