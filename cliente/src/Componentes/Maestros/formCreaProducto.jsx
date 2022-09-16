import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Swal from "sweetalert2";
import TopNav from "../Navs/topNav";


const estadoInicial = {
    codigo:'',
    nombre:'',
    descripcion:'',
    unidad:'',
    valor:0
}
const FormCreaProducto = () => {

    const[datos, setDatos] = useState([]);
    const[formulario, setFormulario] = useState(estadoInicial);
    const{id} = useParams();

    const actualizarFormulario = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    //funcion para crear producto
    const crearProducto = (obj) => {
        console.log('crea producto OBJ: ',obj);
        return axios.post('/api/v1/productos', obj)        
            .then(resp => {
                if(!resp.data.error){
                    setDatos([...datos, resp.data.dataProduct]);
                    Swal.fire('','El Producto se creó correctamente', 'success');
                    return true
                }else{
                    Swal.fire('','No se pudo crear el producto')
                }
            })
    }

    const guardarProducto = async e => {
        e.preventDefault();
        let respuesta = false;

        if(!id){
            respuesta = await crearProducto(formulario);
            setFormulario(estadoInicial);
        }else{
            console.log('actualizar', formulario);
        }

        if(respuesta){
            console.log('aca vamos si la respuesta es true');
        }
    }


    return(
        <React.Fragment>
            <TopNav></TopNav>
            <Container>
                <h1>Creación de Producto</h1>
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
                    <Button type="submit" color="primary">Guardar Producto</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default FormCreaProducto;