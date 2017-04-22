SystemJS.config({

 // tell SystemJS which transpiler to use
 transpiler: 'plugin-babel',

 // tell SystemJS where to look for the dependencies
 map: {
  'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
  'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

  // files
  'main': 'js/app.js',
  'routing' : 'js/routing.js',
  'data': 'js/data.js',
  'template': './js/template.js',

  // libraries
  'jquery' : './node_modules/jquery/dist/jquery.js',
  
 }
});

System.import('js/app.js');