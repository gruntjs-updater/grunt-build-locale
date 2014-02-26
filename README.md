# grunt-build-locale

> Grunt task to collect, merge and publish locale files.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-build-locale --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-build-locale');
```

## The "build_locale" task

### Overview
In your project's Gruntfile, add a section named `build_locale` to the data object passed into `grunt.initConfig()`.

Will look for localization json files in the specified directories, using only the files that match `[yyy.]xxx.locale.json`,
where `yyy` is discarted and `xxx` stands for locale code in the `language[_territory]` format.

Examples:

 - src/app/en_US.locale.json
 - src/lib/foobar.en_US.locale.json

Loaded data will be merged in the specified order, first inside `src/lib` and then `src/app`, with newer values
overriding previous ones.

Finally generates one `xxx.locale.json` per detected (and whitelisted) locale.

```js
grunt.initConfig({
  build_locale: {
    options: {
      // Task-specific options go here.
    },
    dist: {
      files: [{
          src: ['src/**/*.locale.json', 'src/**/*.locale.json'],
      }],
      options {
        // Target-specific options go here.
        dest: 'build/locale/',
        filterLocale: ['en_US', 'pt_PT'],
        sufix: 'v0.1'
      }
    },
  },
});
```

### Options

#### options.dest
Type: `Array`
Default value: ``

#### options.filterLocale
Type: `Array`
Default value: ``

A whitelist of locales. If empty all detected locales will be generated.

#### options.log
Type: `String`
Default value: ``

Log to this file all overriden values outputs a log file in the format: LOCALE | original key | value | overriding file | overriding value

#### options.log
Type: `String`
Default value: ``

Log to this file all overriden values outputs a log file in the format: LOCALE | original key | value | overriding file | overriding value

### Usage Examples

#### Default Options

In this example, ...

```js
grunt.initConfig({
  build_locale: {
    options: {},
    files: {},
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
