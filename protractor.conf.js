exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: '../node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.47.1.jar',
  specs: ['devel/scripts/tests/protractor/tests.js'],
  frameworks: ['jasmine'],
  onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  },
  reporters: ['spec']
};