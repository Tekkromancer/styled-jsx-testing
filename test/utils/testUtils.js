import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
// import nock from "nock";

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);

/** ************************************************
* Confirm Elements
************************************************* */
export const confirmElements = ({renderer, elements}) => {
  const wrapper = renderer();

  if (!Array.isArray(elements)) {
    elements = Object.keys(elements).map(key => {
      const element = elements[key];
      if (!element.name) element.name = key;
      return elements[key];
    });
  }

  elements.forEach(element => {
    if (!element.conditional) {
      // it(`${element.name} exists - ${element.selector}`, () => expect(wrapper.find(element.selector)).to.exist);
      it(`${element.name} exists - ${element.selector}`, () => {
        expect(wrapper.find(element.selector).length).to.not.equal(0);
      });
    }
  });
};

/** ************************************************
* Content
************************************************* */
export const confirmContent = ({wrapper, scenarios}) => {
  describe('Content', () => {
    scenarios.map(scenario => {
      describe(scenario.desc, () => {
        const match = scenario.match || 'contain';
        it(`displays the content "${scenario.expected}"`, () => {
          expect(wrapper.find(scenario.element).text()).to[match](scenario.expected);
        });
      });
    });
  });
};

/** ************************************************
* Compare Objects
************************************************* */
export const compareObjects = ({expected, actual}) => {
  Object.keys(expected).map(key => {
    it(`${key} should be "${expected[key]}"`, () => {
      expect(actual[key]).to.equal(expected[key]);
    });
  });
};

/** ************************************************
* Confirm Methods
************************************************* */
export const confirmMethods = ({methods, actual}) => {
  methods.map(method => {
    it(`method "${method}" exists`, () => {
      expect(actual[method]).to.be.a('function');
    });
  });
};

/** ************************************************
* Confirm Dispatch
************************************************* */
export const confirmDispatch = (scenarios) => {
  scenarios.map(scenario => {
    scenario.expected.type = scenario.action;
    if (scenario.desc) {
      describe(scenario.desc, () => {
        it(`dispatches ${JSON.stringify(scenario.expected)}`, () => {
          expect(scenario.method()).to.deep.equal(scenario.expected);
        });
      });
    } else {
      it(`dispatches ${JSON.stringify(scenario.expected)}`, () => {
        expect(scenario.method()).to.deep.equal(scenario.expected);
      });
    }
  });
};

/** ************************************************
* Reducers
************************************************* */
export const testReducer = (reducer, scenarios) => {
  scenarios.forEach(({
    state, action, expected, exact = false
  }) => {
    // describe(`${scenario.action.type} ${JSON.stringify(scenario.action)}`, () => {
    describe(`${action.type}`, () => {
      // it(`returns the correct state: ${JSON.stringify(scenario.expected)}`, () => {
      it('returns the correct state', () => {
        if (exact) {
          expect(reducer(state || {}, action)).to.deep.equal(expected);
        } else {
          expect(reducer(state || {}, action)).to.containSubset(expected);
        }
      });
    });
  });
};

/** ************************************************
* Action Methods
**************************************************
describe('methods', () => {
  const methods = [
    'setExpanded'
  ];
  confirmActions({actions, methods});
});
************************************************* */
export const confirmActions = ({actions, methods}) => {
  methods.map(method => {
    it(`${method} exists`, () => {
      expect(actions[method]).to.exist;
    });
  });
};


/** ************************************************
* Scenarios
**************************************************
describe('scenarios', () => {
  const scenarios = [
    {
      name: 'expand item',
      action:() => actions.setExpanded({index: 0, value: true}),
      expected: {type: 'EXPAND_DETAILS', index: 0}
    },
    {
      name: 'collapse item',
      action:() => actions.setExpanded({index: 0, value: false}),
      expected: {type: 'COLLAPSE_DETAILS', index: 0}
    },
  ];
  testActions(scenarios);
});
************************************************* */
export const testActions = (scenarios) => {
  scenarios.map(scenario => {
    describe(`${scenario.name}`, () => {
      it(`returns the correct action: ${JSON.stringify(scenario.expected)}`, () => {
        expect(scenario.action()).to.deep.equal(scenario.expected);
      });
    });
  });
};

/** ************************************************
* Action Sequences
************************************************* */
export const testActionSequences = scenarios => {
  scenarios.map(({
    name, action, expected, state = {}
  }) => {
    const store = mockStore(state);
    it(`${name}`, () => {
      store.dispatch(action());
      expect(store.getActions()).to.deep.equal(expected);
    });
  });
};

export const testAsyncActionSequences = scenarios => {
  scenarios.map(({
    name, action, expected, state = {}
  }) => {
    const store = mockStore(state);
    describe(name, () => {
      return store.dispatch(action()).then(() => {
        it(`dispatches the correct sequence of actions for ${name}`, () => {
          expect(store.getActions()).to.deep.equal(expected);
        });
      });
    });
  });
};


export const outputCodes = content => content.split('').map(char => char.charCodeAt(0));
export const fromCodeArray = array => array.map(charCode => String.fromCharCode(charCode)).join('');

/** ************************************************
* MapState
************************************************* */
export const testMapState = ({
  scenarios, getState, getOwnProps, mapStateToProps, verbose = false
}) => {
  scenarios.map(({
    title, state: stateOverride, ownProps: ownPropsOverride, expected
  }) => {
    describe(title, () => {
      describe('returns the correct properties', () => {
        const state = getState && getState(stateOverride);
        const ownProps = getOwnProps && getOwnProps(ownPropsOverride);
        const actual = mapStateToProps(state, ownProps);

        Object.keys(expected).map(key => {
          const value = expected[key];
          if (typeof value === 'string' && value.substr(0, 3) === 'is:') {
            const valueType = value.substr(3);
            if (verbose) console.log(`${key} [${actual[key]}] is a ${valueType}`); // eslint-disable-line
            it(`${key} is ${valueType}`, () => {
              expect(actual[key]).to.be.a(valueType);
            });
          } else {
            if (verbose) console.log(`${key} [${actual[key]}] equals ${value}`);  // eslint-disable-line
            it(`${key} has correct value`, () => {
              expect(actual[key]).to.deep.equal(value);
            });
          }
        });
      });
    });
  });
};
