import withRedux from 'next-redux-wrapper';
import { React } from '../app/common/common_imports';

import { wrapExport } from '../app/common/moduleUtils';
import { configureStore } from '../app/config/store';
import PageComponent, { getInitialProps, mapStateToProps } from '../app/pages/TestPage/TestPage';

const Page = props => <PageComponent {...props} />;
Page.getInitialProps = getInitialProps;

export default wrapExport(withRedux(configureStore, state => (mapStateToProps(state)))(Page));