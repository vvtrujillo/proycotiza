import React from "react"
import { Link, Route, Router, useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import FormCrearCoti from "./formCrearCoti";
import {Routes} from 'react-router-dom';
import TopNav from "../Navs/topNav";

const MainCotizador = () => {

    const navigate = useNavigate();
    const salir = (e) => {
        sessionStorage.removeItem('USUARIO');
        navigate('/login');
    }

    return(
        <div className="content-app">
            <TopNav></TopNav>
            <Container>
                <div className="content-main">
                    <h1>Bienvenido al cotizador</h1>
                    <div className="content-main-icon">
                        <Link to={'/cotizar'}>
                            <Button color="primary">Cotizar</Button>
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