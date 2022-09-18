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
        <Container>
            <Button color='danger' onClick={salir}>Salir</Button>
            <Link to={'/'}>
                <Button color="primary">Home</Button>
            </Link>
            <Link to={'/cotizar'}>                    
                <Button color="primary">Cotizar</Button>
            </Link>
            <Link to={'/creacliente'}>
                <Button color='primary'>Crear Cliente</Button>
            </Link>
            <Link to={'/creaproducto'}>
                <Button color='primary'>Crear Producto</Button>
            </Link>
            <h1>Cotizador</h1>
        </Container>
    )
}

export default MainCotizador;