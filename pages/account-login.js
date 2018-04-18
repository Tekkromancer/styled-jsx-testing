import { Provider } from 'react-redux';
import { React, ptypes } from 'common_imports';
import { configureStore } from 'config/store';

import PageComponent, { getInitialProps } from 'pages/AccountLoginPage/AccountLoginPage';

export default class Page extends React.Component {
  static async getInitialProps(context) {
    const { req } = context;
    const isServer = !!req;
    const store = configureStore({}, isServer);
    const initialProps = await getInitialProps({ ...context, store, isServer });
    return { ...initialProps, initialState: store.getState(), isServer };
  }

  constructor(props) {
    super(props);
    this.store = configureStore(props.initialState, props.isServer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <PageComponent {...this.props} />
      </Provider>
    );
  }
}
Page.propTypes = {
  initialState: ptypes.object.isRequired,
  isServer: ptypes.bool.isRequired,
};
