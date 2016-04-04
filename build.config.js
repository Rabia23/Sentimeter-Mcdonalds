/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', 'src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],


    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    sass: 'src/sass/styles.scss'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      

      'vendor/morris.js/morris.js',
      'vendor/raphael/raphael.js',
      'vendor/ngmap/build/scripts/ng-map.min.js',
      'vendor/moment/moment.js',
      'vendor/bootstrap-daterangepicker/daterangepicker.js',
      'vendor/angular-daterangepicker/js/angular-daterangepicker.js',
      'vendor/Chart.js/Chart.js',
      'vendor/angular-chart.js/dist/angular-chart.js',
      'vendor/Heyoffline/Heyoffline.js',
      'vendor/angular-animate/angular-animate.min.js',
      'vendor/metisMenu/dist/metisMenu.min.js',
      'vendor/hammerjs/hammer.min.js',
      'vendor/AngularJS-Toaster/toaster.min.js',
      'vendor/ngSmoothScroll/lib/angular-smooth-scroll.js',
      'vendor/amcharts/amcharts.js',
      'vendor/amcharts/serial.js',
      'vendor/amcharts/light.js',
      'vendor/amcharts/pie.js'
    ],
    required_js: [
      
      'vendor/angular/angular.js',
      'vendor/angular-bootstrap/ui-bootstrap.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/underscore/underscore-min.js',
      'vendor/angular-resource/angular-resource.js',
      'vendor/jquery/dist/jquery.js'
    ],
    css: [
      'vendor/bootstrap/dist/css/bootstrap.min.css',
      'vendor/morris.js/morris.css',
      'vendor/bootstrap-daterangepicker/daterangepicker.css',
      'vendor/angular-chart.js/dist/angular-chart.css',
      'vendor/font-awesome/css/font-awesome.css',
      'vendor/AngularJS-Toaster/toaster.min.css'
    ],
    assets: [

    ]
  }
};
