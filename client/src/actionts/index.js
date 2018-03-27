import fetch from 'cross-fetch';
import { history } from '../utils';
import ACTIONTYPES from "./actiontypes";
import { Message } from 'antd'




export function getAllProducts() {
    return function (dispatch) {

        return fetch('/products')
            .then(res => {
                if (res.status >= 400) {
                    dispatch(failure(res.statusText))
                    Message.error(res.statusText)
                    throw new Error("Bad response from server");
                }
                return res.json();
            })
            .then(products => {
                dispatch(success(products))
            })
            .catch(err => {
                dispatch(failure(err))
                console.error(err);
            });
    }

    function request() { return { type: ACTIONTYPES.ALLPRODUCTS_REQUEST } }
    function success(products) { return { type: ACTIONTYPES.ALLPRODUCTS_SUCCESS, products } }
    function failure(error) { return { type: ACTIONTYPES.ALLPRODUCTS_FAILURE, error } }
}

export function getProduct(id) {
    return function (dispatch) {
         
        return fetch(`/products/${id}`)
            .then(res => {
                if (res.status >= 400) {
                    dispatch(failure(res.statusText))
                    Message.error(res.statusText)
                    throw new Error("Bad response from server");
                }
                return res.json();
            })
            .then(product => {
                dispatch(success(product[0]))
            })
            .catch(err => {
                dispatch(failure(err))
                console.error(err);
            });
    }

    function request() { return { type: ACTIONTYPES.PRODUCT_REQUEST } }
    function success(product) { return { type: ACTIONTYPES.PRODUCT_SUCCESS, product } }
    function failure(error) { return { type: ACTIONTYPES.PRODUCT_FAILURE, error } }
}

export function addProduct(product) {

    return function (dispatch) {
        dispatch(request());
        dispatch(apploading());
        return fetch('/products', {
            method: 'POST',
            body: JSON.stringify(product)
        })
            .then(res => {
                if (res.status >= 400) {
                    dispatch(failure(res.statusText))
                    dispatch(apploaded());
                    Message.error(res.statusText)
                    throw new Error("Bad response from server");
                }
                return res.json();
            })
            .then(products => {
                Message.success('Product added.!')
                dispatch(success(products))
                dispatch(apploaded());
               history.push('/product/create')
            })
            .catch(err => {
                dispatch(failure(err))
                dispatch(apploaded());
                console.error(err);
            });
    }

    function request() { return { type: ACTIONTYPES.ADD_PRODUCT_REQUEST } }
    function success(products) { return { type: ACTIONTYPES.ADD_PRODUCT_SUCCESS, products } }
    function failure(error) { return { type: ACTIONTYPES.ADD_PRODUCT_FAILURE, error } }
}


export function editProduct(product,id) {

    return function (dispatch) {
        dispatch(request());
        dispatch(apploading());
        return fetch(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(product)
        })
            .then(res => {
                if (res.status >= 400) {
                    dispatch(failure(res.statusText))
                    dispatch(apploaded());
                    Message.error(res.statusText)
                    throw new Error("Bad response from server");
                }
                return res.json();
            })
            .then(products => {
                Message.success('Product updated.!')
                dispatch(success(products))
                dispatch(apploaded());
            })
            .catch(err => {
                dispatch(failure(err))
                dispatch(apploaded());
                console.error(err);
            });
    }

    function request() { return { type: ACTIONTYPES.EDIT_PRODUCT_REQUEST } }
    function success(products) { return { type: ACTIONTYPES.EDIT_PRODUCT_SUCCESS, products } }
    function failure(error) { return { type: ACTIONTYPES.EDIT_PRODUCT_FAILURE, error } }
}


export function deleteProduct(id) {

    return function (dispatch) {
        dispatch(request());
        dispatch(apploading());
        return fetch(`/products/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status >= 400) {
                    dispatch(failure(res.statusText))
                    dispatch(apploaded());
                    Message.error(res.statusText)
                    throw new Error("Bad response from server");
                }
                return res.json();
            })
            .then(products => {
                Message.success('Product Deleted.!')
                // dispatch(success(products))
                dispatch(apploaded());
                history.push('/product')
            })
            .catch(err => {
                // dispatch(failure(err))
                dispatch(apploaded());
                console.error(err);
            });
    }

    function request() { return { type: ACTIONTYPES.DELETE_PRODUCT_FAILURE } }
    function success(products) { return { type: ACTIONTYPES.DELETE_PRODUCT_SUCCESS, products } }
    function failure(error) { return { type: ACTIONTYPES.DELETE_PRODUCT_FAILURE, error } }
}

function apploading() {
    return { type: ACTIONTYPES.LOADING }
}

function apploaded() {
    return { type: ACTIONTYPES.LOADED }
}


export function logout() {
    localStorage.removeItem('username');
    history.push('/login');
    return { type: ACTIONTYPES.LOGOUT };
}