import * as ActionTypes from './ActionTypes';

export const Dishes = (state ={ isLoading: true, errMessage: null, dishes: [] }, action)=>{
    switch(action.type) {
        case ActionTypes.DISHES_LOADING:
                return {...state, isLoading: true, errMessage: null, dishes: []};
        case ActionTypes.DISHES_FAILED:
                return {...state, isLoading: false, errMessage: action.payload, dishes: []};
        case ActionTypes.ADD_DISHES:
                return {...state, isLoading: false, errMessage: null, dishes: action.payload};
        default:
            return state;
    }
}