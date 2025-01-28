import React, { useEffect } from 'react'
import Casilla from './Casilla'
import { useState } from 'react';
import useToggle from '../useToggle';
import {useDispatch} from 'react-redux'
import {addPartida, posElegidos, savePartida} from '../Store/Slices.js'

export default function Tablero({resetGame,gameState, setTurno}) {
  const listEmpty = [["","",""],["","",""],["","",""]];
  const [elements, setElement] = useState(listEmpty);
  const [tablero, setTablero] = useState(listEmpty);
  const {valor, setToggle, changeValor} = useToggle(false);
  const [casillasEmt, setCasillas] = useState([]);
  const [elegidos, setElegidos] = useState([]);

  const dispatch = useDispatch();

  /**
   * Metodo para saber quien juega y muestra el simbolo en la casilla seleccionada
   * @param {*} pos posicion (fila y columna) de la casilla seleccionada
   * @param {*} e propiedades de la casilla seleccionada
   */
  const showIcon = (pos=[],e)=>{
    const [i, j] = pos;
    //const coord = e.target.getBoundingClientRect(); //saber la posicion de un elemento
    const simbolo = !valor?'/equis.jpg':'/circulo.jpg';

    if(!gameState){
      setTurno(!valor?"O":"X"); //mostrar quien juega el siguente
    }

    const copy =[...elements];
    const image = !valor?"X":"O";
    if(!copy[i][j]){
      copy[i][j] = image;
      setElement(copy);
      
      const copyTablero = [...tablero];
      copyTablero[i][j] = !valor?{simbolo:1,element:e}:{simbolo:0,element:e}; //guarda el simbolo de la casilla y sus propiedades
      setTablero(copyTablero);

      setToggle();
    }
  }

  /**
   * Pasa las filas a columnas, columnas a  filas
   * @param {*} type valor si quieres intercambio o no
   * @returns un array de acuerdo a la accion del parametro
   */
  const reverseList = (type)=>{
    let list = [["","",""],["","",""],["","",""]];
    for(let i = 0; i < tablero.length; i++){
      for (let j = 0; j < tablero[i].length; j++) {
        //Manera vertical
        //console.log(`pos ${i}${j}:${tablero[i][j]}`);
        if(type===1){
          list[j][i] = tablero[i][j];
        }else{
          list[i][j] = tablero[i][j];
        }
      }
    }
    return list;
  }

  const validateWin = (contador,j, amount)=>{
    let isWin = false;
    if(j===amount){
      if(contador===3){
        isWin = true;
      }
    }
    return isWin;
  }

  // const validarJugadas = (list=[],typeWin, player)=>{
  //   let isWin = false;
  //   let contador = 0;
  //   for (let i = 0; i < list.length; i++) {
  //     for (let j = 0; j < list[i].length; j++) {
  //       if(typeWin===1){
  //         if(list[i][j]===player){
  //           contador++;
  //         }
  //       }
  //       else if(typeWin===2){
  //         if(list[i][j]===player && i===j){
  //           contador++;
  //         }
  //       }
  //       //isWin = validateWin(contador, j, list[i].length-1);
  //       if(j===list[i].length-1){
  //         if(contador===3){
  //           isWin = true;
  //         }
  //       }
  //     }
  //   }
    
  //   return isWin;
  // }

  //
  
  /**
   * Determina que jugador ha ganado
   * @param {*} type Que jugadores son (X, O)
   * @returns un array de quien gano y todas las propiedades de las jugadas
   */
  const wayLineal = (type)=>{
    let elements = [];
    let contDiagonal2 = 0;
    let contDiagonal1 = 0;
    let isWin =false;

    //isWin = validarJugadas(tablero, 0,type);
    //HORIZONTAL
    const firstList = reverseList(2);
    let listOne = [];
    let indexOne = 0;
    for (let i = 0; i < firstList.length; i++) { //fila
      let contLocal = 0; //manera horizontal
      listOne = [];
      indexOne = 0;
      for (let j = 0; j < firstList[i].length; j++) { //columna
        //Manera horizontal
        if(firstList[i][j].simbolo===type){
          contLocal++;
          listOne[indexOne] = firstList[i][j].element;
          indexOne++;
        }
        //console.log(contLocal);
        if(j===firstList[i].length-1){
          if(contLocal===3){
            elements = listOne;
            isWin = true;
            listOne = [];
            indexOne = 0;
          }
        }
      }
    }
    //HORIZONTAL

    //VERTICAL
    let list_reverse = reverseList(1);
    //console.log("volteado", list_reverse);
    //isWin = validarJugadas(list_reverse, 1, type);
    let secondCont=0, secondList=[];
    for (let i = 0; i < list_reverse.length; i++) { //fila
      let contX = 0; //manera vertical (cubo volteado, ahora mismo esta horizontal)
      secondCont = 0, secondList = [];
      for (let j = 0; j < list_reverse[i].length; j++) { //columna
        if(list_reverse[i][j].simbolo===type){
          contX++;
          secondList[secondCont] = list_reverse[i][j].element;
          secondCont++;
          //console.log(contX);
        }
        if(j===list_reverse[i].length-1){
          if(contX===3){
            isWin = true;
            elements = secondList;
            secondCont = 0, secondList = [];
            //console.log("ganaste");
          }
        }
        //isWin = validateWin(contX, j, list_reverse[i].length-1);
      }
    }
    //console.log("v1", list_reverse);
    //VERTICAL

    //DIAGONAL (I to D)
    //isWin = validarJugadas(tablero, 2,type);
    let thirdCont = 0;
    let thirdList =[]
    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j < tablero[i].length; j++) {
        if(tablero[i][j].simbolo===type && i===j){
          contDiagonal1++;
          thirdList[thirdCont] = tablero[i][j].element;
          thirdCont++;
        }
        if(j===tablero[i].length-1){
          if(contDiagonal1===3){
            elements = thirdList
            isWin = true;
            thirdCont = 0, thirdList=[];
          }
        }
      }
    }
    //DIAGONAL (I to D)

    //DIAGONAL (D to I)
    let list_reverse2 = reverseList(2);

    let y=0;
    for (let a =0; a<list_reverse2.length; a++) {
      for (let z = list_reverse2[a].length-1; z>y; z--) {
        [list_reverse2[a][y], list_reverse2[a][z]] = [list_reverse2[a][z],list_reverse2[a][y]];
        y++;
      }
      y=0;
    }

    //isWin = validarJugadas(list_reverse2, 2,type);
    let fourthCount=0, fourthList=[];
    for(let i=0; i<list_reverse2.length; i++){
      for (let j = 0; j < list_reverse2[i].length; j++) {
        if(list_reverse2[i][j].simbolo===type && i===j){
          contDiagonal2++;
          fourthList[fourthCount] = list_reverse2[i][j].element;
          fourthCount++;
        }
        if(j===list_reverse2[i].length-1){
          if(contDiagonal2===3){
            elements = fourthList;
            isWin = true;
            fourthCount=0, fourthList=[];
          }
        }
      }
    }
    //DIAGONAL (D to I)

    return [isWin, elements];
  }

  //Muestra el ganador
  useEffect(()=>{
    //console.log("p1", player1);
      
    console.log(tablero);
    //Los dos Jugadores
    const isWin1 = wayLineal(1); // X
    const isWin2 = wayLineal(0); // O

    let win = "";
    //Si gana el jugador 1...
    if(isWin1[0]){
      console.log("El jugador 1 ha ganado");
      console.log("indices", isWin1[1]);

      let elegidos = selectElegidos(isWin1[1]);

      setElegidos(elegidos);
      setTurno("X");
      win = "Jugador 1(X)";
    }
    //Si ganas el jugador 2...
    if(isWin2[0]){
      console.log("El jugador 2 ha ganado");
      let elegidos = selectElegidos(isWin2[1]);
      setElegidos(elegidos);
      setTurno("O");
      win = "Jugador 2(O)";

    }
    //Si gana uno de los dos, guarda en el redux al jugador ganador y los id de todas las casillas (dataset)
    if(isWin1[0] || isWin2[0]){
      dispatch(addPartida({
        ganador:win
      }));

      const list = cleanerPartida();
      dispatch(savePartida({
        save:list
      }));

      resetGame();
    }

  },[tablero]);

  /**
   * filtra de acuerdo al id (dataset) de cada casilla
   * @param {*} list array de las jugadas que se han hecho en la partida
   * @returns un array con los dataset de cada casilla
   */
  const selectElegidos = (list=[])=>{
    let elegidos = []
    for (let i = 0; i < list.length; i++) {
      const elHTML = casillasEmt.find(x=>x.dataset.index===list[i].target.dataset.index);
      elegidos[i] = elHTML.dataset.index;
    }
    dispatch(posElegidos(elegidos));

    return elegidos;
  }

  /**
   * Limpia todas las casillas despues de una partida
   * @returns un array bidimensional vacio
   */
  const cleanerPartida=()=>{
    let list = listEmpty;
    for (let i = 0; i < tablero.length; i++) {
      for (let j = 0; j < tablero[i].length; j++) {
        list[i][j] = tablero[i][j].simbolo > -1?tablero[i][j].simbolo:"";
      }
    }
    return list;
  }

  useEffect(()=>{
    //Si es false, reinicia todo los datos
    if(!gameState){
      //console.log("reiniciado");
      setElement([["","",""],["","",""],["","",""]]);
      setTablero([["","",""],["","",""],["","",""]]);
      changeValor(false);
      setElegidos([]);
      setTurno("X");
    }
    console.log("state game", gameState);
  },[gameState]);

  /**
   * Guarda el elemento de cada casilla seleccionada
   * @param {*} e propiedades del elemento clickeado
   */
  const casillas = (e)=>{
    //currentTarget: elemento actual de la propagacion
    //target: elemento que se ha hecho click
    const listChildren = Array.from(e.currentTarget.children);
    //console.log(e.target);
    //console.log(e.currentTarget);
    setCasillas(listChildren);
    //const test = listChildren.find(x=>x===e.target);
  }

  return (
    <div className='content-tablero'>
      <div className="tablero" onClick={(e)=>{casillas(e)}}>
        <Casilla elements={elements} showIcon={showIcon} gameState = {gameState} elegidos={elegidos}/>
      </div>
    </div>
  )
}
