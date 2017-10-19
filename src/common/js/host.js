/**
 * Created by wudi on 15/12/10.
 */

'use strict';

define([], function (argument) {
    var urlObj = {
        dev: {
            api: '//m.yaoex.com/'
        },
        test: {
            api: '//m.yaoex.com/'
        },
        release: {
            api: '//m.yaoex.com/'
        }
       
    };
    var environment = 'test';
    return urlObj[environment];
});