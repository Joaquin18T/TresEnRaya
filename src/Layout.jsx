import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Componente que cargara en cada vista (ruta anidada)
 * @returns componente HTML que se podra en todas las vistas
 */
export default function Layout() {
  //navar: cargar en todas las vistas de los componentes que estan anidadas
  //Outlet: Sera reemplazado por el contenido del componente que carga cuando vas a una vista
  return (
    <div>
      <nav>Navbar global</nav>
      <Outlet/>
    </div>
  )
}
