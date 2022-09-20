import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import TopNav from "../Navs/topNav";
import Swal from "sweetalert2";

const EditaProductos = () => {
    const {id} = useParams(); //rescato el id desde el parametro de la URL
    const navigate = useNavigate();

    const[formulario, setFormulario] = useState([]);    
    const [recargar, setRecargar] = useState(false); //Para Actualizar los datos de los clientes

    const actualizarFormulario = ({target: {name, value}}) => {        
        setFormulario({
            ...formulario,
            [name]: value            
        })
    }

    useEffect(() => {
        axios.get(`/api/v1/productos/${id}`)
            .then(resp => {                
                if(!resp.data.error){
                    setFormulario(resp.data.dataProduct);                    
                }
            })            
    },[])

    const editarProductos = (objPro) => {        
        axios.put(`/api/v1/productos/${id}`, objPro)
            .then(resp => {                
                if(!resp.data.error) {                                   
                    setRecargar(!recargar);                
                    Swal.fire('','Se ha actualizado los datos del Producto','success');
                    return true;
                } else {
                    Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                    return false;
                }
            })       
    }

    const guardarProducto = async e =>{
        e.preventDefault();
        let respuesta=false;
        
        respuesta = await editarProductos(formulario);
        navigate('/creaproducto')        

        if(respuesta){
            console.log('aca vamos si la respuesta es true');
        }
    }

    return(

        <div className="content-app">
            <TopNav></TopNav>
            <Container>
                <h1>Edición de Producto</h1>
                <Form onSubmit={guardarProducto}>
                <FormGroup>
                        <Label>código:</Label>
                        <Input type="text"
                                placeholder="Codigo..."
                                name='codigo'
                                onChange={actualizarFormulario}
                                required
                                value={formulario.codigo}
                                minLength={2}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>nombre:</Label>
                        <Input type="text"
                                placeholder="Nombre..."
                                name='nombre'
                                onChange={actualizarFormulario}
                                required
                                value={formulario.nombre}
                                minLength={3}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>descripcion:</Label>
                        <Input type="text"
                                placeholder="Descripcion..."
                                name='descripcion'
                                onChange={actualizarFormulario}
                                value={formulario.descripcion}
                        />                        
                    </FormGroup>
                    <FormGroup>
                        <Label>unidad:</Label>
                        <Input type="text"
                                placeholder="Unidad..."
                                name='unidad'
                                required
                                onChange={actualizarFormulario}                                
                                value={formulario.unidad}
                                minLength={3}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>valor:</Label>
                        <Input type='number'                                
                                name='valor'
                                required
                                onChange={actualizarFormulario}                                
                                value={formulario.valor}
                                min={0}
                        />
                    </FormGroup>
                    <Button type="submit" color="primary">Actualizar Producto</Button>
                </Form>                
            </Container>
            <div className='content-main-footer'>
                <p>Proyecto cotizador - Victor Valenzuela</p>
            </div>
        </div>
    )
}

export default EditaProductos;