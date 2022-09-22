import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Table } from "reactstrap";
import TopNav from "../Navs/topNav";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ListarUsuarios = () => {

    const[datos, setDatos] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/usuario')
            .then(resp => {
                if(!resp.data.error){                  
                  setDatos(resp.data.dataUsuarios); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }
              })
    }, [datos])

    return(

        <div className="content-app">
            <TopNav></TopNav>
            <Container>
                <div className="content-main-title">
                    <h1>Usuarios</h1>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            datos.map((j,i) => 
                                <tr key={i}>
                                    <td>{j.nombre}</td>
                                    <td>{j.apellido}</td>
                                    <td>{j.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <Link to={'/registro'}>
                    <Button color='success'>Añadir Usuario</Button>
                </Link>                
            </Container>
            <div className='content-main-footer'>
                <p>Proyecto cotizador - Victor Valenzuela</p>
            </div>
        </div>
    )
}

export default ListarUsuarios;