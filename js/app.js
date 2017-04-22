var root = null;
var useHash = true; 
var hash = '#!'; 

var router = new Navigo(root, useHash, hash);

router.on({
    '/' : () => {router.navigate('/home');},
    '/home' : function() {
        console.log('Yeey!');
    },
    '/products' : function() {
        console.log('opa');
    },
    '/user/:id/:action' : function (params) {
        console.log(`${params.id} is id and ${params.action} is action`);
    }

}).notFound(function () {
  // called when there is path specified but
  // there is no route matching
  console.log('Ooops')
}).resolve();

