// Karma configuration for the m2-validation components.
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'misc/jquery-1.11.3.js',                           // tests only
      'misc/angular-1.4.3.js',
      'misc/angular-mocks-1.4.3.js',
      'validation-icon/validation-icon.js',
      'validation-icon/validation-icon-tests.js',
      'validation-icon/demos/app.js',
      'validation-form-group/validation-form-group.js',
      'validation-form-group/validation-form-group-tests.js',
      'validation-form-group/demos/app.js'
    ],


    // list of files to exclude
    exclude: [ ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: [
        'validation-icon/demos',
        'validation-form-group/demos'
      ],
      //stripSufix: '.ext',
      // prepend this to the
      //prependPrefix: 'app/',

      // or define a custom transform function
      //cacheIdFromPath: function(filepath) {
      //  return cacheId;
      //},

      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'iconDemoApp'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
