import { mergeRules } from './merge';

describe('mergeRules', () => {
  const scenarios = [
    {
      config: {
        module: {
          rules: [
            {
              test: /\.(js|jsx)(\?[^?]*)?$/,
              loader: 'hot-self-accept-loader',
              include: [
                '/Users/tekkromancer/Projects/RepairClinic_ssr/client/pages',
                '/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/next/pages'
              ]
            },
            {
              test: /\.+(js|jsx)$/,
              include: ['/Users/tekkromancer/Projects/RepairClinic_ssr/client'],
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  presets: [],
                  plugins: ['/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/react-hot-loader/babel.js'],
                  babelrc: true,
                }
              }
            }
          ]
        }
      },
      webpack: {
        module: {
          rules: [
            {
              test: /bootstrap.*\.css$/,
              loader: 'isomorphic-style-loader!css-loader'
            }, {
              test: /\.css$/,
              exclude: [
                /node_modules/, /bootstrap.*\.css$/
              ],
              loader: 'isomorphic-style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1!postcss-loader'
            }
          ]
        }
      },
      expected: {
        module: {
          rules: [
            {
              test: /\.(js|jsx)(\?[^?]*)?$/,
              loader: 'hot-self-accept-loader',
              include: [
                '/Users/tekkromancer/Projects/RepairClinic_ssr/client/pages',
                '/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/next/pages'
              ]
            },
            {
              test: /\.+(js|jsx)$/,
              include: ['/Users/tekkromancer/Projects/RepairClinic_ssr/client'],
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  presets: [],
                  plugins: ['/Users/tekkromancer/Projects/RepairClinic_ssr/node_modules/react-hot-loader/babel.js'],
                  babelrc: true,
                }
              }
            },
            {
              test: /bootstrap.*\.css$/,
              loader: 'isomorphic-style-loader!css-loader'
            }, {
              test: /\.css$/,
              exclude: [
                /node_modules/, /bootstrap.*\.css$/
              ],
              loader: 'isomorphic-style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1!postcss-loader'
            }
          ]
        }
      }
    }
  ];

  describe('mergeRules', () => {
    scenarios.forEach(({
      config,
      webpack,
      expected
    }, i) => {
      it(`passes scenario ${i + 1}`, () => {
        mergeRules(config, webpack);
        expect(config).to.deep.equal(expected);
      });
    });
  });
});
