import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Container,Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ListarProductos = ({EliminarFn}) => {

    const[datosProductos, setDatosProductos] = useState([]);

    //para traer los productos que estan creados
    useEffect(() => {
        axios.get('/api/v1/productos')
            .then(resp => {
                if(!resp.data.error){
                  console.log('Use Effect para traer los productos creados',resp.data.dataProduct)
                  setDatosProductos(resp.data.dataProduct); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }
              })
    }, [datosProductos])

    return(
        <Container>            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Unidad</th>
                        <th>Valor</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datosProductos.map((j,i) => 
                            <tr key={i}>
                                <td>{j.codigo}</td>
                                <td>{j.nombre}</td>
                                <td>{j.descripcion}</td>
                                <td>{j.unidad}</td>
                                <td>{j.valor}</td>                                
                                <td>
                                    <Link to={`/editar/${j._id}`}>
                                        <Button color="primary" >Editar</Button>
                                    </Link>                                    
                                    <Button color="danger" onClick={e => EliminarFn(j.nombre, j._id)}>Eliminar</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>            
        </Container>
    )
}

export default ListarProductos;