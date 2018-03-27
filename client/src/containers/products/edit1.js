import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import * as actions from '../../actionts/';

const FormItem = Form.Item;

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
const CustomizedForm = Form.create({
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        console.log(props)
        return {
            title: Form.createFormField({
                ...props.title,
                value: props.title.value,
            }),
            // category: Form.createFormField({
            //     ...props.category,
            //     value: props.category.value,
            //   }),
            //   price: Form.createFormField({
            //     ...props.price,
            //     value: props.price.value,
            //   }),
        };
    },
    onValuesChange(_, values) {
        console.log(values);
    },
})((props) => {
    const { getFieldDecorator } = props.form;
    return (
        <Form layout="inline">
            <FormItem label="Title" {...formItemLayout}>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input your title!' }],
                })(
                    <Input />
                )}
            </FormItem>
        </Form>
    );
});

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.renderForm = this.renderForm.bind(this);

        state = {
            fields: {
                title: {
                    value: props.product.title,
                },
            },
        };
    }

 

    componentDidMount() {
        this.props.actions.getProduct(this.props.match.params.id);
    }

    renderForm(fields) {
        if (this.props.product) {
            return  <CustomizedForm {...fields} onChange={this.handleFormChange} />
        }
    }


    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    }
    render() {
        const fields = this.state.fields;
        return (
            <div>
                {this.renderForm(fields)}
            </div>
        );
    }
}


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


