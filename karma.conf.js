module.exports = config => {
  config.set({
    plugins: [
      'karma-babel-preprocessor',
      'karma-browserify',
      'karma-mocha',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
    ],

    basePath: '',
    frameworks: ['mocha', 'browserify'],
    files: [
      'test/unit/**/*.js',
    ],
    exclude: [
    ],

    babelPreprocessor: {
      options: {
        presets: ['airbnb'],
      },
    },
    browserify: {
      debug: true,
      extensions: ['.js'],
      plugin: ['proxyquireify/plugin'],
      transform: [
        [require('babelify').configure(), { presets: ['airbnb'] }],
      ],
      configure: (bundle) => {
        bundle.on('prebundle', () => {
          bundle.external('react/addons');
          bundle.external('react/lib/ReactContext');
          bundle.external('react/lib/ExecutionEnvironment');
        });
      },
    },

    preprocessors: {
      'test/unit/**/*.js': ['babel', 'browserify'],
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    reporters: ['mocha'],

    singleRun: true,
  });
};
