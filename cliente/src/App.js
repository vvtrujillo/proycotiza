import './App.css';
import React from 'react';
import { Container } from 'reactstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Componentes/usuario/login';
import UserContext from './Componentes/Context/user-context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


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
    <React.Fragment>
      <Routes>
        <Route path={'/login'} element={<Login></Login>}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
