import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
    Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import {link} from 'react-router-dom'; 

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            profession: '',  
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }
    handleLogin(event){
        
    }
    render() {
        return (
          <div className="container">
            <div className="row">
              Veteran Meet App
            </div>
            <div className="loginForm">
                <div className="row row-content">
                <div className="col-12">
                    <h3>Login to Continue : </h3>
                </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email : </Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="password" md={2}>Password : </Label>
                                <Col md={10}>
                                    <Input type="password" id="password" name="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Login
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="signupForm">
                <div className="row row-content">
                <div className="col-12">
                    <h3>Dont't have an account!</h3>
                    <h2>Sign Up : </h2>
                </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="name" name="name"
                                        placeholder="Name"
                                        value={this.state.firstname}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="text" id="email" name="email"
                                        placeholder="email"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange} />
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Input type="tel" id="password" name="password"
                                        placeholder="password"
                                        value={this.state.telnum}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="profession" md={2}>Profession</Label>
                                <Col md={10}>
                                    <Input type="profession" id="profession" name="profession"
                                        placeholder="profession"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Sign Up!
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}
export default Login;