import { getTemplate } from 'template';
import { getData, getOnlyNames } from '../js/data/data.js';
import { toUpperHb } from 'hb_helper';
import { startUpdatingTime } from 'time';
import { attachListFilterToInput, attachTableFilterToInput } from 'filter';
import { homeController } from 'homeController';
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
    '/': () => { router.navigate('/home'); },
    '/home/:sideBarMenu': (params) => sideBarContent.get(params),
    '/home': homeController.get,
    '/products': productsController.get,
    '/user/:id/:action': (params) => usersController.get(params)
}).notFound(function() {
    // called when there is path specified but
    // there is no route matching
    console.log('Ooops')
}).resolve();