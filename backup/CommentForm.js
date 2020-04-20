import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length; 
const maxLength = (len) => (val) => !val || (val.length <=len);
const minLength = (len) => (val) => val && (val.length >=len);

class CommentForm extends Component {

        constructor(props){
            super(props);
            this.state = {
                isModalOpen: false
            }
            this.toggleModel = this.toggleModel.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModel(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }

        handleSubmit(values){
            alert("The current state is: "+JSON.stringify(values));
        }

        render(){
                return(
                    <div>
                        <Button outline onClick = {this.toggleModel}>
                            Comment
                        </Button>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModel} >
                            <ModalHeader toggle={this.toggleModel}>Feedback</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit = {(values)=>this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Col className="col-12">
                                            <Label htmlFor = "rating">Rating</Label>
                                        </Col>
                                        <Col className="col-12">
                                            <Control.select model=".rating" name="rating" className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col className="col-12">
                                            <Label htmlFor = "name">Your Name</Label>
                                        </Col>
                                        <Col className="col-12">
                                            <Control.text model=".name" name="name" id="name" placeholder="Your Name"
                                                className="form-control" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}>
                                            </Control.text>
                                            <Errors className="text-danger" model = ".name" show="touched" 
                                            messages = {{required: "Required", minLength: "Name should be more than 2 letters", maxLength: "Name should be less than 15 letters"}}/>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col className="col-12">
                                            <Label htmlFor = "message">Comment</Label>
                                        </Col>
                                        <Col className="col-12">
                                            <Control.textarea rows="6" model=".message" name="message" id="message"
                                                className="form-control">
                                            </Control.textarea>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{size: 10}}>
                                            <Button type="submit" color="primary">
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                    </div>
                );
        }

}


export default CommentForm;