System.config({

    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',

    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // files
        'main': './js/app.js',
        'routing': './js/routing.js',
        'data': './js/data/data.js',
        'template': './js/template.js',
        'hb_helper': './js/handlebars_helpers.js',
        'time': './js/time.js',
        'filter': './js/filter.js',
        'chartPainter' : './js/chartPainter.js',
        'homeController': './js/controllers/homepage/home.js',
        'chartController': './js/controllers/chart.js',
        'tableController': './js/controllers/table.js',
        'listController': './js/controllers/list.js',
        'usersController': './js/controllers/users.js',
        // libraries
        'jquery': './node_modules/jquery/dist/jquery.js',
        'tablesorter': './node_modules/tablesorter/dist/js/jquery.tablesorter.js',
    },

    meta: {
        './js.app': {
            format: 'esm'
        }
    }
});

System.import('js/app.js');