import React from "react";
import { Button, Container, Table, Modal, ModalBody, Form, Label,FormGroup,Input,ModalHeader } from "reactstrap";
import { Link, Route, Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {GrEdit} from 'react-icons/gr'
import {RiDeleteBin6Line} from 'react-icons/ri'


const ListarCliente = () => {
    
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

    const Eliminar = (nombre, id) => {
        Swal.fire({title:'Eliminar', //Aca colocamos el titulo del mensaje
                  text:`Esta seguro de eliminar el Cliente ${nombre}`, //acá colocamos el texto que va a decir en el mensaje
                  icon:'question', //aca indicamos el icono del mensaje
                  showCancelButton: true, //indicamos si vamos a mostrar el boton "Cancelar" en el mensaje
                  cancelButtonColor: '#5A75E5',
                  confirmButtonText: 'Si, Eliminar', //Texto del boton confirmar la acción del mensaje
                  confirmButtonColor: '#DF362D'
                })
                .then(resp => {
                  if(resp.isConfirmed){
                    console.log('dije si al eliminar');
                    console.log('eliminar',nombre, id)
                    axios.delete(`/api/v1/clientes/${id}`)
                      .then(resp =>{
                        console.log('respuesta',resp)
                        setDatosClientes(datosClientes.filter(d => d._id != id))
                      }).catch(error => Swal.fire('Ooops!!!', error,'Error'))
                  }
                })
    }

    return(
        <Container style={{'marginTop': '30px'}}>            
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
                                    <Link to={`/editarcliente/${j._id}`}>
                                        <GrEdit style={{'cursor':'pointer'}}></GrEdit>
                                    </Link>
                                    <RiDeleteBin6Line style={{'marginLeft':'10px','cursor':'pointer'}} color='red' onClick={e => Eliminar(j.razonsocial, j._id)}></RiDeleteBin6Line>                                    
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