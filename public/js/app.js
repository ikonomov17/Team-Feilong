import { startUpdatingTime } from 'time';
import { homeController } from 'homeController';
import { tableController } from 'tableController';
import { productsController } from 'productsController';
import { usersController } from 'usersController';
import { sideBarContent } from './controllers/homepage/right-side-bar.js';
import 'jquery';
import 'tablesorter';

var root = null;
var useHash = true;
var hash = '#!';

var router = new Navigo(root, useHash, hash);

startUpdatingTime();

router.on({
    '/': () => { router.navigate('home'); },
    '/#': () => { router.navigate('home'); },
    '/home': homeController.get,
    '/home/:sideBarMenu': (params) => sideBarContent.get(params),
    '/table': tableController.get,
    '/products': productsController.get,
    '/user/:id/:action': (params) => usersController.get(params),
    '/login': usersController.login
}).notFound(function() {
    // called when there is path specified but
    // there is no route matching
    console.log('Ooops')
}).resolve();