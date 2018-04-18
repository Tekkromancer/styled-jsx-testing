import { React } from 'common_imports';
import PageComponent, { getInitialProps } from '../app/pages/ListPage/ListPage';

const Page = props => <PageComponent {...props} />;
Page.getInitialProps = getInitialProps;
export default Page;
