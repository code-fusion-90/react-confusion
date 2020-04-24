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
import { postComment, fetchDishes, fetchComments, fetchLeaders, fetchPromos, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state)=>{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm: () => { dispatch(actions.reset("feedback")) },
  fetchComments: () => { dispatch(fetchComments()) },
  fetchLeaders: () => { dispatch(fetchLeaders()) },
  fetchPromos: () => { dispatch(fetchPromos()) },
  postFeedback: (fname, lname, telnum, email, agree, contactType, message) => dispatch(postFeedback(fname, lname, telnum, email, agree, contactType, message))

});


class Main extends Component {

  componentDidMount() {
    console.log("coponent did mount");
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchLeaders();
    this.props.fetchPromos();
  }

  render() {
    const HomePage = () => {
      return(
        <Home dish = {this.props.dishes.dishes.filter((dish)=> dish.featured )[0]}
              dishIsLoading = {this.props.dishes.isLoading}
              dishErrMessage = {this.props.dishes.errMessage}
              promotion = {this.props.promotions.promos.filter((promotion)=> promotion.featured)[0]}
              promoIsLoading = {this.props.promotions.isLoading}
              promoErrMessage = {this.props.promotions.errMessage}
              leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderIsLoading = {this.props.leaders.isLoading}
              leaderErrMessage = {this.props.leaders.errMessage}/> 
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish = {this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId, 10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMessage={this.props.dishes.errMessage}
        comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
        commErrMessage = {this.props.comments.errMessage} 
        postComment={this.props.postComment}/>
      );

    }

    const AboutUs = () => {
      console.log("About us: ");
      console.log(this.props.leaders.errMessage);
      return(
        <About leaders =  {this.props.leaders.leaders}
        isLoading={this.props.leaders.isLoading}
        errMessage = {this.props.leaders.errMessage}/>
      );

    }

    return (
    <div className="App">
      <Header />
      <TransitionGroup >
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch location={this.props.location}>
              <Route path="/home" component = {HomePage} />
              <Route path='/aboutus' component = {AboutUs} /> 
              <Route exact path="/menu" component = {() => <Menu dishes = {this.props.dishes}/> } />
              <Route exact path="/contactus" component = {() => <Contact resetFeedbackForm= {this.props.resetFeedbackForm} postFeedback = {this.props.postFeedback}/>} />
              <Route path="/menu/:dishId" component = {DishWithId} />s
              <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
