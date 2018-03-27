import { combineReducers } from 'redux';
import ACTIONTYPES from "../actionts/actiontypes";


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authenticationReducer(state = initialState, action) {

    switch (action.type) {

        case ACTIONTYPES.LOGIN_REQUEST:
            return { loggingIn: true, loggedIn: false }

        case ACTIONTYPES.LOGIN_SUCCESS:
            return { loggingIn: false, loggedIn: true, username: action.username }

        case ACTIONTYPES.LOGIN_FAILURE:
            return { loggingIn: false }


        default:
            return state
    }
}

function productsReducer(state = {}, action) {

    switch (action.type) {

        case ACTIONTYPES.ALLPRODUCTS_REQUEST:
            return { ...state, isFetching: true }

        case ACTIONTYPES.ALLPRODUCTS_SUCCESS:
            return { ...state, products: action.products, isFetching: false }

        case ACTIONTYPES.ALLPRODUCTS_FAILURE:
            return { ...state, products: [], isFetching: false }
        
        case ACTIONTYPES.ADD_PRODUCT_REQUEST:
        return{...state,isFetching:true}

        case ACTIONTYPES.ADD_PRODUCT_SUCCESS:
        return{...state,isFetching:false}

        case ACTIONTYPES.ADD_PRODUCT_SUCCESS:
        return{...state,isFetching:false}

        default:
            return state
    }
}

function productReducer(state = {}, action) {

    switch (action.type) {

        case ACTIONTYPES.PRODUCT_REQUEST:
            return { ...state, isFetching: true }

        case ACTIONTYPES.PRODUCT_SUCCESS:
            return { ...state, product: action.product, isFetching: false }

        case ACTIONTYPES.PRODUCT_FAILURE:
            return { ...state, product:{} , isFetching: false }
    

        default:
            return state
    }
}

export function loadReducer(state = { isloading: false, ShowMiniNav: true }, action) {
    switch (action.type) {
        case ACTIONTYPES.LOADING:
            return { ...state, isloading: true }

        case ACTIONTYPES.LOADED:
            return { ...state, isloading: false }

        default:
            return state
    }
}



const appReducer = combineReducers({
    authenticationReducer,
    productsReducer,
    loadReducer,
    productReducer
});

const rootReducer = (state, action) => {
    if (action.type === ACTIONTYPES.LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action)
}


export default rootReducer;