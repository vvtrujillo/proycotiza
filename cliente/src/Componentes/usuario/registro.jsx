import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Container } from 'reactstrap';
import { Link, Navigate } from "react-router-dom";
import TopNav  from "../Navs/topNav";


const dataInicial = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Registro = () => {

    const [formulario, setFormulario] = useState(dataInicial);

    const navigate = useNavigate();

    const actualizarFormulario = ({target: {name, value}}) => {
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    const enviar = e => {
        e.preventDefault();
        axios.post('/api/v1/usuario', formulario)
            .then(respuesta => {
                if(!respuesta.data.error) {
                    Swal.fire('Registro', "El usuario se ha registrado exitósamente", "success");
                    setFormulario(dataInicial);
                    navigate('/registro'); //aca vamos directo al login
                } else {
                    Swal.fire('Registro', "Ha ocurrido un error al regitrar el usuario", "error");
                }
            })
    }

    return (
        <div className="content-app">
            <TopNav></TopNav>
            <Container>
                <div className="content-main-title">
                    <h1>Usuarios</h1>
                </div>                
                <Form onSubmit={enviar}>
                    <FormGroup>
                        <Label>Nombre:</Label>
                        <Input type="text"
                                name="nombre"
                                required 
                                value={formulario.nombre}
                                onChange={actualizarFormulario}
                                placeholder='Nombre....'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Apellido:</Label>
                        <Input type="text"
                                name="apellido"
                                required
                                value={formulario.apellido}
                                onChange={actualizarFormulario}
                                placeholder='Apellido...'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email"
                                name="email"
                                required
                                value={formulario.email}
                                onChange={actualizarFormulario}
                                placeholder='email...'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Clave:</Label>
                        <Input type="password"
                                name="password"
                                minLength={6}
                                value={formulario.password}
                                onChange={actualizarFormulario}
                                placeholder='Password...'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Confirmación de clave:</Label>
                        <Input type="password"
                                name="confirmPassword"
                                minLength={6}
                                value={formulario.confirmPassword}
                                onChange={actualizarFormulario}
                                placeholder='Confirmar password...'/>
                    </FormGroup>
                    <Button type="submit" color="primary">Guardar</Button>
                </Form>
            </Container>
                <div className='content-main-footer'>
                    <p>Proyecto cotizador - Victor Valenzuela</p>
                </div>
            </div>

    )
}

export default Registro;