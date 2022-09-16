import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Container, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";



const FormCrearCoti = () => {

    const[datosCli, setDatosCli] = useState([]);
    const[datosProd, setDatosProd] = useState([]);
    

    //para traer los clientes que estan creados
    useEffect(() => {
        axios.get('/api/v1/clientes')
            .then(resp => {
                if(!resp.data.error){
                  console.log('Use Effect para traer los clientes creados',resp.data.dataClient)
                  setDatosCli(resp.data.dataClient); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }
              })
    }, [])

    //para traer los productos que estan creados
    useEffect(() => {
        axios.get('/api/v1/productos')
            .then(resp => {
                if(!resp.data.error){
                  console.log('Use Effect para traer los productos creados',resp.data.dataProduct)
                  setDatosProd(resp.data.dataProduct); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }
              })
    }, [])


    return(
        <React.Fragment>
            <Container>
              <Form>
                <h1>Crear Cotizacion</h1>
                <FormGroup>
                    <Label>Cliente:</Label>
                    <Input type="select"
                           required
                    >
                        <option></option>
                        {
                            datosCli.map((j,i) =>
                            <option>{j.razonsocial}</option>
                            )
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Producto:</Label>
                    <Input type="select"
                           required
                    >
                      <option></option>
                        {
                            datosProd.map((j,i) =>
                            <option>{j.nombre}</option>
                            )
                        }
                    </Input>
                </FormGroup>
                <Button color='primary' type="submit">Generar Cotización</Button>
              </Form>                
            </Container>
        </React.Fragment>
    )
}

export default FormCrearCoti;