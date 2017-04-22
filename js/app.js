import { getTemplate } from 'template';
import { getData } from 'data';
import 'jquery';

var root = null;
var useHash = true; 
var hash = '#!'; 

var router = new Navigo(root, useHash, hash);

router.on({
    '/' : () => {router.navigate('/home');},
    '/home' : function() {
        console.log('Yeey!');

        getData().then(function(data){
            return data;
        }).then(function(data){
             getTemplate('table').then(function(html){
                 console.log(html);
                 console.log(data);
                //var arrayData = Array.prototype.slice.call(data);
                var template = Handlebars.compile(html);
                //var input = [{"resource":{"classname":"Quote","fields":{"name":"USD/KRW","price":"1133.069946","symbol":"KRW=X","ts":"1492832553","type":"currency","utctime":"2017-04-22T03:42:33+0000","volume":"0"}}},{"resource":{"classname":"Quote","fields":{"name":"USD/KRW","price":"1133.069946","symbol":"KRW=X","ts":"1492832553","type":"currency","utctime":"2017-04-22T03:42:33+0000","volume":"0"}}}];
                var input = {obj: data};
                $('#main').html(template(input));
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

