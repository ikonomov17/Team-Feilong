import { getTemplate } from 'template';
import { getData, getOnlyNames } from 'data';
import { toUpperHb } from 'hb_helper';
import { startUpdatingTime } from 'time';
import { attachListFilterToInput,attachTableFilterToInput } from 'filter';
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
                const template = Handlebars.compile(html);
                
                // Call toUpperHb so that it register the handlebars helper
                toUpperHb();

                // Wrap the data in an object so that the handlebars template could work
                data = {obj: data};

                $('#main').html(template(data));
                attachTableFilterToInput();
            })
        })
    },
    '/products' : function() {
        console.log('Zemi si');

        getOnlyNames().then(function(namesData){
            getTemplate('buttons').then(function(html) {
                //console.log(html);
                const buttonTemplate = Handlebars.compile(html);
                //let name = ['a','b','c'];
                //console.log(namesData);
                $('#main').html(buttonTemplate({name : namesData}));
                attachListFilterToInput();
            })
        })
        
    },
    '/user/:id/:action' : function (params) {
        console.log(`${params.id} is id and ${params.action} is action`);
    }

}).notFound(function () {
  // called when there is path specified but
  // there is no route matching
  console.log('Ooops')
}).resolve();

