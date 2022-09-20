import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Container,Table, Button } from "reactstrap";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import FormCreaProducto from "./formCreaProducto";

const ListarProductos = () => {

    const[datosProductos, setDatosProductos] = useState([]);
    const [obj, setObj] = useState({});

    const navigate = useNavigate();

    //para traer los productos que estan creados
    useEffect(() => {
        axios.get('/api/v1/productos')
            .then(resp => {
                if(!resp.data.error){                  
                  setDatosProductos(resp.data.dataProduct); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }
              })
    }, [datosProductos])

    const Eliminar = (nombre, id) => {
        Swal.fire({title:'Eliminar', //Aca colocamos el titulo del mensaje
                  text:`Esta seguro de eliminar el Producto ${nombre}`, //acá colocamos el texto que va a decir en el mensaje
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
                    axios.delete(`/api/v1/productos/${id}`)
                      .then(resp =>{
                        console.log('respuesta',resp)
                        setDatosProductos(datosProductos.filter(d => d._id != id))
                      }).catch(error => Swal.fire('Ooops!!!', error,'Error'))
                  }
                })
    }

    const irAEditar = (dato, i) => {
        setObj({...dato, indice: i});
        navigate('/editaproducto');
    
    }

    const editar = (obj) => {
        if(obj.indice>=0) {
          return axios.put(`/api/v1/productos/${obj._id}`, obj)
          .then(resp => {
            let arr = [...datosProductos];
            arr.splice(obj.indice, 1, obj);
            setDatosProductos(arr);
            return true;
          }).catch(error => {
            Swal.fire('Opps!!!', error, 'error')
            return false;
          });
        } else {
          Swal.fire('Editar', 'Error al editar los datos', 'error');
          return false;
        }
      }

    return(
        <Container style={{'marginTop': '30px'}}>            
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
                                    <Button color="primary">Editar</Button>                                                                 
                                    <Button color="danger" onClick={e => Eliminar(j.nombre, j._id)}>Eliminar</Button>
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