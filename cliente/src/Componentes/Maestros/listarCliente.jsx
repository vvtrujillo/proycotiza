import React from "react";
import { Button, Container, Table, Modal, ModalBody, Form, Label,FormGroup,Input,ModalHeader } from "reactstrap";
import { Link, Route, Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ListarCliente = ({EliminarClienteFn}) => {
    
    const[datosClientes, setDatosClientes] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/clientes')
            .then(resp => {
                if(!resp.data.error){                  
                  setDatosClientes(resp.data.dataClient); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }
              })
    }, [datosClientes])

    return(
        <Container>            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Razon Social</th>
                        <th>Email</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datosClientes.map((j,i) => 
                            <tr key={i}>
                                <td>{j.razonsocial}</td>
                                <td>{j.email}</td>
                                <td>
                                    <Link to={`/editar/${j._id}`}>
                                        <Button color="primary" >Editar</Button>
                                    </Link>                                    
                                    <Button color="danger" onClick={e => EliminarClienteFn(j.razonsocial, j._id)}>Eliminar</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>            
        </Container>
    )
}

export default ListarCliente;