import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Header } = Layout;

const AppLayout = (props) => {
    const { history } = props;
    return (
        <Layout>
            {/* <Header> */}
                <ol>
                <li> <Link to={`/`}> Home </Link></li>
                    <li> <Link to={`/watchlist`}>Watch List</Link></li>
                </ol>
            {/* </Header> */}
        </Layout>
    )
}
export default AppLayout;