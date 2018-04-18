import {
  mergeResolve,
  mergeExtensions,
  mergeModules,
  mergeAlias,
} from './mergeResolve';

describe('mergeResolve', () => {
  const scenarios = [
    {
      config: {
        resolve: {
          extensions: ['.js', '.jsx', '.json'],
          modules: ['client', 'node_modules'],
          alias: {
            foo: 'path/to/foo',
            bar: 'path/to/bar',
          },
        }
      },
      webpack: {
        resolve: {
          extensions: ['.js', '.jsx'],
          modules: ['newModule'],
          alias: {
            foo: 'path/to/new/foo',
            otherOne: 'path/to/otherOne',
          },
        }
      },
      expected: {
        resolve: {
          extensions: ['.js', '.jsx', '.json'],
          modules: ['client', 'node_modules', 'newModule'],
          alias: {
            foo: 'path/to/new/foo',
            bar: 'path/to/bar',
            otherOne: 'path/to/otherOne',
          },
        }
      },
    },
  ];

  describe('mergeExtensions', () => {
    scenarios.forEach(({ config, webpack, expected }, i) => {
      it(`passes scenario ${i + 1}`, () => {
        expect(mergeExtensions(config, webpack)).to.deep.equal(expected.resolve.extensions);
      });
    });
  });

  describe('mergeModules', () => {
    scenarios.forEach(({ config, webpack, expected }, i) => {
      it(`passes scenario ${i + 1}`, () => {
        expect(mergeModules(config, webpack)).to.deep.equal(expected.resolve.modules);
      });
    });
  });

  describe('mergeAlias', () => {
    scenarios.forEach(({ config, webpack, expected }, i) => {
      it(`passes scenario ${i + 1}`, () => {
        expect(mergeAlias(config, webpack)).to.deep.equal(expected.resolve.alias);
      });
    });
  });

  describe('mergeResolve', () => {
    scenarios.forEach(({ config, webpack, expected }, i) => {
      it(`passes scenario ${i + 1}`, () => {
        mergeResolve(config, webpack);
        expect(config).to.deep.equal(expected);
      });
    });
  });
});
