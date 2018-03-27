import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox, Spin, Row, Col } from 'antd';
import { history } from '../../utils';

import * as actions from '../../actionts/';

const FormItem = Form.Item;

const LoadingDiv = {
    textAlign: 'center',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '30px 50px',
    margin: '20px 0'
};

class Edit extends React.Component {

    componentDidMount() {
        this.props.actions.getProduct(this.props.match.params.id);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.actions.editProduct(values, this.props.match.params.id);
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

        if (!this.props.product) {
            return <div style={LoadingDiv}>
                <Spin size="large" tip="Loading..." />
            </div>
        }



        return (


            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem label="Title" {...formItemLayout}>
                    {getFieldDecorator('title', {
                        initialValue: this.props.product.title,
                        rules: [{ required: true, message: 'Please input your title!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Category" {...formItemLayout}>
                    {getFieldDecorator('category', {
                        initialValue: this.props.product.category,
                        rules: [{ required: true, message: 'Please input your category!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Brand" {...formItemLayout}>
                    {getFieldDecorator('brand', {
                        initialValue: this.props.product.brand,
                        rules: [{ required: true, message: 'Please input your brand!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Quantity" {...formItemLayout}>
                    {getFieldDecorator('quantity', {
                        initialValue: this.props.product.quantity,
                        rules: [{ required: true, message: 'Please input your quantity!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Price" {...formItemLayout}>
                    {getFieldDecorator('price', {
                        initialValue: this.props.product.price,
                        rules: [{ required: true, message: 'Please input your price!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem label="Image Url" {...formItemLayout}>
                    {getFieldDecorator('image_url', {
                        initialValue: this.props.product.image_url,
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



Edit = Form.create()(Edit);

function mapStateToProps(state) {
    return {
        product: state.productReducer.product,
        isFetching: state.productsReducer.isFetching,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit);


