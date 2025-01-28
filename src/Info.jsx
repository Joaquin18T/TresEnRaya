import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Info() {
  const navegacion = useNavigate(); //hook de la libreria para navegar entre vistas
  //navegacion(-1): esto sirve para volver a vista anterior
  return (
    <div>
      <h2>Info</h2>
      <button onClick={()=>navegacion(-1)}>Regresar</button>
    </div>
  )
}
