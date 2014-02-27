/*
 * grunt-build-locale
 * https://github.com/ef-ctx/grunt-build-locale
 *
 * Copyright (c) 2014 Andre Torgal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('build_locale', 'Grunt task to collect, merge and publish locale files.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            dest: '.',
            filterLocale: [],
            sufix: ''
        });

        grunt.log.debug('Options: ', JSON.stringify(options));

        // normalise destination dir
        if (options.dest.charAt(options.dest.length - 1) != '/') {
            options.dest += '/';
        }

        // @todo validate destination dir is writable

        var fileRegexp = /([a-z]{2}(_[A-Z]{2})?)\.locale\.json$/;

        var detectLocale = function(filepath) {
            var match = filepath.match(fileRegexp);
            if (match) {
                return match[1];
            }
        };

        var makeDestinationFilename = function(locale) {
            var parts = [locale];
            if (options.sufix) {
                parts.push(options.sufix);
            }
            parts.push('locale.json');
            return options.dest + parts.join('.');
        };

        var mergeData = function(destObj, srcObj) {
            for (var attrname in srcObj) {
                if (srcObj.hasOwnProperty(attrname)) {
                    destObj[attrname] = srcObj[attrname];
                }
            }
        }

        var files = [];
        var localeData = {};
        var locales = [];

        // debug
        if (options.filterLocale.length) {
            grunt.log.debug('Using whitelist: [' + options.filterLocale.join(', ') + ']');
        }

        // flatten file list and detect missing files
        this.files.forEach(function(f) {
            files = files.concat(f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }));
        });

        grunt.log.debug("Reading locale source files...");

        // iterate all files
        files.forEach(function(filepath) {
            var locale;
            // detect locale
            if (!(locale = detectLocale(filepath))) {
                var message = 'Could not detect locale for file "' + filepath + '".' + "\n";
                message += 'All files must follow the "[X.]L.locale.json" naming convention,';
                message += ' where the optional X is ignored and L is a locale in the format "[a-z]{2}(_[A-Z]{2})?".'
                grunt.fail.warn(message);
            }
            // filter locale
            if (options.filterLocale.length && options.filterLocale.indexOf(locale) === -1) {
                grunt.log.debug('... ignoring "' + locale + '" in "' + filepath + '".');
            }
            // read data and merge
            grunt.log.debug('... reading "' + locale + '" from "' + filepath + '".');
            if (!localeData[locale]) {
                localeData[locale] = {};
            }
            mergeData(localeData[locale], grunt.file.readJSON(filepath));
        });

        grunt.log.debug("Generating locale dist files...");

        // iterate all locales
        for (var locale in localeData) {
            var filepath = makeDestinationFilename(locale);
            grunt.log.debug('... writing "' + locale + '" into "' + filepath + '".');
            grunt.file.write(filepath, JSON.stringify(localeData[locale]));
            locales.push(locale);
        }

        // bork if nothing generated
        if (!locales.length) {
            grunt.fail.warn('No locale file generated');
        }
        // report sucess otherwise
        else {
            grunt.log.writeln('Locales generated: [' + locales.join(', ') + '] in "' + options.dest + '".');
        }

    });

};
