import React, { useState } from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { selectRound, showHistorial } from '../Store/Slices';

/**
 * Renderiza la lista de todas las partidas jugadas
 * @param {*} param0 prop para cambiar el estado del juego
 * @returns elemento JSX
 */
export default function Historial({cambiarEstado}) {
  const partidas = useSelector(state=>state.firstSlice.partidas);
  const savePartidas = useSelector(state=>state.firstSlice.partidasSave);
  const selectPartida = useSelector(state=>state.firstSlice.select);


  const dispatch = useDispatch(); //hook del redux para guardar datos en un state del Slice
  
  //degug para ver si se guardan las partidas en el state del redux
  useEffect(()=>{
    //console.log(partidas);
    console.log("save partidas", savePartidas);
  },[partidas]);

  /**
   * Muestra el tablero de una jugada anterior
   * @param {*} index numero de la partida (identificador)
   */
  const showPartida = (index)=>{
    dispatch(selectRound({
      select: savePartidas[index],
      index: index
    }));
    cambiarEstado(false);
    dispatch(showHistorial(true));
  }

  useEffect(()=>{
    console.log(selectPartida);
  },[selectPartida])
  return (
    <div className='content-historial'>
      <span>Partidas Jugadas:</span>
      {
        partidas.map(({ganador},i)=>(
          <div key={i} className='element-historial'>
            <span>Partida N{i+1}: {ganador}</span> 
            <button onClick={()=>showPartida(i)}>Ver</button>
          </div>
        ))
      }
    </div>
  )
}
