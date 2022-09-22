import './App.css';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Componentes/usuario/login';
import UserContext from './Componentes/Context/user-context';
import Registro from './Componentes/usuario/registro';
import { useEffect, useState } from 'react';
import MainCotizador from './Componentes/cotizador/mainCotizador';
import FormCrearCoti from './Componentes/cotizador/formCrearCoti';
import FormCreaCliente from './Componentes/Maestros/formCreaCliente';
import FormCreaProducto from './Componentes/Maestros/formCreaProducto';
import ListarCotizaciones from './Componentes/cotizador/listarCotizaciones';
import ViewCotizacion from './Componentes/cotizador/viewCotizacion';
import EditaClientes from './Componentes/Maestros/editaClientes';
import EditaProductos from './Componentes/Maestros/editaProductos';
import ListarUsuarios from './Componentes/Maestros/listarUsuarios';


function App() {

  const navigate = useNavigate();   //creo esta variable para navegar en la aplicacion
  const [usuario, setUsuario] = useState(); //estado usuario para trabajar con los datos del usuario login


  useEffect(() => {
    if(!usuario) {
      if(sessionStorage.getItem('USUARIO')){
        setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
      }else {
        navigate('/login');
      }
    } else {
      sessionStorage.setItem('USUARIO', JSON.stringify(usuario));
    }
  }, [])
  
  return (
    <UserContext.Provider value={{usuario, setUsuario}}>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/registro' element={<Registro />}></Route>
        <Route path='/*' element={<MainCotizador />}></Route>
        <Route path='/cotizar' element={<FormCrearCoti></FormCrearCoti>}></Route>
        <Route path='/creacliente' element={<FormCreaCliente></FormCreaCliente>}></Route>
        <Route path='/creaproducto' element={<FormCreaProducto></FormCreaProducto>}></Route>
        <Route path='/editaproducto' element={<FormCreaProducto></FormCreaProducto>}></Route>
        <Route path='/revisarcotizaciones' element={<ListarCotizaciones></ListarCotizaciones>}></Route>
        <Route path='/revisarcotizacion/:id' element={<ViewCotizacion></ViewCotizacion>}></Route>
        <Route path='/editarcliente/:id' element={<EditaClientes></EditaClientes>}></Route>
        <Route path='/editarproducto/:id' element={<EditaProductos></EditaProductos>}></Route>
        <Route path='/usuarios/' element={<ListarUsuarios></ListarUsuarios>}></Route>
      </Routes>      
    </UserContext.Provider>
  );
}

export default App;
