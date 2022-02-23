import React from 'react'
import {useNavigate} from 'react-router-dom'

function Starter() {
    const navigate =useNavigate()
    const joinGame=()=>{

        navigate('/game')
      }
  return (
    <div>

       <button onClick={joinGame}> Create a new game</button>
       <button> Join as player 2 in an existing game</button>
       <button> Be a spectator</button>
       <p>Select new game to play</p>
    </div>
  )
}

export default Starter