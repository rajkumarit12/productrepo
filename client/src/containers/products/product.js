import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon,Modal, Input, Layout, Col, Row, Card, List, Avatar, Divider, Button } from "antd";
import { history } from '../../utils';
import * as actions from '../../actionts/';



const { Meta } = Card;
const { Header, Footer, Content } = Layout;

const confirm = Modal.confirm;

 


class Dashboard extends Component {
    state = {
        size: 'large',
    };


    constructor(props) {
        super(props);
        this.renderProducts = this.renderProducts.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.showConfirm = this.showConfirm.bind(this);

    }

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }

    componentDidMount() {
        this.props.actions.getProduct(this.props.match.params.id);
    }

    onItemClick(val) {
        console.log(val)
    }

    onEdit(){
        history.push(`/product/edit/${this.props.match.params.id}`)
    }
    
     showConfirm() {
         let props = this.props;
        confirm({
          title: 'Do you Want to delete these items?',
          onOk() {
            props.actions.deleteProduct(props.match.params.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    


    renderProducts() {
        const size = this.state.size;
        let product = this.props.product;
        let isFetching = this.props.isFetching;

        if (isFetching) {
            return <div>Loading..</div>
        } else if (!product) {
            return <div>No data..</div>
        } else {

            return (
                <div>
                    <Row>
                        <Col span={12}>Title</Col>
                        <Col span={12}>{product.title}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>Category</Col>
                        <Col span={12}>{product.category}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>Brand</Col>
                        <Col span={12}>{product.brand}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>Quantity</Col>
                        <Col span={12}>{product.quantity}</Col>
                    </Row>
                    <Row>
                        <Col span={12}>Price</Col>
                        <Col span={12}>{product.price}</Col>
                    </Row>

                    <Row>
                        <Col span={12}>Image Url</Col>
                        <Col span={12}>{product.imgage_url}</Col>
                    </Row>
                    <Divider />
                    <div>
                        <Row>
                            <Col span={3}> <Link to={'/product/'}> <Icon type="left" /> Back to list</Link></Col>
                            <Col span={3}>  <Button onClick={this.onEdit}> Edit<Icon type="edit" /></Button></Col>
                            <Col span={3}> <Button type="danger" onClick={this.showConfirm}> Delete<Icon type="delete" /></Button></Col>
                        </Row>
                    </div>

                </div>
            )
        }

    }

    render() {
        return (
            <div>
                {this.renderProducts()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        product: state.productReducer.product,
        isFetching: state.productReducer.isFetching,
    }
}


function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);