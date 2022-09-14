import React from "react";
import { Button, Container, FormGroup, Input, Label, Form } from "reactstrap";

const FormCreaCliente = () => {


    return(
        <React.Fragment>
            <Container>
                <h1>Formulario Crea Cliente</h1>
                <Form>
                    <FormGroup>
                        <Label>Razon Social:</Label>
                        <Input type="text"
                               placeholder="Razon social..."
                               required
                               minLength={3}
                               name='razonsocial'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email"
                               placeholder="Email..."
                               required
                               minLength={3}
                               name='email'
                        />
                    </FormGroup>
                    <Button type="submit" color="primary">Guardar Cliente</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default FormCreaCliente;