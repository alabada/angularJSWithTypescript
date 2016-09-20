/**
 * require dependencies
 */
webdriverio  = require('webdriverio');
webdrivercss = require('webdrivercss');

assert = require('assert');
jasmine.DEFAULT_TIMEOUT_INTERVAL=9999999;
/**
 * set some fix test variables
 */

screenshotRootDefault = 'diff';
failedComparisonsRootDefault = 'diff/failed';
screenshotRootCustom = '__screenshotRoot__';
failedComparisonsRootCustom = '__failedComparisonsRoot__';
/**
 * browser and plugin webdrivercss init
 */
browser = webdriverio.remote(capabilities);
webdrivercss.init(browser);
browser.init();
webdrivercss.init(browser, {
    // example options
    screenshotRoot: 'my-shots',
    failedComparisonsRoot: 'diffs',
    misMatchTolerance: 0.05,
    screenWidth: [320,640,1024,1440,1920]
});


