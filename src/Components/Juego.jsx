import React, { useState } from 'react'
import Tablero from './Tablero'
import useToggle from '../useToggle'
import Historial from './Historial';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showHistorial } from '../Store/Slices';

export default function Juego() {
  const navegacion = useNavigate();
  const dispatch = useDispatch();
  const {valor, setToggle, changeValor} = useToggle(false); //usando el hook personalizado
  const [turno, setTurno] = useState("X"); //state para ver quien juega primero

  const isShowH = useSelector(state=>state.firstSlice.isShowHistorial);

  /**
   * Metodo que reinicia la partida, para jugar otra.
   */
  const resetGame = ()=>{
    dispatch(showHistorial(false));
    if(!isShowH){
      changeValor(!valor);
    }
  }

  //Metodo que cambia el estado del juego
  const changeStateGame = (valor)=>{
    changeValor(valor);
  }

  //Cuando vas a ver una partida anterior, el estado del juego 'valor' aun esta en true, ya que no has clickeado en jugar de nuevo.
  //Si le das click en jugar de nuevo y vas a ver una jugada anterior no hay ningun error.
  //LO QUE HICE ES QUE CADA VEZ QUE TE VAS A VER UNA JUGADA ANTERIOR, ES CAMBIAR EL ESTADO DEL JUEGO A FALSE
  return (
    <div className='contain-juego'>
      <div className="side-left">
        <button onClick={()=>navegacion('/info')}>To Info</button>
        <Tablero resetGame = {resetGame} gameState = {valor} setTurno={setTurno}/>
        <div className='elements-game'>
          {
            valor && 
              <>
                <span>Gano el jugador: {turno}</span>
              </>
            
          }
          {
            valor||isShowH?
              <button onClick={resetGame}>Jugar de nuevo</button>
            :""
          }

          {
            !valor &&!isShowH?
              <span>El siguiente turno es de: {turno}</span>
            :""
          }

        </div>
      </div>
      
      <div className="side-right">
        <Historial cambiarEstado={changeStateGame}/>
      </div>

    </div>
  )
}
