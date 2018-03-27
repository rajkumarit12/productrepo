import React from 'react';
import { Route, Switch,Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Create from './create'
import Dashboard from './dashboard'
import Product from './product'
import Edit from './edit'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;



class Products extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Dashboard</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Product  <Link to={'/product/create'}> <Icon type="plus-circle-o" /> New</Link>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Switch>
                                <Route exact path={`/product/create`} component={Create} />
                                <Route exact path={`/product/edit/:id`} component={Edit} />
                                <Route exact path={`/product/:id`} component={Product} />
                                <Route path={`/product/`} component={Dashboard} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
          </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Products;