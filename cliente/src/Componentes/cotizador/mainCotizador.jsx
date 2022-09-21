import React from "react"
import { Link, Route, Router, useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import FormCrearCoti from "./formCrearCoti";
import {Routes} from 'react-router-dom';
import TopNav from "../Navs/topNav";
import { useEffect, useState } from "react";

const MainCotizador = () => {

    const [usuario, setUsuario] = useState(); //estado usuario para trabajar con los datos del usuario login

    useEffect(() => {
        if(!usuario) {
          if(sessionStorage.getItem('USUARIO')){
            setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
          }else {
           
          }
        } else {
          sessionStorage.setItem('USUARIO', JSON.stringify(usuario));
        }
      }, [])

    const navigate = useNavigate();
    const salir = (e) => {
        sessionStorage.removeItem('USUARIO');
        navigate('/login');
    } 

    //let nombreUsuario = usuario.nombre +' '+ usuario.apellido;
      

    return(
        <div className="content-app">
            <TopNav></TopNav>
            <Container>
                <div className="content-main">
                    <div className="content-main-title">
                        <h1>Bienvenido al cotizador</h1>
                    </div>                    
                    <div className="content-main-icon">
                        <Link to={'/cotizar'}>
                            <Button color="primary" style={{'width':'200px','height':'200px'}}>Cotizar</Button>
                        </Link>
                    </div>
                </div>
            </Container>
            <div className='content-main-footer'>
                <p>Proyecto cotizador - Victor Valenzuela</p>
            </div>
        </div>        
    )
}

export default MainCotizador;