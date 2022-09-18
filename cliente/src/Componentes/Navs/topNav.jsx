import React, {useState} from "react"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TopNav = (args) => {    

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const navigate = useNavigate();
    const salir = (e) => {
        Swal.fire({
            text: 'Seguro que desea cerrar sesión??',
            title:'Salir',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonText:'No',
            cancelButtonColor: 'green'
        }).then(resp =>{
            if(resp.isConfirmed){
                sessionStorage.removeItem('USUARIO');
                navigate('/login');
            }            
        })
    }

    return(
        <div>
            <Navbar {...args}>
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                    <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                        GitHub
                    </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>Option 1</DropdownItem>
                        <DropdownItem>Option 2</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Reset</DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <NavbarText>Simple Text</NavbarText>
                </Collapse>
        </Navbar>
        </div>
    )

            {/*<div className="barra-nav">
                <Button color='danger' onClick={salir}>Salir</Button>
                <Link to={'/'}>
                    <Button color="primary">Home</Button>
                </Link>
                <Link to={'/cotizar'}>                    
                    <Button color="primary">Cotizar</Button>
                </Link>
                <Link to={'/creacliente'}>
                    <Button color='primary'>Crear Cliente</Button>
                </Link>
                <Link to={'/creaproducto'}>
                    <Button color='primary'>Crear Producto</Button>
                </Link>
                <Link to={'/registro'}>
                    <Button color="primary">Crear Usuario</Button>
                </Link>
    </div>*/}            
        
    
}

export default TopNav;