import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'
import DishDetail from './DishdetailComponent';
import Test from './testComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = (state)=>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset("feedback")) }

});


class Main extends Component {

  componentDidMount() {
    console.log("coponent did mount");
    this.props.fetchDishes();
  }

  render() {
    const HomePage = () => {
      return(
        <Home dish = {this.props.dishes.dishes.filter((dish)=> dish.featured )[0]}
              dishIsLoading = {this.props.dishes.isLoading}
              dishErrMessage = {this.props.dishes.errMessage}
              promotion = {this.props.promotions.filter((promotion)=> promotion.featured)[0]} 
              leader = {this.props.leaders.filter((leader) => leader.featured)[0]}/> 
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish = {this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId, 10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMessage={this.props.dishes.errMessage}
        comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))} 
        addComment={this.props.addComment}/>
      );

    }

    const AboutUs = () => {
      return(
        <About leaders =  {this.props.leaders}/>
      );

    }

    return (
    <div className="App">
      <Header />
      <Switch>
          <Route path="/home" component = {HomePage} />
          <Route path='/aboutus' component = {AboutUs} /> 
          <Route exact path="/menu" component = {() => <Menu dishes = {this.props.dishes}/> } />
          <Route exact path="/contactus" component = {() => <Contact resetFeedbackForm= {this.props.resetFeedbackForm} />} />
          <Route path="/menu/:dishId" component = {DishWithId} />s
          <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
