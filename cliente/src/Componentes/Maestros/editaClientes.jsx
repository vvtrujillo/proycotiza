import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import TopNav from "../Navs/topNav";
import Swal from "sweetalert2";

const EditaClientes = () => {

    const {id} = useParams(); //rescato el id desde el parametro de la URL
    const navigate = useNavigate();  

    const[formulario, setFormulario] = useState([]);

    const actualizarFormulario = ({target: {name, value}}) => {        
        setFormulario({
            ...formulario,
            [name]: value            
        })
    } 

    useEffect(() => {
        axios.get(`/api/v1/clientes/${id}`)
            .then(resp => {                
                if(!resp.data.error){
                    setFormulario(resp.data.dataClient);                    
                }
            })            
    },[])

    const editarCliente = (obj) => {
        console.log('actulizo', obj)
        axios.put(`/api/v1/clientes/${id}`, obj)
            .then(resp => {
                if(!resp.data.error){
                    setFormulario([...formulario, resp.data.dataCliente]);
                    Swal.fire('','Se ha actualizado el cliente correctamente','success');
                    return true
                }else{
                    Swal.fire('','No se pudo actualizar el cliente','error');
                    return false
                }
            })
    }

    const guardarCliente = async e =>{
        e.preventDefault();
        let respuesta=false;

        
        respuesta = await editarCliente(formulario);
        navigate('/creacliente')
        

        if(respuesta){
            console.log('aca vamos si la respuesta es true');
        }
    }




    return(
        <div className="content-app">
            <TopNav></TopNav>
            <Container>
                <h1>Editar Cliente</h1>
                <Form onSubmit={guardarCliente} style={{'marginTop':'20px'}}>
                    <FormGroup>
                        <Label>Razon Social:</Label>
                        <Input type="text"
                               placeholder="Razon social..."
                               required
                               minLength={3}
                               name='razonsocial'
                               onChange={actualizarFormulario}
                               value={formulario.razonsocial}
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
                               value={formulario.email}
                        />
                    </FormGroup>
                    <Button type="submit" color="primary">Actualizar Cliente</Button>
                </Form>
            </Container>
            <div className='content-main-footer'>
                <p>Proyecto cotizador - Victor Valenzuela</p>
            </div>
        </div>
    )
}

export default EditaClientes;