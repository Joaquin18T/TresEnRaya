import React, { useState } from 'react'

/**
 * Hook personalizado para manejar estados
 * @param {*} param valor por defecto que tendra el hook (por defecto es false)
 * @returns un objeto con acciones del hook personalizado
 */
export default function useToggle({state}=false) {
  const [valor, setValor] = useState(state);

  /**
   * Cambiar el valor actual del hook a su valor contrario
   */
  const setToggle = ()=>{
    setValor(!valor);
  }

  /**
   * Cambiar el valor del estado
   * @param {*} valor El valor con que lo vas a actualizar
   */
  const changeValor = (valor)=>{
    setValor(valor);
  }
  return ({valor, setToggle, changeValor});
}
