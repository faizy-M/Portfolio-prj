import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false
        };
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen,
          isModalOpen: false
        });
      }

    render() {
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">VeteranMeet</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/pofile'><span className="fa fa-home fa-lg"></span> Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='#'><span className="fa fa-info fa-lg"></span> Organisation</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='#'><span className="fa fa-list fa-lg"></span> Community</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}
export default Header;