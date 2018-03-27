import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Spin, List } from "antd";

import * as actions from '../actionts/';

const example = {
    textAlign: 'center',
    background: 'rgba(0,0,0,0.05)',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '30px 50px',
    margin: '20px 0'
};


class Search extends Component {

    renderPlanets() {
        let planets = this.props.planets;
        if (this.props.isFetching) {
            return <div style={example}>
                <Spin size="large" tip="Loading..." />
            </div>
        }
        else if (!planets) {
            return null
        }
        else {
            return (
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={planets}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<span className="link-planet" onClick={() => this.props.selectPlanet(item)}>{item.name}</span>}
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
                {this.renderPlanets()}
            </div>
        );
    }


}



function mapStateToProps(state) {
    return {
        planets: state.planetsReducer.planets,
        isFetching: state.planetsReducer.isFetching,
    }
}


function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);


