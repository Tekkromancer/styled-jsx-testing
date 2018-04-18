import { mergePlugins } from './merge';

describe('mergePlugins', () => {
  const plugin_a = {name: 'Plugin A'};
  const plugin_b = {name: 'Plugin B'};
  const plugin_c = {name: 'Plugin C'};

  const scenarios = [
    {
      config: {
        plugins: [plugin_a]
      },
      webpack: {
        plugins: [plugin_b, plugin_c]
      },
      expected: {
        plugins: [
          plugin_a, plugin_b, plugin_c
        ]
      }
    },
    {
      config: {
        plugins: [plugin_a, plugin_b]
      },
      webpack: {
        plugins: [plugin_b, plugin_c]
      },
      expected: {
        plugins: [
          plugin_a, plugin_b, plugin_c
        ]
      }
    },
  ];

  describe('mergePlugins', () => {
    scenarios.forEach(({
      config,
      webpack,
      expected
    }, i) => {
      it(`passes scenario ${i + 1}`, () => {
        mergePlugins(config, webpack);
        expect(config).to.deep.equal(expected);
      });
    });
  });
});
