// const { hot } = require('react-hot-loader');
// import { hot } from 'react-hot-loader';
// import React from 'react';
import withRedux from 'next-redux-wrapper';
import { React } from '../app/common/common_imports';

import { wrapExport } from '../app/common/moduleUtils';
import { configureStore } from '../app/config/store';
import PageComponent, { getInitialProps, mapStateToProps } from '../app/pages/HomePage/HomePage';

const Page = props => <PageComponent {...props} />;
Page.getInitialProps = getInitialProps;

// export default hot(module)(withRedux(configureStore, state => (mapStateToProps(state)))(Page));
export default wrapExport(withRedux(configureStore, state => (mapStateToProps(state)))(Page));
