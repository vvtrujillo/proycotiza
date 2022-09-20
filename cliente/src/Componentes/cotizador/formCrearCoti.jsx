import React from "react";
import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Container, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import TopNav from "../Navs/topNav";
import { useParams, Link } from "react-router-dom";


const estadoInicial = {
  cliente: '',
  producto: '',
  cantidad: 0,
  valortotal: 0,
  usuariocreador:''
}

const FormCrearCoti = () => {  

    const[datosCli, setDatosCli] = useState([]);
    const[datosProd, setDatosProd] = useState([]);
    const[datosCotizacion, setDatosCotizacion] = useState([]);

    const[formulario, setFormulario] = useState(estadoInicial);

    useEffect(() => {
      if(!usuario) {
        if(sessionStorage.getItem('USUARIO')){
          setUsuario(JSON.parse(sessionStorage.getItem('USUARIO')));
        }else {
         
        }
      } else {
        sessionStorage.setItem('USUARIO', JSON.stringify(usuario));
      }
    }, [])

    const [usuario, setUsuario] = useState(); //estado usuario para trabajar con los datos del usuario login    

    //console.log(usuario.email);

    const{id} = useParams();

    const actualizarFormulario = ({target: {name, value}}) => {     
      setFormulario({
          ...formulario,
          [name]: value            
      })
    }   

    //para traer los clientes que estan creados
    useEffect(() => {
        axios.get('/api/v1/clientes')
            .then(resp => {
                if(!resp.data.error){                  
                  setDatosCli(resp.data.dataClient); 
                }else {
                  Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
                }
              })
        axios.get('/api/v1/productos')
        .then(resp => {
            if(!resp.data.error){              
              setDatosProd(resp.data.dataProduct); 
            }else {
              Swal.fire('Ooops!!!', resp.data.mensaje, 'error');
            }
          })
    }, [])
    
    const CrearCotizacion = (obj) => {
      obj.usuariocreador=usuario.email;
      obj.valortotal=45555;
      return axios.post('/api/v1/cotizaciones', obj)
        .then(resp => {
          if(!resp.data.error){
            setDatosCotizacion([...datosCotizacion, resp.data.dataCotizacion])
            Swal.fire('','La cotización se creo correctamente','success');
            return true
          }else{
            Swal.fire('','No se pudo crear la cotización','error');
          }
        })
    }

    const guardarCotizacion = async e =>{
      e.preventDefault();
      let respuesta = false;

      if(!id){
        respuesta = await CrearCotizacion(formulario);
        setFormulario(estadoInicial);
      }else{
        console.log('actualizar', formulario);
      }

      if(respuesta){
        console.log('aca vamos si la respuesta es true');
      }
    }

    return(
      <div className="content-app">
        <TopNav></TopNav>
        <Container>
          <Form onSubmit={guardarCotizacion}>
            <h1>Crear Cotizacion</h1>
            <Row style={{'margin':'20px'}}>
              <Col><Button color="warning" onClick={e => estadoInicial}>Limpiar</Button></Col>
              <Col><Link to={'/revisarcotizaciones'}><Button color="success">Revisar Cotizaciones</Button></Link></Col>
            </Row>
            <FormGroup>
                <Label>Cliente:</Label>
                <Input type="select"
                        required
                        name='cliente'
                        value={formulario.cliente}
                        onChange={actualizarFormulario}
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
                        name="producto"
                        value={formulario.producto}
                        onChange={actualizarFormulario}
                >
                  <option></option>
                    {
                        datosProd.map((j,i) =>
                        <option>{j.nombre}</option>
                        )
                    }
                </Input>
            </FormGroup>
            <FormGroup>
              <Label>Cantidad</Label>
              <Input type="number"
                      placeholder="cantidad"
                      required
                      min={0}
                      name='cantidad'
                      value={formulario.cantidad}
                      onChange={actualizarFormulario}                      
                      >
              </Input>
            </FormGroup>
            <Row>
              <Col><Button color='primary' type="submit">Generar Cotización</Button></Col>              
            </Row>            
          </Form>                
        </Container>
        <div className='content-main-footer'>
          <p>Proyecto cotizador - Victor Valenzuela</p>
        </div>
      </div>        
    )
}

export default FormCrearCoti;