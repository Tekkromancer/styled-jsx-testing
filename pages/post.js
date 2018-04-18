import { React } from 'common_imports';
import PageComponent, { getInitialProps } from '../app/pages/PostPage/PostPage';

const Page = props => <PageComponent {...props} />;
Page.getInitialProps = getInitialProps;
export default Page;
