import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox,Row,Col } from 'antd';

import * as actions from '../../actionts/';
import { history } from '../../utils';

const FormItem = Form.Item;



class Create extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.actions.addProduct(values);    
            }
        });
    }

    cancel() {
        history.push('/product/')
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (

            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem label="Title" {...formItemLayout}>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input your title!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Category" {...formItemLayout}>
                    {getFieldDecorator('category', {
                        rules: [{ required: true, message: 'Please input your category!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Brand" {...formItemLayout}>
                    {getFieldDecorator('brand', {
                        rules: [{ required: true, message: 'Please input your brand!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Quantity" {...formItemLayout}>
                    {getFieldDecorator('quantity', {
                        rules: [{ required: true, message: 'Please input your quantity!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Price" {...formItemLayout}>
                    {getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Please input your price!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Image Url" {...formItemLayout}>
                    {getFieldDecorator('image_url', {
                        rules: [{ required: true, message: 'Please input your image url!' }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                <div>
                        <Row>
                            <Col span={3}>  <Button type="primary" htmlType="submit">Add</Button></Col>
                            <Col span={3}>   <Button htmlType="Cancel" onClick={this.cancel}>Cancel</Button></Col>

                        </Row>
                    </div>
                    

                </FormItem>
            </Form>
        );
    }
}



Create = Form.create()(Create);

function mapStateToProps(state) {
    return {
        isFetching: state.productsReducer.isFetching,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Create);


