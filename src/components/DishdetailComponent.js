import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';
import Moment from 'moment';


class DishDetail extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    renderDish(dish){

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

    renderComments(comments){
        if(comments != null){
            const comm = comments.map(commEle => {
                const dateMon = Moment(commEle.date).format('MMM DD');
                const dateYear = Moment(commEle.date).format('YYYY');
                return (
                    <div key="commEle.id">
                        <li>
                            <p>{commEle.comment}</p>
                            <p>-- {commEle.author} , {dateMon}, {dateYear} </p>
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
                </div>
                
            );
        }
        else 
            return (
                <div></div>
            );
    }

  render(){
      const dish = this.props.dish;
      const comments = (dish!=null)?(dish.comments):null;
      return(
        <div className="row">
            <div className="col-sm-12 col-md-5 m-1">
                {this.renderDish(dish)}
            </div>
            <div className="col-sm-12 col-md-5 m-1">
                    {this.renderComments(comments)}
            </div>
        </div>
        
      );
  }
}

export default DishDetail;
