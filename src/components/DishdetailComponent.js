import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, ModalBody, Modal, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

//Task 3 constants
const required = (val) => val && val.length; 
const maxLength = (len) => (val) => !val || (val.length <=len);
const minLength = (len) => (val) => val && (val.length >=len);

function RenderDish({dish}){

        if(dish != null){
            return(
                
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                                <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                        <CardBody>
                            <CardTitle>{ dish.name }</CardTitle>
                            <CardText>{ dish.description} </CardText>
                        </CardBody>
                    </Card>
            );
          }else {
              return(
                  <div></div>
              );
          }

    }


function RenderComments({comments, dishId, addComments}){
       if(comments != null){
            const comm = comments.map(commEle => {
                return (
                    <div>
                        <li key = {commEle.id}>
                            <p>{commEle.comment}</p>
                            <p>-- {commEle.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(commEle.date)))} </p>
                        </li>
                    </div>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comm}
                    </ul>
                    <CommentForm dishId = {dishId} addComments={addComments}/>
                </div>
            );
        }
       else 
            return (
                <div></div>
            );
   }


const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMessage) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
      return(
        <div className="container">
           <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
            </div>
            <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} addComments = {props.addComment} dishId={props.dish.id}/>
                    </div>
            </div>
        </div>
      );
      else 
        return (
            <div></div>
        );
  }


//Task 1, 2 & 3
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
        this.toggleModel();
        this.props.addComments(this.props.dishId, values.rating, values.name, values.message);
    }

    render(){
            return(
                <div>
                    <Button outline onClick = {this.toggleModel}>
                        <span className="fa fa-pencil"> Submit Comment</span>
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

export default DishDetail;
