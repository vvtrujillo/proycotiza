import React from "react"
import { Link, Route, Router, useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import FormCrearCoti from "./formCrearCoti";
import {Routes} from 'react-router-dom';

const MainCotizador = () => {

    const navigate = useNavigate();
    const salir = (e) => {
        sessionStorage.removeItem('USUARIO');
        navigate('/login');
    }

    return(
        <React.Fragment>            
            <Container>                
                <Button color='danger' onClick={salir}>Salir</Button>
                <h1>Main Cotizador</h1>                
                <Link to={'/cotizar'}>                    
                    <Button color="primary">Cotizar</Button>
                </Link>
                <Link to={'/creacliente'}>
                    <Button color='primary'>Crear Cliente</Button>
                </Link>
            </Container>
        </React.Fragment>
    )
}

export default MainCotizador;