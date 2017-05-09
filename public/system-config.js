System.config({

    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',

    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // files
        'main': './js/app.js',
        'data': './js/data/data.js',
        'filter': './js/utils/filter.js',
        'templater': './js/utils/template.js',
        'timer': './js/utils/time.js',
        'requester': './js/utils/requester.js',
        'upperizer': './js/utils/upperizer.js',
        'chartPainter': './js/utils/chartPainter.js',
        'homeController': './js/controllers/home.js',
        'chartController': './js/controllers/chart.js',
        'tableController': './js/controllers/table.js',
        'usersController': './js/controllers/users.js',
        'sidebarController': './js/controllers/sidebar.js',

        // libraries
        'firebaseApp': './node_modules/firebase/firebase-app.js',
        'firebaseDb': './node_modules/firebase/firebase-database.js',
        'firebaseAuth': './node_modules/firebase/firebase-auth.js',
        'jquery': './node_modules/jquery/dist/jquery.min.js',
        'navigo': './node_modules/navigo/lib/navigo.min.js',
        'tablesorter': './node_modules/tablesorter/dist/js/jquery.tablesorter.min.js',
        'bloodhound': './node_modules/typeahead.js-jspm/dist/bloodhound.min.js',
        'typeahead': './node_modules/typeahead.js-jspm/dist/typeahead.jquery.min.js',
        'toastr': './node_modules/toastr/build/toastr.min.js'
    },

    meta: {
        './js.app': {
            format: 'esm'
        }
    }
});

System.import('js/app.js');