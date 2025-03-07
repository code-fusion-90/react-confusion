import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.NEW_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date =  new Date().toISOString();

    return fetch(baseUrl+"comments",{
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok)
            return response;
        else{
            let error= new Error("Error "+response.status+" : "+response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        let err = new Error(error.message);
        throw err;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); 
            alert('Your comment could not be posted\nError: '+error.message); });

}


//for Dishes
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

   return fetch(baseUrl + 'dishes')
   .then(response => {
       if(response.ok)
            return response;
        else{
            let error= new Error("Error "+response.status+" : "+response.statusText);
            error.response = response;
            throw error;
        }
   }, error => {
        let err = new Error(error.message);
        throw err;
   })
    .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});



//for Promos
export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));

   return fetch(baseUrl + 'promotions')
   .then(response => {
       if(response.ok)
         return response;
       else{
           let error = new Error("Error "+ response.status + " : " +response.statusText);
           error.response = response;
           throw error;
       }
   }, error => {
       let errmess =  new Error(error.message);
       throw(errmess);
   })
    .then(response => response.json())
    .then(promotions => dispatch(addPromos(promotions)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});

//for Leaders
export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

   return fetch(baseUrl + 'leaders')
   .then(response => {
            if(response.ok)
                return response;
            else{
                let error = new Error("Error "+ response.status + " : " +response.statusText);
                error.response = response;
                throw error;
            }
    }, error => {
        let errmess =  new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}


// Task 1: Leaders
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => { 
        return ({
            type: ActionTypes.LEADERS_FAILED,
            payload: errmess
        })
};


export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


//For comments
export const fetchComments = () => (dispatch) => {

   return fetch(baseUrl + 'comments')
   .then(response => {
    if(response.ok)
      return response;
    else{
            let error = new Error("Error "+ response.status + " : " +response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        let errmess =  new Error(error.message);
        throw(errmess);
    })
    .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


//Task 2 : Post feedback
export const addFeedback = (feedback) => ({
    type: ActionTypes.NEW_FEEDBACK,
    payload: feedback
});

export const postFeedback = (fname, lname, telnum, email, agree, contactType,message) => (dispatch) => {

    const newFeedback = {
        fname: fname,
        lname: lname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message

    }
    newFeedback.date =  new Date().toISOString();

    return fetch(baseUrl+"feedback",{
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok)
            return response;
        else{
            let error= new Error("Error "+response.status+" : "+response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        let err = new Error(error.message);
        throw err;
    })
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(error =>  { console.log('post feedback', error.message); 
            alert('Your feedback could not be posted\nError: '+error.message); });

}