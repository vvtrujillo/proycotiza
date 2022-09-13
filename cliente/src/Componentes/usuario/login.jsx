import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useContext } from "react";
import UserContext from "../Context/user-context";
import {useNavigate,Link } from "react-router-dom";


//vamos a crear una variable para setear los valores del formulario en blanco.
//como este es el login solo son 2 campos, usuario y contraseña.

const estadoInicial = {
    username: '',
    password: ''
}

const Login = () => {

    const [formulario, setFormulario] = useState(estadoInicial); //Declaramos un Estado para el formulario de inicio de sesion.
    const context = useContext(UserContext); //Para usar en contexto de usuario
    const navigate = useNavigate(); //Declaramos una constante para navegar en nuestra aplicación

    const actualizarFormulario = ({target: {name, value}}) => { ///ocupamos esta funcion para ir actualizando los valores de formulario con lo que ingresamos en el Form.
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    //Acá creamos la funcion login para utilizar el el API de login
    const login = e => {
        e.preventDefault();
        axios.post('/api/v1/login', formulario)
            .then(respuesta => {
                console.log(respuesta.data.error);
                console.log(respuesta);
                if(!respuesta.data.error) {
                    context.setUsuario(respuesta.data.datos);
                    sessionStorage.setItem('USUARIO', JSON.stringify(respuesta.data.datos));
                    navigate('/');
                } else {
                    Swal.fire('Login', respuesta.data.mensaje, "error");
                }
            })
    }

    return (
        <React.Fragment>
            <div className="login">
                <div className="login-l">
                    <Container>
                        <Form onSubmit={login}>
                            <FormGroup>
                                <Label>username: </Label>
                                <Input type="text"
                                    name="username"
                                    required
                                    value={formulario.username}
                                    onChange={actualizarFormulario}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>password: </Label>
                                <Input type="password"
                                    name="password"
                                    required
                                    value={formulario.password}
                                    onChange={actualizarFormulario}
                                    minLength={6}
                                />
                            </FormGroup>
                            <Row>
                                <Col><Button type="submit" color="primary" >Ingresar</Button></Col>
                                <Col><Link to={'/registro'}><Button color="success">Registrar</Button></Link></Col>
                            </Row>
                        </Form>
                    </Container>                    
                </div>
            </div>            
        </React.Fragment>
    )
}

export default Login;