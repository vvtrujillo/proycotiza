import React from "react";
import { useState } from "react";
import { Button, Container, FormGroup, Input, Label, Form } from "reactstrap";
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import TopNav from "../Navs/topNav";
import ListarCliente from "./listarCliente";

const estadoInicial = {
    razonsocial: '',
    email:''
}

const FormCreaCliente = () => {

    const[datos, setDatos] = useState([]);
    const[form, setForm] = useState(estadoInicial);
    const {id} = useParams();

    const actualizarFormulario = ({target: {name, value}}) => {
        console.log('formulario',form)
        setForm({
            ...form,
            [name]: value            
        })
    } 

    //Funcion para crear cliente
    const crearCliente = (obj) => {
        return axios.post('/api/v1/clientes', obj)
            .then(resp => {
                if(!resp.data.error){
                    setDatos([...datos, resp.data.dataCliente]);
                    Swal.fire('','Se ha creado el cliente correctamente','success');
                    return true
                }else{
                    Swal.fire('','No se pudo crear el cliente','error');
                    return false
                }
            })
    }

    const guardarCliente = async e =>{
        e.preventDefault();
        let respuesta=false;

        if(!id){
            respuesta = await crearCliente(form);
            setForm(estadoInicial); //devolvemos el formulario al estado inicial
        }else{
            console.log('Actualiza', form);
        }

        if(respuesta){
            console.log('aca vamos si la respuesta es true');
        }
    }


    return(
        <React.Fragment>
            <TopNav></TopNav>
            <Container>
                <h1>Formulario Crea Cliente</h1>
                <Form onSubmit={guardarCliente}>
                    <FormGroup>
                        <Label>Razon Social:</Label>
                        <Input type="text"
                               placeholder="Razon social..."
                               required
                               minLength={3}
                               name='razonsocial'
                               onChange={actualizarFormulario}
                               value={form.razonsocial}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email"
                               placeholder="Email..."
                               required
                               minLength={3}
                               name='email'
                               onChange={actualizarFormulario}
                               value={form.email}
                        />
                    </FormGroup>
                    <Button type="submit" color="primary">Guardar Cliente</Button>
                </Form>
                <ListarCliente datos={datos}></ListarCliente>
            </Container>
        </React.Fragment>
    )
}

export default FormCreaCliente;