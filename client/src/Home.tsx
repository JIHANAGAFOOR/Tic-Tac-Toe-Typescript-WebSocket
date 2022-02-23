import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:80/";

function Home() {
  const navigate=useNavigate();
    const [response, setResponse] = useState("");
    const[uname,setUname]=useState("")

    // useEffect(() => {
    //   const socket = socketIOClient(`${ENDPOINT}`);
    //   socket.on("data", data => {
    //     console.log(" in client :"+data)
    //     setResponse(data);
    //   });
    // }, []);
const handleClick= ()=>{

  const socket = socketIOClient(`${ENDPOINT}`);

  socket.emit("join", { uname: `${uname}`}, (err: any) => {
    if (err) {
      alert(err);
    }else{
      console.log(uname)
    }
  });
  socket.on("data", data => {
    console.log(" in client :"+data)
  setResponse(data);
  
  });
  
  
}
const joinGame=()=>{
  (response.length!=0)&&
  navigate('/start')
}


  return (
    <div>

 <p>
     <input type="text" onChange={(e)=>setUname(e.target.value)}/>
     <input type="submit" onClick={handleClick} value="submit"/>

     
       <label>{response}</label>
      
      {(response.length!=0)&&
       <input type="submit" onClick={joinGame} value="submit"/>  
      }
     

       </p>
    </div>
  )
}

export default Home