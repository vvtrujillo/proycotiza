import React from "react"
import { Link } from "react-router-dom";
import { Button, ButtonToggle } from "reactstrap";
import { useEffect, useState } from 'react';
import UserContext from '../Context/user-context';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const TopNav = () => {

    const navigate = useNavigate();
    const salir = (e) => {
        Swal.fire({
            text: 'Seguro que desea cerrar sesión??',
            title:'Salir',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonText:'No',
            cancelButtonColor: 'green'
        }).then(resp =>{
            if(resp.isConfirmed){
                sessionStorage.removeItem('USUARIO');
                navigate('/login');
            }            
        })
    }

    return(
        <React.Fragment>            
            <div className="barra-nav">
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
            </div>            
        </React.Fragment>
    )
}

export default TopNav;