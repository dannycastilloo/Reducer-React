import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HooksApp } from './HooksApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HooksApp></HooksApp>
  </React.StrictMode>,
)
// Los reducer nos permiten tener estados bien organizados -> sirven para escalar la aplicación

// Reducer: Función que recibe un estado inicial, recibe una acción para generar algún cambio y devuelve un estado modificado.

// - No puede hacer acciones asíncronas
// - Solo hace los cambios en el objeto del estado

// Payload -> Carga que será implementada en el estado inicial para devolver un estado modificado