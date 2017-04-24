import { getTemplate } from 'template';
import { getData } from 'data';
import { toUpperHb } from 'hb_helper';
import { startUpdatingTime } from 'time';
import 'jquery';

var root = null;
var useHash = true; 
var hash = '#!'; 

var router = new Navigo(root, useHash, hash);

startUpdatingTime();

router.on({
    '/' : () => {router.navigate('/home');},
    '/home' : function() {
        console.log('Yeey!');

        getData().then(function(data){
             getTemplate('table').then(function(html){
                 console.log(html);
                 console.log(data);
                var template = Handlebars.compile(html);
                
                // Call toUpperHb so that it register the handlebars helper
                toUpperHb();

                // Wrap the data in an object so that the handlebars template could work
                data = {obj: data};
                
                $('#main').html(template(data));
            })
        })
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

