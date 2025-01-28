import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Juego from '../Components/Juego'
import Home from '../Home'
import Layout from '../Layout'
import Info from '../Info'

/**
 * Componente de las rutas del proyecto
 * @returns Todas las rutas hacia los vistas que se van a visualizar
 */
export default function () {
  //Layout>*:Ruta anidada donde mostrara en las dos rutas secundarias el mismo nav
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route element={<Layout/>}>
          <Route path='game' element={<Juego/>}/>
          <Route path='info' element={<Info/>}/>
        </Route>
      </Routes>
    </>
  )
}
