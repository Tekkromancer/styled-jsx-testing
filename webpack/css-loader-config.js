const findUp = require('find-up');

module.exports = (
  config,
  extractPlugin,
  {
    cssModules = false,
    dev,
    isServer,
    loaders = []
  }
) => {
  const cssLoader = {
    loader: isServer ? 'css-loader/locals' : 'css-loader',
    options: {
      modules: cssModules,
      minimize: !dev,
      sourceMap: dev,
      importLoaders: 1
    }
  };

  const postcssConfig = findUp.sync('postcss.config.js', {
    cwd: config.context
  });
  let postcssLoader;

  if (postcssConfig) {
    postcssLoader = {
      loader: 'postcss-loader',
      options: {
        sourceMap: dev,
        config: {
          path: postcssConfig
        }
      }
    };
  }

  // console.log('postcssLoader', postcssLoader);

  // When not using css modules we don't transpile on the server
  if (isServer && !cssLoader.options.modules) {
    return ['ignore-loader'];
  }

  // When on the server and using css modules we transpile the css
  return [cssLoader, postcssLoader, ...loaders].filter(Boolean);
  /*
  if (isServer && cssLoader.options.modules) {
    return [cssLoader, postcssLoader, ...loaders].filter(Boolean);
  }

  return extractPlugin.extract({
    use: [cssLoader, postcssLoader, ...loaders].filter(Boolean),
    // Use style-loader in development
    // fallback: {
    //   loader: 'isomorphic-style-loader',
    //   options: {
    //     sourceMap: dev,
    //     importLoaders: 1,
    //     publicPath: '/static/style_yyy.css',
    //   }
    // },

  });
  */
};
