import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { history } from './utils';

import { PrivateRoute } from "./componets/hoc/PrivateRoute";
import Login from './containers/login'
import Products from './containers/products'

import { Spin } from "antd";


class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Spin spinning={this.props.isloading}>
            <Switch>
              {/* <Route path="/login" component={Login} />*/}
              <Redirect exact path="/"  to="/product" /> 
              <Route path="/product" component={Products} />
              {/* <PrivateRoute path='*'  component={Home} /> */}
            </Switch>
          </Spin>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    isloading: state.loadReducer.isloading
  }
}

export default connect(mapStateToProps, null)(App);


