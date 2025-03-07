import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';

class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email: false
            }
        } 

        //this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
       // this.test = this.test.bind(this);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox'?target.checked:target.value
        this.setState({
            [name]: value
        });

    }

    handleSubmit = (event) => {
        alert("The current state is: "+JSON.stringify(this.state));
        event.preventDefault();

    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate = (firstname, lastname, telnum, email) => {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: ''
        };

        if(this.state.touched.firstname && firstname.length < 3)
            errors.firstname = "First Name should be more than 3 letters."

        if(this.state.touched.lastname && lastname.length < 3)
            errors.lastname = "Last Name should be more than 3 letters."
        
        const reg = /^\d{10}$/;
        if(this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = "Please eneter a 10 digit valid number."

        const emailreg = /@/;
        if(this.state.touched.email && !emailreg.test(email))
            errors.email = "Enter a valid email."

        return errors;
    }

    render(){
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                    <Col md={2}>
                                        <Label htmlFor="firstname">First Name</Label>
                                    </Col>
                                    <Col md={10}>
                                        <Input onChange={this.handleInputChange} type="text" id="firstname" name="firstname" placeholder=" First Name"
                                            value={this.state.firstname} 
                                            onBlur = {this.handleBlur('firstname')}
                                            valid={errors.firstname === ''}
                                            invalid={errors.firstname !== ''}/>
                                            <FormFeedback>{errors.firstname}</FormFeedback>
                                    </Col> 
                            </FormGroup>
                            <FormGroup row>
                                    <Col md={2}>
                                        <Label htmlFor="lastname">Last Name</Label>
                                    </Col>
                                    <Col md={10}>
                                        <Input onChange={this.handleInputChange} type="text" id="lastname" name="lastname" placeholder=" Last Name"
                                            value={this.state.lastname} 
                                            valid={errors.lastname === ''}
                                            invalid={errors.lastname !== ''}
                                            onBlur = {this.handleBlur('lastname')}/>
                                             <FormFeedback>{errors.lastname}</FormFeedback>
                                    </Col> 
                            </FormGroup>
                            <FormGroup row>
                                    <Col md={2}>
                                        <Label htmlFor="telnum">Contact No.</Label>
                                    </Col>
                                    <Col md={10}>
                                        <Input onChange={this.handleInputChange} type="tel" id="telnum" name="telnum" placeholder=" Telephone Num"
                                            value={this.state.telnum} 
                                            valid={errors.telnum === ''}
                                            invalid={errors.telnum !== ''}
                                            onBlur = {this.handleBlur('telnum')}/>
                                            <FormFeedback>{errors.telnum}</FormFeedback>
                                    </Col> 
                            </FormGroup>
                            <FormGroup row>
                                    <Col md={2}>
                                        <Label htmlFor="email">Email Id.</Label>
                                    </Col>
                                    <Col md={10}>
                                        <Input onChange={this.handleInputChange} type="text" id="email" name="email" placeholder=" Email Id"
                                            value={this.state.email} 
                                            valid={errors.email === ''}
                                            invalid={errors.email !== ''}
                                            onBlur = {this.handleBlur('email')}/>
                                         <FormFeedback>{errors.email}</FormFeedback>
                                    </Col> 
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onChange={this.handleInputChange} type="checkbox" name="agree" checked={this.state.agree}/>
                                                {' '} <strong> May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                        <Label htmlFor="message" md={2}>Your Feedback</Label>
                                        <Col md={10}>
                                            <Input type="textarea" id="message" name="message"
                                                rows="12"
                                                value={this.state.message}
                                                onChange={this.handleInputChange}></Input>
                                        </Col>
                            </FormGroup>
                            <FormGroup row>
                                        <Col md={{size: 10, offset: 2}}>
                                            <Button type="submit" color="primary">
                                                Send Feedback
                                            </Button>
                                        </Col>
                            </FormGroup>
                        </Form>
                    </div>

                </div>
            </div>
        );
    }
}


export default Contact;