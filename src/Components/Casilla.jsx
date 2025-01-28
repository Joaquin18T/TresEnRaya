import React, { useEffect, useState } from 'react'
import useToggle from '../useToggle';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

export default function Casilla({elements, showIcon, gameState, elegidos}) {
  //usando el state del slice
  const selectPartida = useSelector(state=>state.firstSlice.select);
  const isShowH = useSelector(state=>state.firstSlice.isShowHistorial);
  const posSelect = useSelector(state=>state.firstSlice.posiciones);

  /**
   * Captura la posicion y el evento del elemento que se ha hecho click
   * @param {*} i index fila
   * @param {*} j index columna
   * @param {*} e propiedades del elemento
   */
  const onShowIcon = (i,j,e)=>{
    if(!gameState){
      showIcon([i,j],e);
    }
    //console.log(gameState);
  }

  /**
   * Resalta las casillas con las que ha ganado
   * @param {*} i index fila
   * @param {*} j index columna
   * @returns nombre de una clase
   */
  const validarElegidos = (i,j)=>{
    const isChoose = elegidos.findIndex(x=>x===`${i}-${j}`); //${i}-${j}: es un valor del dataset de cada casilla
    //console.log(isChoose);
    return isChoose> -1?"casilla brillar":"casilla";
  }

  /**
   * Muestra las casillas con las que el jugador a ganado (las partidas anteriores)
   * @param {*} i index fila
   * @param {*} j index columna
   * @param {*} round numero de la partida
   * @returns nombre de una clase
   */
  const posElegidas = (i,j, round)=>{
    const isChoose = posSelect[round].findIndex(x=>x===`${i}-${j}`);
    return isChoose> -1?"casilla brillar":"casilla";
  }

  // Primer bloque de JSX: renderiza las casillas de la partida actual
  //Segundo bloque de JSX: renderiza las casillas de una partida anterior
  return (
    <>
      {
        !isShowH && 
        elements.map((x,i)=>(
          x.map((b,j)=>(
          <div key={uuidv4()} className={validarElegidos(i,j)} onClick={(e)=>{onShowIcon(i,j,e)}} data-index={`${i}-${j}`}>
            {b}
          </div>
          ))
        ))
      }
      {
        isShowH &&
        selectPartida.select.map((x,i)=>(
          x.map((b,j)=>(
            <div key={uuidv4()} className={posElegidas(i,j, selectPartida.index)} data-index={`${i}-${j}`}>
              {b===1?"X":b===0?"O":""}
            </div>
          ))
        ))
      }
    </>
  )
}
