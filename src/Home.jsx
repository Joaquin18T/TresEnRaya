import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navegacion = useNavigate();

  return (
    <div className='contain-home'>
      Home de la pagina
      <button onClick={()=>{navegacion('/game')}}>Entrar</button>
    </div>

  )
}
