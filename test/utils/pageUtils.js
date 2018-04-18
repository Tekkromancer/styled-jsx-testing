import configureMockStore from 'redux-mock-store';

import dataReducer from 'reducers/data/data.reducer';

import { initializePage } from 'common/pages/globalPageInit';

const getStore = ({
  query = {},
  path = '/',
  pathname = '/',
} = {}) => {
  const mockStore = configureMockStore();
  return mockStore({
    data: dataReducer(),
    location: { query, path, pathname }
  });
};

export const initPage = ({
  query = {},
  path = '/',
  pathname = '/',
} = {}) => {
  const context = {
    store: getStore({query, path, pathname}),
  };
  initializePage(context);
};
