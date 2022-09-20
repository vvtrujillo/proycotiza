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
            confirmButtonText:'Si',
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
        <Navbar {...args}>
            <NavbarBrand><Link to={'/'}>Home</Link></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>                            
                        <Link to={'/cotizar'}>
                            <p>Cotizar</p>
                        </Link>                        
                    </NavItem>                    
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Datos Maestros
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem><Link to={'/creacliente'}><p>Clientes</p></Link></DropdownItem>
                            <DropdownItem><Link to={'/creaproducto'}><p>Productos</p></Link></DropdownItem>
                            <DropdownItem><Link to={'/registro'}><p>Usuarios</p></Link></DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <p onClick={salir} style={{'cursor':'pointer'}}>Salir</p>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default TopNav;