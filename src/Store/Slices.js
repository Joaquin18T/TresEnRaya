import {createSlice} from '@reduxjs/toolkit' //importa la herramienta  de redux toolkit

export const oneSlice = createSlice({
  name:"firstSlice", //nombre del Slice

  //Estado(s) inicial
  initialState:{partidas:[], partidasSave:[], select:{}, isShowHistorial:false, posiciones:[]},

  //Acciones del Slice
  reducers:{
    //Guarda quien gando una partida
    addPartida:(state, action)=>{
      const {ganador} = action.payload;
      state.partidas = [...state.partidas, {ganador:ganador}];
    },
    //Guarda una partida jugada
    savePartida:(state, action)=>{
      const {save} = action.payload;
      state.partidasSave = [...state.partidasSave, save];
    },
    //Muestra una partida que elije el usuario
    selectRound:(state, action)=>{
      const {select, index} = action.payload;
      //state.select=[];
      state.select = {select:select, index:index};
    },
    //Guarda y muestra todas las partidas jugadas (componente Historial)
    showHistorial:(state, action)=>{
      state.isShowHistorial = action.payload
    },
    //Guarda las jugadas de las partidas
    posElegidos:(state, action)=>{
      state.posiciones =[...state.posiciones, action.payload];
    }
  }
});
//Se importa todas las acciones
export const {addPartida, savePartida, selectRound, showHistorial, posElegidos} = oneSlice.actions;