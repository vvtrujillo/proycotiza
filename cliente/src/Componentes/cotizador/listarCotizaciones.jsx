import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "reactstrap";
import TopNav from "../Navs/topNav";
import axios from "axios";
import Swal from "sweetalert2";
import {BsSearch} from 'react-icons/bs';
import { Link } from "react-router-dom";

const ListarCotizaciones = () => {


    const[datosCotizaciones, setDatosCotizaciones] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/cotizaciones')
            .then(resp => {
                if(!resp.data.error){                  
                    setDatosCotizaciones(resp.data.dataCotizacion); 
                }else {
                    Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }
              })
    }, [datosCotizaciones])

    return(
        <div className="content-app">
            <TopNav></TopNav>
            <Container>
                <div className="content-main-title">
                    <h1>Listado de Cotizaciones</h1>
                </div>                
                <Table striped bordered hover style={{'marginTop':'20px'}}>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Valor Total</th>
                            <th>Usuario Creador</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datosCotizaciones.map((j,i)=>
                                <tr key={i}>
                                    <td>{j.cliente}</td>
                                    <td>{j.producto}</td>
                                    <td>{j.cantidad}</td>
                                    <td>{j.valortotal}</td>
                                    <td>{j.usuariocreador}</td>
                                    <td>
                                        <Link to={`/revisarcotizacion/${j._id}`}>
                                            <BsSearch style={{'cursor':'pointer'}}></BsSearch>
                                        </Link>                                        
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
            <div className='content-main-footer'>
                <p>Proyecto cotizador - Victor Valenzuela</p>
            </div>
        </div>
    )
}

export default ListarCotizaciones;