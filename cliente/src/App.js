import './App.css';
import React from 'react';
import { Container } from 'reactstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Componentes/usuario/login';
import UserContext from './Componentes/Context/user-context';
import Registro from './Componentes/usuario/registro';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import MainCotizador from './Componentes/cotizador/mainCotizador';
import FormCrearCoti from './Componentes/cotizador/formCrearCoti';
import FormCreaCliente from './Componentes/Maestros/formCreaCliente';
import FormCreaProducto from './Componentes/Maestros/formCreaProducto';


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
      </Routes>
      <div className='content-app'>
        <Routes>          
          <Route path='/registro' element={<Registro />}></Route>
          <Route path='/*' element={<MainCotizador />}></Route>
          <Route path='/cotizar' element={<FormCrearCoti></FormCrearCoti>}></Route>
          <Route path='/creacliente' element={<FormCreaCliente></FormCreaCliente>}></Route>
          <Route path='/creaproducto' element={<FormCreaProducto></FormCreaProducto>}></Route>
        </Routes>
      </div>      
    </UserContext.Provider>
  );
}

export default App;
