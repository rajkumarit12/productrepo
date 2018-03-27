import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import * as actions from '../actionts';

import './login.css';
const FormItem = Form.Item;

class Login extends React.Component {

    constructor(props) {
        super(props);
        //this.props.actions.logout();
        this.loading = this.loading.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.actions.login(values.userName, values.password)
            }
        });
    }

    loading() {
        if (this.props.loggingIn) {
            return <Button loading className="login-form-button" type="primary">logging In..</Button>;
        } else {
            return <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
        </Button>
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='mainContent loginPanel'>
                {/* <h1 className='loginTitle'> Welcome  </h1> */}
                <div className='loginContent'>
                    {/* <img className='loginImage' src={logo} alt=" LOGO" /> */}

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>


                            {this.loading()}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

Login = Form.create()(Login);;

function mapStateToProps(state) {
    return { loggingIn: state.authenticationReducer.loggingIn }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);