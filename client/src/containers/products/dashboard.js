import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Input, Layout, Col, Row, Card, List, Avatar } from "antd";

import * as actions from '../../actionts/';



const { Meta } = Card;
const { Header, Footer, Content } = Layout;


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.renderProducts = this.renderProducts.bind(this);
        this.onTabChange = this.onItemClick.bind(this);
    }

    componentDidMount() {
        this.props.actions.getAllProducts();
    }

    onItemClick(val) {
        console.log(val)
    }

    renderProducts() {
        let products = this.props.products;
        let isFetching = this.props.isFetching;

        if (isFetching) {
            return <div>Loading..</div>
        } else if (!products) {
            return <div>No data..</div>
        } else {

            return (
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={products}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<Link to={'/product/' + item.id}>{item.title}</Link>}
                                    description={item.category + '-' + item.price}
                                />
                            </List.Item>

                        )}
                    />
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
        products: state.productsReducer.products,
        isFetching: state.productsReducer.isFetching,
    }
}


function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);